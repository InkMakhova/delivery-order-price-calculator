// Package imports
import axios, { AxiosResponse } from 'axios'

// Types
import { DeliveryPriceParameters } from '../types/types'

const VENUES_API =
  "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/"

const endpoints = [
  VENUES_API + "<VENUE SLUG>/static",
  VENUES_API + "<VENUE SLUG>/dynamic"
]

const modifyEndpoint = (endpoint: string, venueSlug: string): string => (
  endpoint.replace("<VENUE SLUG>", venueSlug)
)

export const fetchVenueSlugData = async (
    venueSlag: string,
    pending: (pending: boolean) => void,
    successCb: (data: any) => void,
    errorCb: (status: string) => void
  ): Promise<void>  => {
    const modifiedEndpoints = endpoints.map(endpoint => modifyEndpoint(endpoint,venueSlag))

    pending(true)

    axios.all(modifiedEndpoints.map((endpoint: string) => axios.get(endpoint)))
      .then((response: AxiosResponse<any, any>[]): void => {
        const staticData = response[0].data
        const dynamicData = response[1].data

        const newDeliveryParameters: DeliveryPriceParameters = {
          venueSlugLocation: {
            latitude: staticData.venue_raw.location.coordinates[1],
            longitude: staticData.venue_raw.location.coordinates[0]
          },
          noSurchargeMin: dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge,
          basePrice: dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price,
          distanceRanges: dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges
        }

        successCb(newDeliveryParameters)
      })
      .catch(e => {
        let status: string = "Ups! Something went wrong. Please, try again later"
        if (axios.isAxiosError(e)) {
          const response: AxiosResponse<any> |undefined = e.response

          if (e.code === 'ERR_NETWORK' || e.code === 'ERR_CANCELED') {
            status = "Please check your internet connection."
          } else if (response) {
            const code: number = response.status
            const message = response.data?.message

            if (code === 401) {
              status = "You are not authorized."
            } else if (code === 403) {
              status = "Access is forbidden."
            } else if (code === 404) {
              status = "Data not found."
            } else if (code >= 400 && code < 500 && message) {
              status = message
            }
          }
        }
        errorCb(status)
      })
      .finally((): void => { pending(false)});
}
