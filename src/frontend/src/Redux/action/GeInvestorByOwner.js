import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { getInvestorProfileByOwner } from "../../utils/endpoints";

export const getInvestorByOwner = createAsyncThunk(
  "GetInvestorByOwner", 
  async (data, { rejectWithValue }) => {
    try {
      const repo = await getInvestorProfileByOwner();
      if (repo.Ok) {
        return repo.Ok;
      } else if (repo.Err) {
        {repo.Err.Error && ToastError(repo.Err.Error)}
        return rejectWithValue(repo.Err);
      }
    } catch (error) {
      return rejectWithValue(error.Err);
    }
  }
);