import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError} from "../../utils/toast";
import  { createBeekeeperProfile } from "../../utils/endpoints"

export const  BookByPropertyThunk = createAsyncThunk("BookByProperty",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  createBeekeeperProfile(data);
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.NotFound && ToastError(repo.Err.NotFound)}
        {repo.Err.Error && ToastError(repo.Err.Error)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);