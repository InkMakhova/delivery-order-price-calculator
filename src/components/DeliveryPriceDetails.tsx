// Package imports
import React, { JSX, memo } from 'react'
import Typography from '@mui/material/Typography'

// Types
import { PriceDetails } from '../types/types'

// Component imports
import PriceDetailItem from './PriceDetailItem'

const DeliveryPriceDetails = ({ priceDetails }: { priceDetails: PriceDetails }): JSX.Element => {
  return (
   <>
      {/* H2 Title */}
      <Typography variant="h2" gutterBottom>
        Price breakdown
      </Typography>

      <PriceDetailItem title={"Cart value"} value={priceDetails.cartValue} unit={"EUR"} />

      <PriceDetailItem title={"Delivery fee"} value={priceDetails.deliveryFee} unit={"EUR"} />

      <PriceDetailItem title={"Delivery distance"} value={priceDetails.deliveryDistance} unit={"M"} />

      <PriceDetailItem title={"Small order surcharge"} value={priceDetails.smallOrderSurcharge} unit={"EUR"} />

      <PriceDetailItem title={"Total price"} value={priceDetails.totalPrice} unit={"EUR"} />
   </>
  )
}

export default memo(DeliveryPriceDetails)
