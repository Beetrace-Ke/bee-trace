import { createSlice } from "@reduxjs/toolkit";
import { CreateHiveThunk } from "../action/CreateHive";

const initialState = {
  load: false,
  CreateHive: null,
  error: null,
}

const CreateHiveSlice = createSlice({
  name: "CreateHive",
  initialState,
  reducers: {
  },
  extraReducers: {
    [CreateHiveThunk.pending]: (state) => {
      return {
        ...state,
        load: true
      }
    },
    [CreateHiveThunk.rejected]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        error: payload
      }
    },
    [CreateHiveThunk.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        CreateHive: payload
      }
    }
  }
})

export default CreateHiveSlice.reducer;