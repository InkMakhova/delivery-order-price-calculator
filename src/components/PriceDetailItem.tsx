// Package imports
import React, {JSX, memo} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const formatToMoney = (value: number): string => {
  const stringValue = value.toString().padStart(3, '0');
  const length = stringValue.length;
  return `${stringValue.slice(0, length - 2)},${stringValue.slice(length - 2)}`;
}

const PriceDetailItem = (props: {title: string, value: number, unit: string}): JSX.Element => {
  const { title, value, unit} = props

  const formattedValue = unit === "EUR" ? formatToMoney(value) : value

  return (
    <Box sx={{display: "flex", justifyContent: "space-between"}}>
      <Typography variant={"body1"} fontWeight={600}>{title}</Typography>
      <Typography variant={"body1"}>
        <span data-raw-value={value}>{formattedValue}</span> {unit}
      </Typography>
    </Box>
  )
}

export default memo(PriceDetailItem)
