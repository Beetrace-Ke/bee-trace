import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { createInvestorProfile } from "../../utils/endpoints";

export const CreateInvestorProfileThunk = createAsyncThunk(
  "CreateInvestorProfile",
  async (data, { rejectWithValue }) => {
    try {
      const repo = await createInvestorProfile(data);
      
      if (repo.Ok) {
        ToastSuccess("Investor profile created successfully");
        return repo.Ok;
      } else if (repo.Err) {
        console.error("Backend error:", repo.Err);
        
        if (repo.Err.Error) {
          ToastError(repo.Err.Error);
        } else if (repo.Err.InvalidPayload) {
          ToastError(repo.Err.InvalidPayload);
        } else {
          ToastError("Failed to create investor profile");
        }
        
        return rejectWithValue(repo.Err);
      }
      
    } catch (error) {
      console.error("Error creating investor profile:", error);
      ToastError("An error occurred. Please try again.");
      return rejectWithValue(error);
    }
  }
);