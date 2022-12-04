const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51M6gAOJ18juM3jBwA6MpdNE1CZCJ267cfWseVtXT4PrBbLjBOjDPUR5dNRjSs83AKCRMSdmrglmqb1KVHIke7ei100705w4tDU"
);
const { resolve } = require("path");

router.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/src/pages/payment.jsx");
  res.sendFile(path);
});

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
