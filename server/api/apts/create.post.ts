import {userSchema} from "~/server/models/user.schema";
import {carSchema} from "~/server/models/car.schema";
import {aptsSchema} from "~/server/models/apts.schema";
import {computePriceQuote} from "~/server/utils/pricing";
import {isBookableSlot, findConflictingAppointment} from "~/server/utils/slots";
import {chargeCard} from "~/server/utils/square";
import {formatAppointmentDetails, sendBookingNotifications} from "~/server/utils/notifications";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    try {
        const {
            carId,
            service,
            appointmentDate,
            address,
            zip,
            phone,
            tireCount,
            rimSize,
            guestName,
            guestEmail,
            vehicleInfo,
            changeoverType,
            includeStorage,
            sourceId,
            idempotencyKey,
        } = await readBody(event);

        if (!service || !appointmentDate || !address || !phone) {
            throw createError({statusCode: 400, statusMessage: 'Missing required booking details'})
        }

        // Prices are recomputed from raw inputs — anything the browser sent is ignored.
        const quote = await computePriceQuote({
            serviceName: service,
            rimSize,
            tireCount,
            zip,
            changeoverType,
            includeStorage,
        })

        if (!quote.requiresQuote && !sourceId) {
            throw createError({statusCode: 400, statusMessage: 'Payment information is required for this service'})
        }

        const when = new Date(appointmentDate)
        if (!isBookableSlot(when)) {
            throw createError({statusCode: 400, statusMessage: 'That appointment time is no longer available'})
        }
        if (await findConflictingAppointment(when)) {
            throw createError({
                statusCode: 409,
                statusMessage: 'That time slot was just booked',
                data: {code: 'SLOT_TAKEN'},
            })
        }

        const sessionEmail = await getAuth(event)
        const user = sessionEmail ? await userSchema.findOne({email: sessionEmail}).select('-password') : null
        const car = carId ? await carSchema.findById(carId) : null

        // Reserve the slot before charging so a customer who loses the race is
        // turned away with their card untouched.
        const apt = new aptsSchema({
            carId: carId || undefined,
            service,
            appointmentDate: when,
            address,
            phone,
            userId: user?._id,
            tireCount,
            rimSize,
            guestName: guestName || undefined,
            guestEmail: guestEmail || undefined,
            vehicleInfo: vehicleInfo || undefined,
            changeoverType: changeoverType || undefined,
            includeStorage: includeStorage || undefined,
            basePrice: quote.basePrice,
            shopSuppliesFee: quote.shopSuppliesFee,
            tireDisposalFee: quote.tireDisposalFee,
            storageFee: quote.storageFee,
            serviceFee: quote.serviceFee,
            totalPrice: quote.totalPrice,
        });

        await apt.save()

        let paymentId: string | undefined
        if (!quote.requiresQuote) {
            try {
                const charge = await chargeCard({
                    sourceId,
                    amountCents: quote.totalCents,
                    locationId: config.public.locationId as string,
                    idempotencyKey,
                    event,
                })
                paymentId = charge.paymentId
            } catch (paymentError) {
                await aptsSchema.findByIdAndDelete(apt._id)
                throw paymentError
            }

            apt.squarePaymentId = paymentId
            await apt.save()
        }

        if (user?._id) {
            await userSchema.findByIdAndUpdate(user._id, {$push: {apts: apt._id}})
        }

        const vehicleDisplay = car
            ? `${car.year} ${car.make} ${car.model}`
            : (vehicleInfo || 'Not provided')

        const details = formatAppointmentDetails({
            service,
            tireCount,
            rimSize,
            address,
            vehicleDisplay,
            phone,
            appointmentDate: when,
            guestName,
            includeStorage,
            quote,
        })

        // Never allowed to fail the request: the appointment exists and is paid for.
        await sendBookingNotifications({
            customerEmail: sessionEmail || guestEmail || null,
            details,
            event,
        })

        return {
            ok: true,
            appointmentId: String(apt._id),
            paymentId,
            quote,
        }

    } catch (e: any) {
        if (e?.statusCode) throw e

        console.error('[apts/create] unexpected failure:', e?.message)
        throw createError({
            statusCode: 500,
            statusMessage: 'We could not complete your booking. Please try again.'
        })
    }
})
