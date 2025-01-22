// Package imports
import React, { memo, useState } from 'react'
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
import { Validation, ValidationPattern } from '../types/types'

// Images
import logo from '../assets/images/logo.png'

const validationPattern: ValidationPattern = {
  cartValue: /^[0-9]+([.,][0-9]+)?$/,
  userLatitude: /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/,
  userLongitude: /^-?([1-9]?[0-9](\.\d+)?|1[0-7][0-9](\.\d+)?|180(\.0+)?)$/
}

const DeliveryOrderCalculatorForm = (props: {orderDetails: any, dispatch: any, clearPriceDetails: any, submit: any, pending: boolean}) => {
  const { orderDetails, dispatch, clearPriceDetails, submit, pending } = props

  // Initial state
  const initialValidation: Validation = {
    cartValue: null,
    userLatitude: null,
    userLongitude: null
  }

  // State
  const [validation, setValidation] =
    useState<Validation>(initialValidation)

  // Handlers
  const getLocation = (): void => {
    if ("geolocation" in navigator) {
      // Clear old price details
      clearPriceDetails()

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
        },
        // optimization options (Chrome gets location slowly)
        { enableHighAccuracy: false, timeout:60000, maximumAge: 0 }
      );
    } else {
      dispatch("error", "Geolocation is not supported by this browser.")
    }
  }

  const isFormValid = () => {
    const cartValueValid = validationPattern.cartValue.test(orderDetails.data.cartValue);
    const latitudeValid = validationPattern.userLatitude.test(orderDetails.data.userLatitude);
    const longitudeValid = validationPattern.userLongitude.test(orderDetails.data.userLongitude);

    setValidation(prevState => {
      return {
        ...prevState,
        cartValue: !cartValueValid ? "Please enter cart value (positive number only)" : null,
        userLatitude: !latitudeValid ? "Please enter latitude (must be between -90 and 90)" : null,
        userLongitude: !longitudeValid ? "Please enter longitude (must be between -180 and 180)" : null
      }
    })

    return cartValueValid && latitudeValid && longitudeValid;
  }

  const submitForm = (evt: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }): void => {
    evt.preventDefault()

    // Clear price details of previous data
    clearPriceDetails()

    // Validate form
    const isValid: boolean = isFormValid()

    // Submit
    if (isValid) submit()
  }

  // Render
  return (
    <form onSubmit={submitForm}>
      <Box className="headerContainer">
        {/* Logo */}
        <img src={logo} alt={"Wolt logo"} className={"appLogo"}/>
        {/* H1 Title */}
        <Typography variant="h1" gutterBottom >
          Delivery Order Price Calculator
        </Typography>
      </Box>

      <Divider/>

      {/* H2 Title */}
      <Typography variant="h2" gutterBottom>
        Details
      </Typography>

      {/* Venue slag Input*/}
      <Box className="inputContainer">
        <Tooltip title="Select venue slug" placement="top" arrow>
          <FormControl fullWidth>
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
                clearPriceDetails()

                dispatch("data", {
                  "venueSlug": evt.target.value,
                  "cartValue": "",
                  "userLatitude": "",
                  "userLongitude": ""
                })
              }}
            >
              { venueSlugs.map(venueSlug =>
                <MenuItem key={venueSlug.value} value={venueSlug.value}>{venueSlug.text}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Tooltip>
      </Box>

      {/* Cart value Input */}
      <Box className="inputContainer">
        <Tooltip title="Input cart value" placement="top" arrow>
          <TextField
            id="cartValue"
            name="cartValue"
            label="Cart value (EUR)"
            variant="outlined"
            placeholder="Input cart value"
            aria-label="Cart value in euro"
            inputProps={{
              "data-test-id": "cartValue",
              maxLength: 32
            }}
            value={orderDetails.data.cartValue}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
              clearPriceDetails()

              let value: string = evt.target.value.replace(" ", "");
              dispatch("data", {cartValue: value});
            }}
            error={!!validation.cartValue}
            helperText={validation.cartValue}
            fullWidth
          />
        </Tooltip>
      </Box>

      {/* User latitude Input */}
      <Box className="inputContainer">
        <Tooltip title="Input user latitude" placement="top" arrow>
          <TextField
            id="userLatitude"
            name="userLatitude"
            label="User latitude"
            variant="outlined"
            placeholder="Input user latitude"
            aria-label="User latitude"
            inputProps={{
              "data-test-id": "userLatitude",
              maxLength: 64
            }}
            value={orderDetails.data.userLatitude}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
              clearPriceDetails()

              const value: string = evt.target.value.replace(" ", "")
              dispatch("data", {"userLatitude": value})
            }}
            error={!!validation.userLatitude}
            helperText={validation.userLatitude}
            fullWidth
          />
        </Tooltip>
      </Box>

      {/* User longitude Input */}
      <Box className="inputContainer">
        <Tooltip title="Input user longitude" placement="top" arrow>
          <TextField
            id="userLongitude"
            name="userLongitude"
            label="User longitude"
            variant="outlined"
            placeholder="Input user longitude"
            aria-label="User longitude"
            inputProps={{
              "data-test-id": "userLongitude",
              maxLength: 32
            }}
            value={orderDetails.data.userLongitude}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
              clearPriceDetails()

              const value: string = evt.target.value.replace(" ", "")
              dispatch("data", {"userLongitude": value})
            }}
            error={!!validation.userLongitude}
            helperText={validation.userLongitude}
            fullWidth
          />
        </Tooltip>
      </Box>

      {orderDetails.error &&
        <Box className="errorContainer">
          <Typography variant="body1" className="error">
            {orderDetails.error}
          </Typography>
        </Box>
      }

      <Box className="buttonsContainer">
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

export default memo(DeliveryOrderCalculatorForm)
