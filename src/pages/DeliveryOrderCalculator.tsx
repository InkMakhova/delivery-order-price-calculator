// Package imports
import React, { JSX, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Types
import { venueSlugs } from '../types/venue-slugs'
import { DeliveryPriceParameters, OrderDetail, OrderFormData, PriceDetail } from '../types/types'

// Services
import { fetchVenueSlugData } from '../services/api'

// Utils
import { calculateOrder, formatOrderDetails } from '../util/util'

// Component imports
import DeliveryOrderCalculatorForm from '../components/DeliveryOrderCalculatorForm'
import DeliveryPriceDetails from '../components/DeliveryPriceDetails'

function DeliveryOrderCalculator():JSX.Element {
  // Initial states
  const initialDeliveryParameters: DeliveryPriceParameters = {
    venueSlugLocation: {
      latitude: 0,
      longitude: 0
    },
    noSurchargeMin: 0,
    basePrice: 0,
    distanceRanges: [{
      min: 0,
      max: 0,
      a: 0,
      b: 0,
      flag: null
    }]
  }

  const initialOrderDetails: {data: OrderFormData, error: string | null} = {
    data: {
      venueSlug: venueSlugs[0],
      cartValue: "",
      userLatitude: "",
      userLongitude: ""
    },
    error: null
  }

  const initialPriceDetails: {data: PriceDetail | null, error: string | null} = {
    data: null,
    error: null
  }

  // States
  const [deliveryPriceParameters, setDeliveryPriceParameters] =
    useState<DeliveryPriceParameters>(initialDeliveryParameters)

  const [orderDetails, setOrderDetails] =
    useState<{ data: OrderFormData, error: string | null }>(initialOrderDetails)

  const [deliveryPriceDetails, setDeliveryPriceDetails] =
    useState<{ data: PriceDetail | null, error: string | null}>(initialPriceDetails)

  const [pending, setPending] = useState<boolean>(false)

  // Handlers
  const dispatchForm = (key: "data" | "error", newDetailEntries: Partial<OrderFormData> | string): void => {
    setOrderDetails((prevState:typeof initialOrderDetails) => {
      if (key === "data" && typeof newDetailEntries !== "string") {
        return {
          ...prevState,
          data: { ...prevState.data, ...newDetailEntries }
        }
      }
      if (key === "error" && typeof newDetailEntries === "string") {
        return {
          ...prevState,
          error: newDetailEntries
        }
      }
      return prevState;
    })
  }

  const clearPriceDetails = (): void => {
    setDeliveryPriceDetails(initialPriceDetails)
  }

  const submitForm = (): void => {
    // Calculate order
    const formattedOrderDetails: OrderDetail = formatOrderDetails(orderDetails.data)
    const priceDetails: PriceDetail | null = calculateOrder(formattedOrderDetails, deliveryPriceParameters)

    setDeliveryPriceDetails(() => {
      return {
        data: priceDetails ? priceDetails : null,
        error: priceDetails ? null : "Sorry! Delivery is not possible for this location. The distance is too long."
      };
    });
  }

  useEffect(() => {
    if (orderDetails.data.venueSlug) {
      const successHandler = (data: any): void => {
        setDeliveryPriceParameters(data)
      }

      const errorHandler = (status: string): void => {
        setOrderDetails(prevState => {
          return { ...prevState, "error": status }
        })
      }

      // Reset error before fetching new data
      setOrderDetails(prevState => {
        return { ...prevState, "error": null }
      })

      fetchVenueSlugData(orderDetails.data.venueSlug, setPending, successHandler, errorHandler)
    }
  }, [orderDetails.data.venueSlug])

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Card variant="outlined" sx={{ minWidth: 300, maxWidth: 600, width: "50%", }}>
        {/* Form */}
        <DeliveryOrderCalculatorForm
          orderDetails={orderDetails}
          dispatch={dispatchForm}
          clearPriceDetails={clearPriceDetails}
          submit={submitForm}
          pending={pending}
        />

        {/* Delivery calculation result */}
        { deliveryPriceDetails.data &&
          <Box className="deliveryPriceContainer">
            <DeliveryPriceDetails priceDetails={deliveryPriceDetails.data} />
          </Box>
        }

        {/* Delivery calculation error */}
        { deliveryPriceDetails.error &&
          <Box className="deliveryPriceContainer">
            <Divider />
            <Typography variant="body1" className="error">
              {deliveryPriceDetails.error}
            </Typography>
          </Box>
        }
      </Card>
    </Grid>
  )
}

export default DeliveryOrderCalculator
