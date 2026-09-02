import { defineEventHandler } from 'h3';
import moment from 'moment-timezone';
import { SHOP_TIMEZONE, generateBookableSlots, findConflictingAppointment } from '~/server/utils/slots';

export default defineEventHandler(async () => {
    try {
        const slots = generateBookableSlots();

        // Same conflict rule the booking endpoint enforces, so what we offer here
        // is exactly what /api/apts/create will accept.
        const taken = await Promise.all(slots.map(slot => findConflictingAppointment(slot)));

        const availabilityMap: Record<string, Date[]> = {};

        slots.forEach((slot, i) => {
            const dayKey = moment(slot).tz(SHOP_TIMEZONE).format('MM-DD-YYYY');

            if (!availabilityMap[dayKey]) {
                availabilityMap[dayKey] = [];
            }

            if (!taken[i]) {
                availabilityMap[dayKey].push(slot);
            }
        });

        return availabilityMap;
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});
