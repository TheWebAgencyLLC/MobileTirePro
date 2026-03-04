import {defineMongooseModel} from "#nuxt/mongoose";

export const aptsSchema = defineMongooseModel({
    name: 'Apt',
    schema: {
        //@ts-ignore
        appointmentDate: {
            type: 'Date',
        },
        //@ts-ignore
        carId: {
            type: 'ObjectId',
            ref: 'Car',
        },
        //@ts-ignore
        userId: {
            type: 'ObjectId',
            ref: 'User'
        },
        service: {
            type: 'string',
        },
        rimSize: {
            type: 'string',
        },
        tireCount: {
            type: 'number',
        },
        //@ts-ignore
        address: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        //@ts-ignore
        status: {
            type: 'string',
            enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
            default: 'Pending'
        },
        guestName: {
            type: 'string',
        },
        guestEmail: {
            type: 'string',
        },
        vehicleInfo: {
            type: 'string',
        }
    }
});
