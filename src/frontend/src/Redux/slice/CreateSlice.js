import { createSlice } from "@reduxjs/toolkit";
import { CreateUserProfileThunk } from "../action/CreateUserProfile";

const initialState = {
    load: false,
    CreateUserProfile: null,
    error: null,
}

const CreateUserProfileSlice= createSlice({
    name: "CreateUserProfile",
    initialState,
    reducers: {

    },

    extraReducers: {
      [CreateUserProfileThunk.pending] : (state) =>{
        return{
            ...state,
            load: true
        }
      },
      [CreateUserProfileThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            load:false,
            error:payload
        }
      },
      [CreateUserProfileThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            load: false,
            CreateUserProfile: payload
        }
      }  
    }
})

export default CreateUserProfileSlice.reducer