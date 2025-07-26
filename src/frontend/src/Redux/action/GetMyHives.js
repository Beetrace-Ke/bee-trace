import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError } from "../../utils/toast";
import { getMyHives } from "../../utils/endpoints";

export const GetMyHivesThunk = createAsyncThunk(
  "GetMyHives",
  async (data, { rejectWithValue }) => {
    try {
      const repo = await getMyHives(data);
      
      if (repo.Ok) {
        return repo.Ok;
      } else if (repo.Err) {
        console.error("Backend error:", repo.Err);
        
        if (repo.Err.Error) {
          ToastError(repo.Err.Error);
        } else if (repo.Err.InvalidPayload) {
          ToastError(repo.Err.InvalidPayload);
        } else {
          ToastError("Failed to fetch your hives");
        }
        
        return rejectWithValue(repo.Err);
      }
      
    } catch (error) {
      console.error("Error fetching my hives:", error);
      ToastError("An error occurred. Please try again.");
      return rejectWithValue(error);
    }
  }
);