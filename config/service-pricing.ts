export const SERVICE_PRICING = {
  installPerTireUpTo18: 28,
  installPerTire19Plus: 33,
  rimSizeThreshold: 18,
  tireDisposalPerTire: 5,
  shopSuppliesPerTire: 3,
  rotationFlat: 40,
  repairFlat: 40,
} as const

export function installPricePerTire(rimSize: number): number {
  return rimSize <= SERVICE_PRICING.rimSizeThreshold
    ? SERVICE_PRICING.installPerTireUpTo18
    : SERVICE_PRICING.installPerTire19Plus
}

export function shopSuppliesFee(tireCount: number): number {
  return SERVICE_PRICING.shopSuppliesPerTire * tireCount
}

export function tireDisposalFee(tireCount: number): number {
  return SERVICE_PRICING.tireDisposalPerTire * tireCount
}

export function installationBasePrice(rimSize: number, tireCount: number): number {
  return installPricePerTire(rimSize) * tireCount
}

export function getServiceDisplayPrice(serviceName: string, dbPrice = 0): number {
  const name = serviceName.toLowerCase()
  if (name.includes('installation')) return SERVICE_PRICING.installPerTireUpTo18
  if (name.includes('repair')) return SERVICE_PRICING.repairFlat
  if (name.includes('rotation')) return SERVICE_PRICING.rotationFlat
  return dbPrice
}
