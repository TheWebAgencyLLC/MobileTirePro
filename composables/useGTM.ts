import { useGtm as useVueGTM } from "@gtm-support/vue-gtm";

const pushEvent = (payload: Record<string, unknown>) => {
  if (process.dev) return
  const gtm = useVueGTM()
  gtm?.trackEvent(payload)
}

export const useGTM = () => {
  const gtm = useVueGTM()

  return {
    gtm,
    trackEvent: (payload: Record<string, unknown>) => pushEvent(payload),
    trackPhoneClick: (location: string) => pushEvent({ event: 'phone_click', location }),
    trackScheduleClick: (location: string) => pushEvent({ event: 'schedule_click', location }),
    trackBookingStep: (step: string, extra: Record<string, unknown> = {}) =>
      pushEvent({ event: 'booking_step', step, ...extra }),
    trackBookingComplete: (payload: Record<string, unknown>) =>
      pushEvent({ event: 'booking_complete', ...payload }),
    trackPaymentSuccess: (payload: Record<string, unknown>) =>
      pushEvent({ event: 'payment_success', ...payload }),
  }
}
