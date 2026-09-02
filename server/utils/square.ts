import { Client, Environment } from 'square'
import { randomUUID } from 'crypto'
import type { H3Event } from 'h3'

//@ts-ignore -- Square returns BigInt amounts, which JSON.stringify cannot serialize.
BigInt.prototype.toJSON = function () {
    return this.toString()
}

let client: Client | null = null

export function getSquareClient(event?: H3Event): Client {
    if (client) return client

    const config = useRuntimeConfig(event)
    if (!config.accessToken) {
        throw createError({ statusCode: 500, statusMessage: 'Payment service not configured' })
    }

    client = new Client({
        //@ts-ignore
        accessToken: config.accessToken,
        environment: config.public.squareEnvironment === 'sandbox' ? Environment.Sandbox : Environment.Production,
    })

    return client
}

export interface ChargeResult {
    paymentId: string
    receiptUrl?: string
}

/**
 * Charges a tokenized card. The amount comes from the server-side quote — never
 * from the browser. Throws a 402 on decline so callers can undo their reservation.
 */
export async function chargeCard(opts: {
    sourceId: string
    amountCents: number
    locationId: string
    idempotencyKey?: string
    event?: H3Event
}): Promise<ChargeResult> {
    const { paymentsApi } = getSquareClient(opts.event)

    if (!opts.locationId) {
        throw createError({ statusCode: 500, statusMessage: 'Payment location not configured' })
    }
    if (!Number.isInteger(opts.amountCents) || opts.amountCents <= 0) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid payment amount' })
    }

    try {
        const { result } = await paymentsApi.createPayment({
            locationId: opts.locationId,
            sourceId: opts.sourceId,
            idempotencyKey: opts.idempotencyKey || randomUUID(),
            amountMoney: {
                amount: BigInt(opts.amountCents),
                currency: 'USD',
            },
        })

        const paymentId = result?.payment?.id
        if (!paymentId) {
            throw createError({
                statusCode: 402,
                statusMessage: 'Payment was not completed',
                data: { code: 'PAYMENT_FAILED' },
            })
        }

        return { paymentId, receiptUrl: result?.payment?.receiptUrl }
    } catch (e: any) {
        if (e?.statusCode) throw e

        const detail = e?.errors?.[0]?.detail || e?.message || 'Payment failed'
        console.error('[square] charge failed:', detail)
        throw createError({
            statusCode: 402,
            statusMessage: detail,
            data: { code: 'PAYMENT_FAILED', detail },
        })
    }
}
