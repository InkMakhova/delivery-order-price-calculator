// Package imports
import React from 'react'
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Types
import { venueSlugs } from '../types/venue-slugs'

const DeliveryOrderCalculatorForm = (props: {orderDetails: any, dispatch: any, onSubmit: any, pending: boolean}) => {
  const { orderDetails, dispatch, onSubmit, pending } = props

  const getLocation = () => {
    if ("geolocation" in navigator) {
      if (window.currentWatcherId) {
        navigator.geolocation.clearWatch(window.currentWatcherId);
      }
      window.currentWatcherId = navigator.geolocation.watchPosition(
        (position: GeolocationPosition): void => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          dispatch("data", { userLatitude: latitude, userLongitude: longitude });
        },
        (): void => {
          dispatch("error", "Error getting user location");
        }
      );
    } else {
      dispatch("error", "Geolocation is not supported by this browser.")
    }
  }

  const submit = (evt: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }): void => {
    evt.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={submit} >
      {/* H1 Title */}
      <Typography variant="h1" gutterBottom >
        Delivery Order Price Calculator
      </Typography>

      <Divider />

      {/* H2 Title */}
      <Typography variant="h2" gutterBottom>
        Details
      </Typography>

      {/* Venue slag Input*/}
      <Tooltip title="Select venue slug" placement="top" arrow>
        <FormControl>
          <InputLabel id="venueSlug">Venue slug</InputLabel>
          <Select
            id="venueSlug"
            name="venueSlug"
            labelId="venueSlug"
            label="Venue slug"
            input={<OutlinedInput id="venueSlug" label="Venue slug"/>}
            inputProps={{"data-test-id": "venueSlug"}}
            value={orderDetails.data.venueSlug}
            onChange={(evt: SelectChangeEvent): void => {
              dispatch("data", {
                "venueSlug": evt.target.value,
                "userLatitude": "",
                "userLongitude": ""
              })
            }}
          >
            {venueSlugs.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
          </Select>
        </FormControl>
      </Tooltip>

      {/* Cart value Input */}
      <Tooltip title="Input cart value" placement="top" arrow>
        <TextField
          id="cartValue"
          name="cartValue"
          label="Cart value (EUR)"
          variant="outlined"
          placeholder="Input cart value"
          aria-label="Cart value in euro"
          aria-required="true"
          inputProps={{"data-test-id": "cartValue"}}
          value={orderDetails.data.cartValue}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
            dispatch("data", {"cartValue": evt.target.value})
          }}
        />
      </Tooltip>

      {/* User latitude Input */}
      <Tooltip title="Input user latitude" placement="top" arrow>
        <TextField
          id="userLatitude"
          name="userLatitude"
          label="User latitude"
          variant="outlined"
          placeholder="Input user latitude"
          aria-label="User latitude"
          aria-required="true"
          inputProps={{"data-test-id": "userLatitude"}}
          value={orderDetails.data.userLatitude}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
            dispatch("data", {"userLatitude": evt.target.value})
          }}
        />
      </Tooltip>

      {/* User longitude Input */}
      <Tooltip title="Input user longitude" placement="top" arrow>
        <TextField
          id="userLongitude"
          name="userLongitude"
          label="User longitude"
          variant="outlined"
          placeholder="Input user longitude"
          aria-label="User longitude"
          aria-required="true"
          inputProps={{"data-test-id": "userLongitude"}}
          value={orderDetails.data.userLongitude}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
            dispatch("data",{"userLongitude": evt.target.value})
          }}
        />
      </Tooltip>

      { orderDetails.error &&
        <Box className="errorContainer">
          <Typography variant="body1" className="error" >
            {orderDetails.error}
          </Typography>
        </Box>
      }

      <Box className="buttonsContainer" >
        {/* Get location Button */}
        <Button
          type="button"
          size="large"
          tabIndex={0}
          data-test-id="getLocation"
          onClick={getLocation}
          disabled={pending}
        >
          Get location
        </Button>

        {/* Submit Button */}
        <Button
          type="submit"
          size="large"
          tabIndex={0}
          variant="contained"
          disabled={pending}
        >
          Calculate delivery price
        </Button>
      </Box>
    </form>
  )
}

export default DeliveryOrderCalculatorForm
