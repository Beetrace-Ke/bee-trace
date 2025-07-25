import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError, ToastSuccess } from "../../utils/toast";
import { createBeekeeperProfile } from "../../utils/endpoints";

export const CreateUserProfileThunk = createAsyncThunk(
  "CreateUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      const repo = await createBeekeeperProfile(data);
      
      if (repo.Ok) {
        ToastSuccess("Profile created successfully");
        return repo.Ok;
      } else if (repo.Err) {
        console.error("Backend error:", repo.Err);
        
        if (repo.Err.Error) {
          ToastError(repo.Err.Error);
        } else if (repo.Err.InvalidPayload) {
          ToastError(repo.Err.InvalidPayload);
        } else {
          ToastError("Failed to create profile");
        }
        
        return rejectWithValue(repo.Err);
      }
      
    } catch (error) {
      console.error("Error creating profile:", error);
      ToastError("An error occurred. Please try again.");
      return rejectWithValue(error);
    }
  }
);