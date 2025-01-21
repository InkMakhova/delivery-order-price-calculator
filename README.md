# Delivery Order Price Calculator

The **Delivery Order Price Calculator** is an application designed to calculate delivery fees based on various parameters, including the venue slug, cart value, base price, delivery distance, minimum order amount, and additional factors. The app dynamically fetches required data from an API and computes the total price for an order, including delivery fees and potential surcharges.

---

## 📋 Specification

### Rules for Calculating the Delivery Fee

1. **Distance-Based Calculation**

   The delivery fee is determined by the distance (in meters) between:
    - The venue location (coordinates provided via a static API URL).
    - The user's location (retrieved using a "Get Location" button feature in the browser).

2. **Dynamic Parameters**

   Key parameters required for the calculation are fetched from an API URL, including:
   - `base_price`: The base delivery fee.
   - `order_minimum_no_surcharge`: The minimum cart value to avoid a surcharge.
   - `distance_ranges`: Parameters (`a` and `b`) that adjust the fee based on the delivery distance.

3. **Fee Formula**

   The delivery fee is calculated as:
   ```plaintext
   base_price + a + (b * distance / 10)
   ```
   - `a` and `b` are values retrieved from the `distance_ranges`.  
   - `distance` is the delivery distance (in meters).
   - if the distance exceeds the maximum allowable range, delivery is not available.

4. **Small Order Surcharge**

   If the cart value is less than the minimum order amount (`order_minimum_no_surcharge`): 
   - A small order surcharge is added.
   - The surcharge is calculated as:
   ```plaintext
   order_minimum_no_surcharge - cart_value
   ```
   - If the result is negative, the surcharge is set to 0.

5. **Total Price**
   The total order price is calculated as:
   ```plaintext
   cart_value + small_order_surcharge + delivery_fee
   ```
   - The small_order_surcharge is included only if applicable.
   
## 💻 Usage

### Install dependencies

```
npm install
```

### Available Scripts

You can use the following scripts to manage the app:

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: This is a one-way operation and is irreversible.**

Use this command to eject the default configuration and take full control over Webpack, Babel, and ESLint configurations.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
