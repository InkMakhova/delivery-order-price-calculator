// Package imports
import React, {JSX, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Types
import { venueSlugs } from '../types/venue-slugs'
import { DeliveryPriceParameters, OrderDetails, OrderFormData, PriceDetails } from '../types/types'

// Services
import { fetchVenueSlugData } from '../services/api'

// Utils
import { calculateOrder } from '../util/util'

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

  const initialPriceDetails: {data: PriceDetails | null, error: string | null} = {
    data: null,
    error: null
  }

  // States
  const [deliveryPriceParameters, setDeliveryPriceParameters] =
    useState<DeliveryPriceParameters>(initialDeliveryParameters)

  const [orderDetails, setOrderDetails] =
    useState<{ data: OrderFormData, error: string | null }>(initialOrderDetails)

  const [deliveryPriceDetails, setDeliveryPriceDetails] =
    useState<{ data: PriceDetails | null, error: string | null}>(initialPriceDetails)

  const [pending, setPending] = useState(false)

  // Handlers
  const dispatchForm = (key: "data" | "error", newDetailEntries: Partial<OrderFormData> | string): void => {
    setOrderDetails((prevState) => {
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

  const submitForm = (): void => {
    // try {
    //   // Validate form data
    //  validationSchema.validate(orderDetails.data, { abortEarly: false });

      // Calculate order
      const transformedOrderDetails: OrderDetails = {
        cartValue: Number(orderDetails.data.cartValue) * 100,
        userLocation: {
          latitude: Number(orderDetails.data.userLatitude),
          longitude: Number(orderDetails.data.userLongitude)
        }
      };
      const priceDetails: PriceDetails | null = calculateOrder(transformedOrderDetails, deliveryPriceParameters);

      setDeliveryPriceDetails(() => {
        return {
          data: priceDetails ? priceDetails : null,
          error: priceDetails ? null : "Sorry! Delivery is not possible for this location. The distance is too long."
        };
      });
    // } catch (err) {
    //   if (err instanceof Yup.ValidationError) {
    //     // Handle validation errors
    //     const errorMessages = err.inner.map(error => error.message).join(', ');
    //     setOrderDetails(prevState => ({
    //       ...prevState,
    //       error: errorMessages
    //     }));
    //   }
    // }
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

    return () => {

    }
  }, [orderDetails.data.venueSlug])

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Card variant="outlined" sx={{ minWidth: 300, maxWidth: 600, width: "50%", }}>
        {/* Form */}
        <DeliveryOrderCalculatorForm
          orderDetails={orderDetails}
          dispatch={dispatchForm}
          onSubmit={submitForm}
          pending={pending}
        />

        <Box className="deliveryPriceContainer">
          <Divider />

          {/* Delivery calculation result */}
          { deliveryPriceDetails.data &&
            <DeliveryPriceDetails priceDetails={deliveryPriceDetails.data} />
          }

          {/* Delivery calculation error */}
          { deliveryPriceDetails.error &&
            <Typography variant="body1" className="error">
              {deliveryPriceDetails.error}
            </Typography>
          }
        </Box>
      </Card>
    </Grid>
  )
}

export default DeliveryOrderCalculator
