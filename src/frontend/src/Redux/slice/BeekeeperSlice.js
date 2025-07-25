  import { createSlice } from "@reduxjs/toolkit";
  import { getBeeKeeperByOwner } from "../action/GetBeeKeeperByOwner";

  const initialState = {
    beeKeeper: {},
    loading: false,
    error: null,
  };

  const beekeeperSlice = createSlice({
    name: "beekeeper",
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
      resetBeeKeeper: (state) => {
        state.beeKeeper = {};
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // getBeeKeeperByOwner action
        .addCase(getBeeKeeperByOwner.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getBeeKeeperByOwner.fulfilled, (state, action) => {
          state.loading = false;
          state.beeKeeper = action.payload;
          state.error = null;
        })
        .addCase(getBeeKeeperByOwner.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export const { clearError, resetBeeKeeper } = beekeeperSlice.actions;
  export default beekeeperSlice.reducer;