const dotenv = require("dotenv");
dotenv.config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { resolve } = require("path");
const { orderId } = require("./order");

router.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/src/pages/payment.jsx");
  res.sendFile(path);
});

router.post("/create-checkout-session", async (req, res) => {
  const orderId = global.orderId; // Access the global variable
  const line_items = req.body.products.map((product) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: product.title,
          images: [product.img],
          metadata: {
            id: product.id,
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/order/${orderId}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });
});

module.exports = router;
