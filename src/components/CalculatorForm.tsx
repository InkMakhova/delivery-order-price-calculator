import Grid from '@mui/material/Grid2';
import { Button, TextField, Tooltip, Typography } from '@mui/material';

function CalculatorForm() {
  return (
    <Grid container justifyContent="center" spacing={1}>
      <form
        style={{minWidth: 300, maxWidth: 600, width: "50%", display: "flex", flexDirection: "column", padding: 20}}
        role="form"
      >
        {/* H1 Title */}
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            '-webkit-font-smoothing': 'antialiased',
            'text-rendering': 'optimizeLegibility',
            'font-variant-ligatures': 'common-ligatures',
            'font-family': '"WoltHeading-Omnes", -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Arimo", "Open Sans", sans-serif',
            'font-feature-settings': '"kern", "ss01", "ss05", "ss07"',
            'text-transform': 'none',
            margin: 0,
            padding: '0 1rem',
            'font-size': '2rem',
            'font-style': 'normal',
            'font-weight': 700,
            'font-stretch': '100%',
            'line-height': '2.5rem',
          }}
        >
          Delivery Order Price Calculator
        </Typography>

        {/* H2 Title */}
        <Typography variant="h2" gutterBottom style={{fontSize: "1.1em", fontWeight: 400, textAlign: "left", marginBottom: "1em"}}>
          Details
        </Typography>

        {/* Venue slag Input*/}
        <Tooltip title="Input venue slug" placement="top" arrow>
          <TextField
            id="venueSlug"
            data-test-id="venueSlug"
            label="Venue slug"
            variant="outlined"
            placeholder="Input venue slug"
            style={{marginBottom: "1em"}}
            aria-label="Venue slug"
            aria-required="true"
          />
        </Tooltip>

        {/* Cart value Input */}
        <Tooltip title="Input cart value" placement="top" arrow>
          <TextField
            id="cartValue"
            data-test-id="cartValue"
            label="Cart value (EUR)"
            variant="outlined"
            placeholder="Input cart value"
            style={{marginBottom: "1em"}}
            aria-label="Cart value in euro"
            aria-required="true"
          />
        </Tooltip>

        {/* User latitude Input */}
        <Tooltip title="Input user latitude" placement="top" arrow>
          <TextField
            id="userLatitude"
            data-test-id="userLatitude"
            label="User latitude"
            variant="outlined"
            placeholder="Input user latitude"
            style={{marginBottom: "1em"}}
            aria-label="User latitude"
            aria-required="true"
          />
        </Tooltip>

        {/* User longitude Input */}
        <Tooltip title="Input user longitude" placement="top" arrow>
          <TextField
            id="userLongitude"
            data-test-id="userLongitude"
            label="User longitude"
            variant="outlined"
            placeholder="Input user longitude"
            style={{marginBottom: "1em"}}
            aria-label="User longitude"
            aria-required="true"
          />
        </Tooltip>

        {/* Get location Button */}
        <Button data-test-id="getLocation" tabIndex={0}>
          Get location
        </Button>

        {/* Submit Button */}
        <Button type="submit" tabIndex={0}>
          Calculate delivery price
        </Button>
      </form>
    </Grid>
  )
}

export default CalculatorForm;
