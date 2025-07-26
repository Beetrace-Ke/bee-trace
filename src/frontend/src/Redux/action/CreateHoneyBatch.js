import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { createHoneyBatch } from "../../utils/endpoints";

export const CreateHoneyBatchThunk = createAsyncThunk(
  "CreateHoneyBatch",
  async (data, { rejectWithValue }) => {
    try {
      const repo = await createHoneyBatch(data);
      
      if (repo.Ok) {
        ToastSuccess("Honey batch created successfully");
        return repo.Ok;
      } else if (repo.Err) {
        console.error("Backend error:", repo.Err);
        
        if (repo.Err.Error) {
          ToastError(repo.Err.Error);
        } else if (repo.Err.InvalidPayload) {
          ToastError(repo.Err.InvalidPayload);
        } else {
          ToastError("Failed to create honey batch");
        }
        
        return rejectWithValue(repo.Err);
      }
      
    } catch (error) {
      console.error("Error creating honey batch:", error);
      ToastError("An error occurred. Please try again.");
      return rejectWithValue(error);
    }
  }
);