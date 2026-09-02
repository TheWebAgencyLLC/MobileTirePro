//@ts-ignore
import nodemailer from 'nodemailer'
import { format } from 'date-fns'
import type { H3Event } from 'h3'
import { SHOP_SUPPLIES_LABEL, getServiceDisplayName } from '~/config/service-pricing'
import type { PriceQuote } from '~/server/utils/pricing'

const DEFAULT_OWNER_EMAIL = 'prolinewheelandtire@gmail.com'
// The SMTP login must match the account the app password was generated on —
// a mismatch here is what silently killed every notification before.
const DEFAULT_FROM_EMAIL = 'prolinewheelandtire@gmail.com'

function formatCurrency(amount?: number | null) {
    if (amount == null) return null
    return `$${amount.toFixed(2)}`
}

export function formatAppointmentDetails(opts: {
    service: string
    tireCount?: number | null
    rimSize?: number | string | null
    address: string
    vehicleDisplay: string
    phone: string
    appointmentDate?: string | Date
    guestName?: string
    includeStorage?: boolean
    quote: PriceQuote
}) {
    const { quote } = opts

    const lines = [
        opts.guestName ? `Customer: ${opts.guestName}` : null,
        `Service: ${getServiceDisplayName(opts.service)}`,
        opts.tireCount ? `Tires: ${opts.tireCount}` : null,
        opts.rimSize ? `Rim size: ${opts.rimSize}"` : null,
        opts.includeStorage ? 'Seasonal storage: Yes — tires to be stored' : null,
        `Address: ${opts.address}`,
        `Vehicle: ${opts.vehicleDisplay}`,
        `Phone: ${opts.phone}`,
        opts.appointmentDate ? `Appointment: ${format(new Date(opts.appointmentDate), 'PPpp')}` : null,
        '',
        'Pricing:',
        quote.requiresQuote
            ? '  Service price: To be quoted — we will contact you with any additional vehicle details needed for an accurate price.'
            : `  Service: ${formatCurrency(quote.basePrice)}`,
        quote.requiresQuote || !quote.shopSuppliesFee ? null : `  ${SHOP_SUPPLIES_LABEL}: ${formatCurrency(quote.shopSuppliesFee)}`,
        quote.requiresQuote || !quote.tireDisposalFee ? null : `  Tire disposal: ${formatCurrency(quote.tireDisposalFee)}`,
        quote.requiresQuote || !quote.storageFee ? null : `  Seasonal storage: ${formatCurrency(quote.storageFee)}`,
        quote.requiresQuote ? null : `  Mobile service fee: ${formatCurrency(quote.serviceFee)}`,
        quote.requiresQuote
            ? '  Total: Quote pending (no online payment collected)'
            : `  Total paid: ${formatCurrency(quote.totalPrice)}`,
    ]

    return lines.filter(Boolean).join('\n')
}

/**
 * Delivers the booking notifications on every configured channel. Each channel is
 * independent and every failure is swallowed after logging: a booking is already
 * paid for and saved by the time this runs, so a broken mailbox must never turn
 * into a failed request for the customer.
 */
export async function sendBookingNotifications(opts: {
    customerEmail?: string | null
    details: string
    event?: H3Event
}): Promise<void> {
    const config = useRuntimeConfig(opts.event)

    const fromEmail = config.mailUser || DEFAULT_FROM_EMAIL
    const ownerEmail = config.mailOwner || DEFAULT_OWNER_EMAIL
    // Google displays app passwords as "abcd efgh ijkl mnop"; the spaces are
    // presentation only and must not reach the SMTP login.
    const pass = String(config.pass || '').replace(/\s+/g, '')

    const tasks: Array<Promise<unknown>> = []

    if (pass) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: fromEmail,
                pass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
        })

        if (opts.customerEmail) {
            tasks.push(
                transporter.sendMail({
                    from: fromEmail,
                    to: opts.customerEmail,
                    subject: 'Proline Wheel & Tire - Appointment confirmed',
                    text: `Your appointment has been received. We will be in contact with you shortly.\n\n${opts.details}`,
                }).catch((e: any) => {
                    console.error('[notify] customer email failed:', e?.message)
                }),
            )
        }

        tasks.push(
            transporter.sendMail({
                from: fromEmail,
                to: ownerEmail,
                subject: 'New Appointment',
                text: `You got a new appointment\n\n${opts.details}`,
            }).catch((e: any) => {
                console.error('[notify] owner email failed:', e?.message)
            }),
        )
    } else {
        console.error('[notify] NUXT_PASS is not set — no appointment emails were sent')
    }

    // Optional push channel. Unset NUXT_NTFY_TOPIC leaves it completely inert.
    if (config.ntfyTopic) {
        tasks.push(
            $fetch(`https://ntfy.sh/${config.ntfyTopic}`, {
                method: 'POST',
                body: opts.details,
                headers: {
                    Title: 'New Appointment',
                    Tags: 'car',
                },
                signal: AbortSignal.timeout(5000),
            }).catch((e: any) => {
                console.error('[notify] ntfy push failed:', e?.message)
            }),
        )
    }

    await Promise.allSettled(tasks)
}
