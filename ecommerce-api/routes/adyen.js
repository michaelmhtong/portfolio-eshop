const dotenv = require("dotenv");
dotenv.config();
const router = require("express").Router();
const { uuid } = require("uuidv4");
const { Client, Config, CheckoutAPI } = require("@adyen/api-library");

// Adyen Node.js API library boilerplate (configuration, etc.)
const config = new Config();
config.apiKey = process.env.REACT_APP_ADYEN_API_KEY;
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);

const url = process.env.CLIENT_URL;
const paymentStore = {};

// const determineHostUrl = (req) => {
//   let { "x-forwarded-proto": forwardedProto, "x-forwarded-host": forwardedHost } = req.headers;

//   if (process.env.REACT_APP_ADYEN_RETURN_URL) {
//     return process.env.REACT_APP_ADYEN_RETURN_URL;
//   }

//   if (forwardedProto && forwardedHost) {
//     if (forwardedProto.includes(",")) {
//       [forwardedProto] = forwardedProto.split(",");
//     }

//     return `${forwardedProto}://${forwardedHost}`;
//   }

//   return "http://localhost:8088";
// };

/* ################# API ENDPOINTS ###################### */
router.get("/", async (req, res) => res.json(paymentStore));

// Submitting a payment
router.post("/sessions", async (req, res) => {
  try {
    // unique ref for the transaction
    const orderRef = uuid();

    console.log("Received payment request for orderRef: " + orderRef);
    const { cart } = req.body;

    // Ideally the data passed here should be computed based on business logic
    const response = await checkout.sessions({
      countryCode: "NL",
      amount: { currency: "EUR", value: cart.total * 100 }, // value is 100€ in minor units
      reference: orderRef, // required
      merchantAccount: process.env.REACT_APP_ADYEN_MERCHANT_ACCOUNT, // required
      returnUrl: `${url}/order`, // required for 3ds2 redirect flow
      // set lineItems required for some payment methods (ie Klarna)
      lineItems: cart.products.map((product) => {
        return {
          description: product.title,
          quantity: product.quantity,
          amountIncludingTax: product.price * 100,
        };
      }),
    });

    // save transaction in memory
    paymentStore[orderRef] = {
      amount: { currency: "EUR", value: cart.total * 100 },
      reference: orderRef,
    };

    res.json([response, orderRef]); // sending a tuple with orderRef as well to inform about the unique order reference
  } catch (err) {
    console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
    res.status(err.statusCode).json(err.message);
  }
});

module.exports = router;
