import moment from 'moment-timezone'
import { aptsSchema } from '~/server/models/apts.schema'

export const SHOP_TIMEZONE = 'America/Chicago'
export const BOOKING_WINDOW_DAYS = 7

/**
 * Business hours by day of week, in shop-local time. Weekends run the full day,
 * weekdays are a single after-hours slot.
 */
function hoursForDay(dayOfWeek: number): { startHour: number; endHour: number } {
  return dayOfWeek === 6 || dayOfWeek === 0
    ? { startHour: 7, endHour: 16 }
    : { startHour: 17, endHour: 18 }
}

/**
 * Every future bookable hour in the next `days` days. Both the availability
 * endpoint and booking validation read from here so what we show and what we
 * accept can never drift apart.
 */
export function generateBookableSlots(days = BOOKING_WINDOW_DAYS): Date[] {
  const slots: Date[] = []
  const now = moment().tz(SHOP_TIMEZONE)

  for (let i = 0; i < days; i++) {
    const day = now.clone().add(i, 'days')
    const { startHour, endHour } = hoursForDay(day.day())

    for (let hour = startHour; hour < endHour; hour++) {
      const slot = day.clone().set({ hour, minute: 0, second: 0, millisecond: 0 })
      if (slot.isAfter(now)) slots.push(slot.toDate())
    }
  }

  return slots
}

/**
 * Structural check: a top-of-hour slot inside business hours, in the future and
 * within the booking window. Mirrors generateBookableSlots via hoursForDay.
 */
export function isBookableSlot(date: Date): boolean {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return false

  const slot = moment(date).tz(SHOP_TIMEZONE)
  if (slot.minute() !== 0 || slot.second() !== 0 || slot.millisecond() !== 0) return false

  const now = moment().tz(SHOP_TIMEZONE)
  if (!slot.isAfter(now)) return false
  // One day of slack so a customer who loads the page just before midnight can
  // still submit the last slot in their window.
  if (slot.isAfter(now.clone().add(BOOKING_WINDOW_DAYS + 1, 'days').endOf('day'))) return false

  const { startHour, endHour } = hoursForDay(slot.day())
  return slot.hour() >= startHour && slot.hour() < endHour
}

/** An existing appointment occupying the same hour, if any. */
export async function findConflictingAppointment(date: Date) {
  const startOfHour = moment(date).tz(SHOP_TIMEZONE).startOf('hour')
  const endOfHour = startOfHour.clone().endOf('hour')

  return aptsSchema.findOne({
    appointmentDate: {
      $gte: startOfHour.toDate(),
      $lte: endOfHour.toDate(),
    },
    status: { $ne: 'Cancelled' },
  })
}
