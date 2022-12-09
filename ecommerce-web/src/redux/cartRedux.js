import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productIndex = state.products.findIndex((product) => product._id === action.payload._id);
      if (productIndex >= 0) {
        state.products[productIndex].quantity += action.payload.quantity;
        state.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    increaseQuantity(state, action) {
      const productIndex = state.products.findIndex((product) => product._id === action.payload._id);
      state.products[productIndex].quantity += 1;
      state.quantity += 1;
      state.total += action.payload.price;
    },
    decreaseQuantity(state, action) {
      const productIndex = state.products.findIndex((product) => product._id === action.payload._id);
      if (state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
        state.quantity -= 1;
        state.total -= action.payload.price;
      }
    },
    removeProduct(state, action) {
      state.products.map((product) => {
        if (product._id === action.payload._id) {
          const nextProducts = state.products.filter((item) => item._id !== product._id);
          state.products = nextProducts;
          state.quantity -= action.payload.quantity;
          state.total -= action.payload.price * action.payload.quantity;
        }
        return state;
      });
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
