import { createAsyncThunk } from "@reduxjs/toolkit";
import { ToastError} from "../../utils/toast";
import  { getBeeKeeperProfileByOwner } from "../../utils/endpoints"

export const  getBeeKeeperByOwner = createAsyncThunk("GetUserByOwner",
async(data,{rejectWithValue})=>{
    try{
       const repo = await  getBeeKeeperProfileByOwner();
       if(repo.Ok){
        return repo.Ok
       }else if(repo.Err){
        {repo.Err.Error && ToastError(repo.Err.Error)}
        return rejectWithValue(repo.Err)
       }

    }catch(error){
        return rejectWithValue(error.Err)
    }
}
);