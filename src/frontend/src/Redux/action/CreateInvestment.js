import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { createInvestment } from "../../utils/endpoints";

export const CreateInvestmentThunk = createAsyncThunk(
  "CreateInvestment",
  async (data, { rejectWithValue }) => {
    try {
      const repo = await createInvestment(data);
      
      if (repo.Ok) {
        ToastSuccess("Investment created successfully");
        return repo.Ok;
      } else if (repo.Err) {
        console.error("Backend error:", repo.Err);
        
        if (repo.Err.Error) {
          ToastError(repo.Err.Error);
        } else if (repo.Err.InvalidPayload) {
          ToastError(repo.Err.InvalidPayload);
        } else {
          ToastError("Failed to create investment");
        }
        
        return rejectWithValue(repo.Err);
      }
      
    } catch (error) {
      console.error("Error creating investment:", error);
      ToastError("An error occurred. Please try again.");
      return rejectWithValue(error);
    }
  }
);