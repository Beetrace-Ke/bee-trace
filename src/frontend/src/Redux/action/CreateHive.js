import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { createHive } from "../../utils/endpoints";

export const CreateHiveThunk = createAsyncThunk(
  "CreateHive",
  async (data, { rejectWithValue }) => {
    try {
      const repo = await createHive(data);
      
      if (repo.Ok) {
        ToastSuccess("Hive created successfully");
        return repo.Ok;
      } else if (repo.Err) {
        console.error("Backend error:", repo.Err);
        
        if (repo.Err.Error) {
          ToastError(repo.Err.Error);
        } else if (repo.Err.InvalidPayload) {
          ToastError(repo.Err.InvalidPayload);
        } else {
          ToastError("Failed to create hive");
        }
        
        return rejectWithValue(repo.Err);
      }
      
    } catch (error) {
      console.error("Error creating hive:", error);
      ToastError("An error occurred. Please try again.");
      return rejectWithValue(error);
    }
  }
);