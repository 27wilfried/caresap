import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  filteredOrders: [],
  totalOrderAmount: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orderHistory = action.payload.orderHistory || [];
    },
    SORT_ORDERS(state, action) {
      const { orders, sortBy } = action.payload;
      let filterOrd = [];

      if (sortBy === "recent") {
        filterOrd = orders?.slice().sort((a, b) => {
          return new Date(b?.createdAt) - new Date(a?.createdAt);
        });
      }

      if (sortBy === "oldest") {
        filterOrd = orders?.slice().sort((a, b) => {
          return new Date(a?.createdAt) - new Date(b?.createdAt);
        });
      }

      if (sortBy === "amount_low") {
        filterOrd = orders?.slice().sort((a, b) => {
          return a?.montant_total - b?.montant_total;
        });
      }

      if (sortBy === "amount_high") {
        filterOrd = orders?.slice().sort((a, b) => {
          return b?.montant_total - a?.montant_total;
        });
      }
      state.filteredOrders = filterOrd;
    },
    CALC_TOTAL_ORDER_AMOUNT(state, action) {
      const array = [];
      state.orderHistory.map((item) => {
        const { montant_total } = item;
        return array.push(montant_total);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrderAmount = totalAmount;
    },
  },
});

export const { STORE_ORDERS, SORT_ORDERS, CALC_TOTAL_ORDER_AMOUNT } =
  orderSlice.actions;

export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;
export const selectFilteredOrders = (state) => state.orders.filteredOrders;

export default orderSlice.reducer;
