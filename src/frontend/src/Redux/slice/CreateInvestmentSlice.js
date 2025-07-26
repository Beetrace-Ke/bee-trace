import { createSlice } from "@reduxjs/toolkit";
import { CreateInvestmentThunk } from "../action/CreateInvestment";

const initialState = {
  load: false,
  CreateInvestment: null,
  error: null,
}

const CreateInvestmentSlice = createSlice({
  name: "CreateInvestment",
  initialState,
  reducers: {
  },
  extraReducers: {
    [CreateInvestmentThunk.pending]: (state) => {
      return {
        ...state,
        load: true
      }
    },
    [CreateInvestmentThunk.rejected]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        error: payload
      }
    },
    [CreateInvestmentThunk.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        CreateInvestment: payload
      }
    }
  }
})

export default CreateInvestmentSlice.reducer;