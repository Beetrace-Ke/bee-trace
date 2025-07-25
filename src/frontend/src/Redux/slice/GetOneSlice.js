import { createSlice } from "@reduxjs/toolkit";
import { GetOnePropertyThunk } from "../action/GetOneProperty";

const initialState = {
    loading: false,
    GetOneProperty: null,
    error: null,
}

const GetOnePropertySlice= createSlice({
    name: "GetOneProperty",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetOnePropertyThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [GetOnePropertyThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loads:false,
            error:payload
        }
      },
      [GetOnePropertyThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            GetOneProperty: payload
        }
      }  
    }
})

export default GetOnePropertySlice.reducer