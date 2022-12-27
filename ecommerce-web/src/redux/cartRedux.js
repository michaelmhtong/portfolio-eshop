import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) =>
          product._id === action.payload._id &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
      toast.success("Added to the cart");
    },
    increaseQuantity(state, action) {
      const existingProduct = state.products.find(
        (product) =>
          product._id === action.payload._id &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        state.quantity += 1;
        state.total += action.payload.price;
      }
    },
    decreaseQuantity(state, action) {
      const existingProduct = state.products.find(
        (product) =>
          product._id === action.payload._id &&
          product.color === action.payload.color &&
          product.size === action.payload.size
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        state.quantity -= 1;
        state.total -= action.payload.price;
      }
    },
    removeProduct(state, action) {
      const nextProducts = state.products.filter(
        (product) =>
          product._id !== action.payload._id ||
          product.color !== action.payload.color ||
          product.size !== action.payload.size
      );
      state.products = nextProducts;
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;
      toast.success("Removed from the cart");
      return state;
    },
    clearCart(state, action) {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
