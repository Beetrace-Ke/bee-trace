import { createSlice } from "@reduxjs/toolkit";
import { GetMyHivesThunk } from "../action/GetMyHives";

const initialState = {
  load: false,
  GetMyHives: null,
  error: null,
}

const GetMyHivesSlice = createSlice({
  name: "GetMyHives",
  initialState,
  reducers: {
  },
  extraReducers: {
    [GetMyHivesThunk.pending]: (state) => {
      return {
        ...state,
        load: true
      }
    },
    [GetMyHivesThunk.rejected]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        error: payload
      }
    },
    [GetMyHivesThunk.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        GetMyHives: payload
      }
    }
  }
})

export default GetMyHivesSlice.reducer;