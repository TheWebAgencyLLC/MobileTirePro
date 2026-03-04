import {userSchema} from "~/server/models/user.schema";
import {carSchema} from "~/server/models/car.schema";
import {aptsSchema} from "~/server/models/apts.schema";
//@ts-ignore
import nodemailer from "nodemailer";
import {format} from "date-fns";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "noreplymobiletirepro@gmail.com",
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
            vehicleInfo
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
        });

        await apt.save()

        if (user?._id) {
            await userSchema.findByIdAndUpdate(user._id, {$push: {apts: apt._id}})
        }

        const vehicleDisplay = car
            ? `${car.year} ${car.make} ${car.model}`
            : (vehicleInfo || 'Not provided')

        if (emailRecipient) {
            await transporter.sendMail({
                from: '',
                to: emailRecipient,
                subject: "Mobile Tire Pro - Appointment confirmed",
                text: `Your appointment has been received, we will be in contact with you shortly \n ${service} \n ${address} \n ${vehicleDisplay} \n ${phone} \n ${format(appointmentDate, 'PPpp')}`,
            });
        }

        await transporter.sendMail({
            from: '',
            to: "mobiletireprollc@gmail.com",
            subject: "New Appointment",
            text: `You got a new appointment \n ${guestName || ''} \n ${service} \n ${address} \n ${vehicleDisplay} \n ${phone}`,
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
