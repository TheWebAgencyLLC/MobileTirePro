import {
  SERVICE_PRICING,
  getServiceFeeForZip,
  installationBasePrice,
  shopSuppliesFee,
  tireDisposalFee,
} from '~/config/service-pricing'
import { servicesSchema } from '~/server/models/services.schema'

export type ChangeoverType = 'assembly' | 'tires'

export interface PriceQuoteInput {
  serviceName: string
  rimSize?: number | string | null
  tireCount?: number | null
  zip: string
  changeoverType?: ChangeoverType | null
  includeStorage?: boolean
}

export interface PriceQuote {
  requiresQuote: boolean
  basePrice: number
  shopSuppliesFee: number
  tireDisposalFee: number
  storageFee: number
  serviceFee: number
  totalPrice: number
  totalCents: number
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

function badRequest(message: string) {
  return createError({ statusCode: 400, statusMessage: message })
}

function requirePositiveInt(value: unknown, field: string, max = 4): number {
  const n = Number(value)
  if (!Number.isInteger(n) || n < 1 || n > max) {
    throw badRequest(`Invalid ${field}`)
  }
  return n
}

function requireRimSize(value: unknown): number {
  const n = Number(value)
  if (!Number.isFinite(n) || n < 12 || n > 22) {
    throw badRequest('Invalid rim size')
  }
  return n
}

/**
 * Recomputes every price from raw inputs. The client's numbers are never trusted —
 * this is the only place a bookable price is allowed to come from.
 */
export async function computePriceQuote(input: PriceQuoteInput): Promise<PriceQuote> {
  const name = String(input.serviceName ?? '').trim()
  if (!name) throw badRequest('Missing service')

  const serviceFee = getServiceFeeForZip(input.zip)
  if (serviceFee == null) throw badRequest('We do not currently service that zip code')

  const lower = name.toLowerCase()
  const requiresQuote = lower.includes('oil change')

  let basePrice = 0
  let supplies = 0
  let disposal = 0
  let storageFee = 0

  if (requiresQuote) {
    // Quoted by hand after the booking — nothing is collected online.
    return {
      requiresQuote: true,
      basePrice: 0,
      shopSuppliesFee: 0,
      tireDisposalFee: 0,
      storageFee: 0,
      serviceFee: 0,
      totalPrice: 0,
      totalCents: 0,
    }
  }

  if (lower.includes('changeover')) {
    const isAssembly = input.changeoverType === 'assembly' || lower.includes('assembly')
    if (isAssembly) {
      basePrice = SERVICE_PRICING.seasonalChangeoverAssembly
    } else {
      basePrice = installationBasePrice(
        requireRimSize(input.rimSize),
        requirePositiveInt(input.tireCount, 'tire count'),
      )
    }
    if (input.includeStorage) storageFee = SERVICE_PRICING.seasonalStorageFee
  } else if (lower.includes('installation')) {
    const count = requirePositiveInt(input.tireCount, 'tire count')
    basePrice = installationBasePrice(requireRimSize(input.rimSize), count)
    supplies = shopSuppliesFee(count)
    disposal = tireDisposalFee(count)
  } else if (lower.includes('repair')) {
    const count = requirePositiveInt(input.tireCount, 'tire count')
    basePrice = SERVICE_PRICING.repairFlat
    supplies = shopSuppliesFee(count)
  } else if (lower.includes('rotation')) {
    basePrice = SERVICE_PRICING.rotationFlat
  } else {
    // Any other service the owner has added in the database: use its stored price.
    const dbService: any = await servicesSchema.findOne({
      name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'),
      isActive: true,
    })
    if (!dbService) throw badRequest('Unknown service')
    basePrice = Number(dbService.Price ?? dbService.price ?? 0)
    if (!Number.isFinite(basePrice) || basePrice <= 0) throw badRequest('Unknown service')
  }

  basePrice = round2(basePrice)
  supplies = round2(supplies)
  disposal = round2(disposal)
  storageFee = round2(storageFee)

  const totalPrice = round2(basePrice + supplies + disposal + storageFee + serviceFee)

  return {
    requiresQuote: false,
    basePrice,
    shopSuppliesFee: supplies,
    tireDisposalFee: disposal,
    storageFee,
    serviceFee,
    totalPrice,
    totalCents: Math.round(totalPrice * 100),
  }
}
