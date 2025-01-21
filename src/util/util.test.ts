import { calculateOrder, formatOrderDetails} from './util'
import { getDistance } from 'geolib'
import { DeliveryPriceParameters, OrderDetail, OrderFormData, PriceDetail } from '../types/types'

jest.mock("geolib", () => ({
  getDistance: jest.fn(),
}))

describe("formatOrderDetails", () => {
  it("should format order details correctly", () => {
    const orderFormData: OrderFormData = {
      venueSlug: "home-assignment-venue-helsinki",
      cartValue: "123.45",
      userLatitude: "52.5200",
      userLongitude: "13.4050",
    }

    const expectedOrderDetail: OrderDetail = {
      cartValue: 12345,
      userLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
    }

    expect(formatOrderDetails(orderFormData)).toEqual(expectedOrderDetail);
  })

  it("should handle null cart value", () => {
    const orderFormData: OrderFormData = {
      venueSlug: "home-assignment-venue-tallinn",
      cartValue: null,
      userLatitude: "52.5200",
      userLongitude: "13.4050",
    }

    const expectedOrderDetail: OrderDetail = {
      cartValue: 0,
      userLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
    }

    expect(formatOrderDetails(orderFormData)).toEqual(expectedOrderDetail);
  })
})

describe("calculateOrder", () => {
  it("should calculate order details correctly", () => {
    const orderDetail: OrderDetail = {
      cartValue: 10000,
      userLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
    }

    const deliveryParameters: DeliveryPriceParameters = {
      venueSlugLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
      distanceRanges: [
        { min: 0, max: 1000, a: 100, b: 10, flag: null },
        { min: 1000, max: 2000, a: 200, b: 20, flag: null },
      ],
      basePrice: 500,
      noSurchargeMin: 15000,
    };

    (getDistance as jest.Mock).mockReturnValue(500)

    const expectedPriceDetail: PriceDetail = {
      cartValue: 10000,
      smallOrderSurcharge: 5000,
      deliveryFee: 1100,
      deliveryDistance: 500,
      totalPrice: 16100,
    }

    expect(calculateOrder(orderDetail, deliveryParameters)).toEqual(expectedPriceDetail)
  })

  it("should calculate order details correctly with border distance value", () => {
    const orderDetail: OrderDetail = {
      cartValue: 750,
      userLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
    }

    const deliveryParameters: DeliveryPriceParameters = {
      venueSlugLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
      distanceRanges: [
        { min: 0, max: 500, a: 100, b: 10, flag: null },
        { min: 500, max: 1000, a: 200, b: 20, flag: null },
        { min: 1000, max: 0, a: 200, b: 20, flag: null }
      ],
      basePrice: 500,
      noSurchargeMin: 1000,
    };

    (getDistance as jest.Mock).mockReturnValue(500)

    const expectedPriceDetail: PriceDetail = {
      cartValue: 750,
      smallOrderSurcharge: 250,
      deliveryFee: 1700,
      deliveryDistance: 500,
      totalPrice: 2700,
    }

    expect(calculateOrder(orderDetail, deliveryParameters)).toEqual(expectedPriceDetail)
  })

  it("should return null if no distance range is found", () => {
    const orderDetail: OrderDetail = {
      cartValue: 10000,
      userLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
    }

    const deliveryParameters: DeliveryPriceParameters = {
      venueSlugLocation: {
        latitude: 52.52,
        longitude: 13.405,
      },
      distanceRanges: [
        {min: 1000, max: 2000, a: 200, b: 20, flag: null},
      ],
      basePrice: 500,
      noSurchargeMin: 15000,
    };

    (getDistance as jest.Mock).mockReturnValue(500)

    expect(calculateOrder(orderDetail, deliveryParameters)).toBeNull()
  })
})
