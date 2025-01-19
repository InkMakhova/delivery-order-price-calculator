import { venueSlugs } from './venue-slugs'

export type OrderFormData = {
  venueSlug: typeof venueSlugs[number],
  cartValue: string | number | null,
  userLatitude: string | number | null,
  userLongitude: string | number | null
}

export type Location = {
  latitude: number,
  longitude: number
}

export type DistanceRange = {
  min: number,
  max: number,
  a: number,
  b: number,
  flag: any
}

export type DeliveryPriceParameters = {
  venueSlugLocation: Location,
  noSurchargeMin: number,
  basePrice: number,
  distanceRanges: DistanceRange[]
}

export type OrderDetails = {
  cartValue: number,
  userLocation: Location
}

export type PriceDetails = {
  cartValue: number,
  smallOrderSurcharge: number,
  deliveryFee: number,
  deliveryDistance: number,
  totalPrice: number
}
