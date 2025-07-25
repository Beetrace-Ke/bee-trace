import { createSlice } from "@reduxjs/toolkit";
import { getInvestorByOwner } from "../action/GeInvestorByOwner";

const initialState = {
  investor: {},
  loading: false,
  error: null,
};

const investorSlice = createSlice({
  name: "investor",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetInvestor: (state) => {
      state.investor = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getInvestorByOwner action
      .addCase(getInvestorByOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvestorByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.investor = action.payload;
        state.error = null;
      })
      .addCase(getInvestorByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetInvestor } = investorSlice.actions;
export default investorSlice.reducer;