// Package imports
import React, {useState} from 'react'
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

  const fieldHandler = {
    cartValue: (value: string) => /^[0-9]+([.,][0-9]+)?$/.test(value) ? null : "Please enter cart value (positive number only)",
    userLatitude: (value: string) => /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/.test(value) ? null : "Please enter latitude (must be between -90 and 90)",
    userLongitude: (value: string) => /^-?([1-9]?[0-9](\.\d+)?|1[0-7][0-9](\.\d+)?|180(\.0+)?)$/.test(value) ? null : "Please enter longitude (must be between -180 and 180)"
  }

  // Initial state
  const initialValidationErrors = {
    cartValue: null,
    userLatitude: null,
    userLongitude: null
  }

  // State
  const [validationErrors, setValidationErrors] =
    useState<{cartValue: string | null, userLatitude: string | null, userLongitude: string | null}>(initialValidationErrors)

  // Handlers
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

  const validate = (name: keyof typeof fieldHandler, value: string ): void => {
    setValidationErrors(prevState => ({
      ...prevState,
      [name]: validateField(name,value)
    }));
  }

  const validateField = (name: keyof typeof fieldHandler, value: string): string | null => {
    if (fieldHandler[name]) {
      return fieldHandler[name](value)
    }
    return null;
  }

  const valid = () => {
    const cartValueValid = /^[0-9]+([.,][0-9]+)?$/.test(orderDetails.data.cartValue);
    const latitudeValid = /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/.test(orderDetails.data.userLatitude);
    const longitudeValid = /^-?([1-9]?[0-9](\.\d+)?|1[0-7][0-9](\.\d+)?|180(\.0+)?)$/.test(orderDetails.data.userLongitude);

    setValidationErrors(prevState => {
      return {
        ...prevState,
        cartValue: !cartValueValid ? "Please enter cart value (positive number only)" : null,
        userLatitude: !latitudeValid ? "Please enter latitude (must be between -90 and 90)" : null,
        userLongitude: !longitudeValid ? "Please enter longitude (must be between -180 and 180)" : null
      }
    })

    if (!cartValueValid || !latitudeValid || !longitudeValid) {
      return false;
    }

    return true;
  }

  const submit = (evt: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }): void => {
    evt.preventDefault()
    const isValid = valid()
    if (isValid) onSubmit()
  }

  // Render
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
      </Box>

      {/* Cart value Input */}
      <Box className="inputContainer">
        <Tooltip title="Input cart value" placement="top" arrow>
          <TextField
            id="cartValue"
            name="cartValue"
            type="number"
            label="Cart value (EUR)"
            variant="outlined"
            placeholder="Input cart value"
            aria-label="Cart value in euro"
            aria-required="true"
            inputProps={{"data-test-id": "cartValue"}}
            value={orderDetails.data.cartValue}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
              let value = evt.target.value.replace(/[+eE]/g, "");
              if (value.indexOf('-') > 0) {
                value = value.replace(/-/g, "");
              }
              dispatch("data", { cartValue: value });
            }}
            onBlur={(evt) => {
              validate("cartValue",evt.target.value)
            }}
            required
            error={!!validationErrors.cartValue}
            helperText={validationErrors.cartValue}
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
            type="number"
            label="User latitude"
            variant="outlined"
            placeholder="Input user latitude"
            aria-label="User latitude"
            aria-required="true"
            inputProps={{
              "data-test-id": "userLatitude",
              maxLength: 32
            }}
            value={orderDetails.data.userLatitude}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch("data", {"userLatitude": evt.target.value})
            }}
            onBlur={(evt) => {
              validate("userLatitude",evt.target.value)
            }}
            required
            error={!!validationErrors.userLatitude}
            helperText={validationErrors.userLatitude}
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
            type="number"
            label="User longitude"
            variant="outlined"
            placeholder="Input user longitude"
            aria-label="User longitude"
            aria-required="true"
            inputProps={{
              "data-test-id": "userLongitude",
              maxLength: 32
            }}
            value={orderDetails.data.userLongitude}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>): void => {
              dispatch("data",{"userLongitude": evt.target.value})
            }}
            onBlur={(evt) => {
              validate("userLongitude",evt.target.value)
            }}
            required
            error={!!validationErrors.userLongitude}
            helperText={validationErrors.userLongitude}
            fullWidth
          />
        </Tooltip>
      </Box>

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
