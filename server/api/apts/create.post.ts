import {userSchema} from "~/server/models/user.schema";
import {carSchema} from "~/server/models/car.schema";
import {aptsSchema} from "~/server/models/apts.schema";
//@ts-ignore
import nodemailer from "nodemailer";
import {format} from "date-fns";

function formatCurrency(amount?: number | null) {
    if (amount == null) return null
    return `$${amount.toFixed(2)}`
}

function formatAppointmentDetails({
    service,
    tireCount,
    rimSize,
    address,
    vehicleDisplay,
    phone,
    appointmentDate,
    guestName,
    basePrice,
    shopSuppliesFee,
    tireDisposalFee,
    serviceFee,
    totalPrice,
}: {
    service: string
    tireCount?: number
    rimSize?: number | string | null
    address: string
    vehicleDisplay: string
    phone: string
    appointmentDate?: string | Date
    guestName?: string
    basePrice?: number
    shopSuppliesFee?: number
    tireDisposalFee?: number
    serviceFee?: number
    totalPrice?: number
}) {
    const lines = [
        guestName ? `Customer: ${guestName}` : null,
        `Service: ${service}`,
        tireCount ? `Tires: ${tireCount}` : null,
        rimSize ? `Rim size: ${rimSize}"` : null,
        `Address: ${address}`,
        `Vehicle: ${vehicleDisplay}`,
        `Phone: ${phone}`,
        appointmentDate ? `Appointment: ${format(new Date(appointmentDate), 'PPpp')}` : null,
        '',
        'Pricing:',
        basePrice != null ? `  Service: ${formatCurrency(basePrice)}` : null,
        shopSuppliesFee ? `  Shop supplies: ${formatCurrency(shopSuppliesFee)}` : null,
        tireDisposalFee ? `  Tire disposal: ${formatCurrency(tireDisposalFee)}` : null,
        serviceFee != null ? `  Mobile service fee: ${formatCurrency(serviceFee)}` : null,
        totalPrice != null ? `  Total paid: ${formatCurrency(totalPrice)}` : null,
    ]

    return lines.filter(Boolean).join('\n')
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "noreplyprolinewheelandtire@gmail.com",
                pass: config.pass,
            },
        });

        const {
            carId,
            service,
            appointmentDate,
            address,
            phone,
            tireCount,
            rimSize,
            guestName,
            guestEmail,
            vehicleInfo,
            basePrice,
            shopSuppliesFee,
            tireDisposalFee,
            serviceFee,
            totalPrice,
        } = await readBody(event);

        const sessionEmail = await getAuth(event)
        const user = sessionEmail ? await userSchema.findOne({email: sessionEmail}).select('-password') : null
        const car = carId ? await carSchema.findById(carId) : null

        const emailRecipient = sessionEmail || guestEmail

        const apt = new aptsSchema({
            carId: carId || undefined,
            service,
            appointmentDate,
            address,
            phone,
            userId: user?._id,
            tireCount,
            rimSize,
            guestName: guestName || undefined,
            guestEmail: guestEmail || undefined,
            vehicleInfo: vehicleInfo || undefined,
            basePrice,
            shopSuppliesFee,
            tireDisposalFee,
            serviceFee,
            totalPrice,
        });

        await apt.save()

        if (user?._id) {
            await userSchema.findByIdAndUpdate(user._id, {$push: {apts: apt._id}})
        }

        const vehicleDisplay = car
            ? `${car.year} ${car.make} ${car.model}`
            : (vehicleInfo || 'Not provided')

        const appointmentDetails = formatAppointmentDetails({
            service,
            tireCount,
            rimSize,
            address,
            vehicleDisplay,
            phone,
            appointmentDate,
            guestName,
            basePrice,
            shopSuppliesFee,
            tireDisposalFee,
            serviceFee,
            totalPrice,
        })

        if (emailRecipient) {
            await transporter.sendMail({
                from: '',
                to: emailRecipient,
                subject: "Proline Wheel & Tire - Appointment confirmed",
                text: `Your appointment has been received. We will be in contact with you shortly.\n\n${appointmentDetails}`,
            });
        }

        await transporter.sendMail({
            from: '',
            to: "prolinewheelandtire@gmail.com",
            subject: "New Appointment",
            text: `You got a new appointment\n\n${appointmentDetails}`,
        });

        return 'OK'

    } catch (e: any) {
        console.error(e.message)
        throw createError({
            statusMessage: e.message,
            statusCode: 400
        })
    }
})
