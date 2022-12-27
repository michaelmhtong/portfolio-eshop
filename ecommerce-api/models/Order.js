const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    products: [
      {
        productID: { type: String },
        title: { type: String, required: true },
        img: { type: String },
        quantity: { type: Number },
        size: { type: String },
        color: { type: String },
        price: { type: Number },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
