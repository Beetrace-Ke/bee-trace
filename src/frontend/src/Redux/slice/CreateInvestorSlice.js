import { createSlice } from "@reduxjs/toolkit";
import { CreateInvestorProfileThunk } from "../action/CreateInvestorProfile";

const initialState = {
  load: false,
  CreateInvestorProfile: null,
  error: null,
}

const CreateInvestorProfileSlice = createSlice({
  name: "CreateInvestorProfile",
  initialState,
  reducers: {
  },
  extraReducers: {
    [CreateInvestorProfileThunk.pending]: (state) => {
      return {
        ...state,
        load: true
      }
    },
    [CreateInvestorProfileThunk.rejected]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        error: payload
      }
    },
    [CreateInvestorProfileThunk.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        CreateInvestorProfile: payload
      }
    }
  }
})

export default CreateInvestorProfileSlice.reducer;