export const SERVICE_PRICING = {
  installPerTireUpTo18: 28,
  installPerTire19Plus: 33,
  rimSizeThreshold: 18,
  tireDisposalPerTire: 5,
  shopSuppliesPerTire: 3,
  rotationFlat: 40,
  repairFlat: 40,
  seasonalChangeoverAssembly: 125,
  seasonalStorageFee: 49.95,
} as const

export const SHOP_SUPPLIES_LABEL = 'Shop supplies (Wheel Weights/Valve Stems)'

export const ZIP_SERVICE_AREAS = [
  { name: 'Algonquin', price: 50, zip: ['60013', '60102', '60118', '60142', '60156'] },
  { name: 'Antioch', price: 75, zip: ['60002'] },
  { name: 'Barrington', price: 75, zip: ['60010', '60011'] },
  { name: 'Carpentersville', price: 75, zip: ['60102', '60110', '60118'] },
  { name: 'Cary', price: 50, zip: ['60013'] },
  { name: 'Crystal Lake', price: 50, zip: ['60012', '60014', '60039'] },
  { name: 'Grayslake', price: 50, zip: ['60030'] },
  { name: 'Gurnee', price: 75, zip: ['60031'] },
  { name: 'Huntley', price: 50, zip: ['60142'] },
  { name: 'Hawthorne Woods', price: 75, zip: ['60047', '60060'] },
  { name: 'Island Lake', price: 50, zip: ['60042', '60051', '60084'] },
  { name: 'Johnsburg', price: 50, zip: ['60050', '60051'] },
  { name: 'Lake in the Hills', price: 50, zip: ['60102', '60156'] },
  { name: 'Lake Villa', price: 75, zip: ['60046'] },
  { name: 'Lake Zurich', price: 75, zip: ['60047', '60049'] },
  { name: 'Lakemoor', price: 50, zip: ['60041', '60050', '60051', '60073'] },
  { name: 'McHenry', price: 50, zip: ['60050', '60051'] },
  { name: 'Richmond', price: 50, zip: ['60071'] },
  { name: 'Ringwood', price: 50, zip: ['60072'] },
  { name: 'Round Lake', price: 50, zip: ['60073'] },
  { name: 'Spring grove', price: 50, zip: ['60081'] },
  { name: 'Volo', price: 50, zip: ['60020', '60041', '60051', '60073'] },
  { name: 'Wauconda', price: 50, zip: ['60084'] },
  { name: 'Wonder Lake', price: 50, zip: ['60097'] },
  { name: 'Woodstock', price: 50, zip: ['60098'] },
]

export function getServiceFeeForZip(zip: string): number | null {
  const match = ZIP_SERVICE_AREAS.find(area => area.zip.includes(String(zip ?? '').trim()))
  return match ? match.price : null
}

export function getServiceDisplayName(serviceName: string): string {
  if (serviceName.toLowerCase().includes('rotation')) return 'Tire Rotation'
  return serviceName
}

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
