import { createSlice } from "@reduxjs/toolkit";
import { CreateHoneyBatchThunk } from "../action/CreateHoneyBatch";

const initialState = {
  load: false,
  CreateHoneyBatch: null,
  error: null,
}

const CreateHoneyBatchSlice = createSlice({
  name: "CreateHoneyBatch",
  initialState,
  reducers: {
  },
  extraReducers: {
    [CreateHoneyBatchThunk.pending]: (state) => {
      return {
        ...state,
        load: true
      }
    },
    [CreateHoneyBatchThunk.rejected]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        error: payload
      }
    },
    [CreateHoneyBatchThunk.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        load: false,
        CreateHoneyBatch: payload
      }
    }
  }
})

export default CreateHoneyBatchSlice.reducer;