import Grid from '@mui/material/Grid2';
import { Button, Card, TextField, Tooltip, Typography, Divider } from '@mui/material';

function CalculatorForm() {
  return (
    <Grid container justifyContent="center" spacing={1}>
    <Card variant="outlined" sx={{ minWidth: 300, maxWidth: 600, width: "50%", }}>
      <form
        style={{display: "flex", flexDirection: "column", padding: 20}}
        className="app_form"
      >
        {/* H1 Title */}
        <Typography
          variant="h1"
          gutterBottom
        >
          Delivery Order Price Calculator
        </Typography>

        <Divider style={{marginBottom: '1em'}}/>

        {/* H2 Title */}
        <Typography variant="h2" gutterBottom>
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

        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
        {/* Get location Button */}
        <Button data-test-id="getLocation" tabIndex={0} style={{paddingLeft: '1.5em', paddingRight: '1.5em'}}>
          Get location
        </Button>

        {/* Submit Button */}
        <Button type="submit" tabIndex={0} variant="contained" style={{paddingLeft: '1.5em', paddingRight: '1.5em'}}>
          Calculate delivery price
        </Button>
        </div>
      </form>
    </Card>
    </Grid>
  )
}

export default CalculatorForm;
