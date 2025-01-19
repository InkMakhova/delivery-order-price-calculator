import { getDistance } from 'geolib'
import { Location, DeliveryPriceParameters, DistanceRange, OrderDetails, PriceDetails } from '../types/types';

const calculateDistance = (userLocation: Location, venueSlugLocation: Location): number => (
  getDistance(userLocation, venueSlugLocation)
)

const getDistanceRange = (distance: number, distanceRanges: DistanceRange[]): DistanceRange | null => {
  let distanceRange: DistanceRange | null = {
    min: 0,
    max: 0,
    a: 0,
    b: 0,
    flag: null
  }

  for (let i: number = 0; i < distanceRanges.length; i++) {
    if (distance >= distanceRanges[i].min && distance < distanceRanges[i].max) {
      distanceRange = distanceRanges[i]
      break
    }
  }

  return distanceRange.max > 0 ? distanceRange : null
}

export const calculateOrder = (
  orderDetails: OrderDetails,
  deliveryParameters: DeliveryPriceParameters): PriceDetails | null => {
    const {
      cartValue,
      userLocation
    } = orderDetails

    const {
      venueSlugLocation,
      distanceRanges,
      basePrice,
      noSurchargeMin
    } = deliveryParameters

    // Calculate distance (in meters)
    const distance: number = calculateDistance(userLocation,venueSlugLocation)

    // Calculate order surcharge
    const minPriceCartValueDif: number = (noSurchargeMin - cartValue)
    const orderSurcharge: number = minPriceCartValueDif > 0 ? minPriceCartValueDif : 0

    // Find distance range
    const distanceRange: DistanceRange | null = getDistanceRange(distance, distanceRanges)

    if (distanceRange) {
      // Calculate delivery fee and total price
      const deliveryFee = basePrice + distanceRange.a + Math.round(distanceRange.b * distance / 10)
      const totalPrice = cartValue + orderSurcharge + deliveryFee

      return {
        cartValue: cartValue,
        smallOrderSurcharge: orderSurcharge,
        deliveryFee: deliveryFee,
        deliveryDistance: distance,
        totalPrice: totalPrice
      }
    }

    return null
}

