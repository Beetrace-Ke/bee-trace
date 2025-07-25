import { createSlice } from "@reduxjs/toolkit";
import { GetAllPropertyThunk } from "../action/GetAllProperty";

const initialState = {
    loads: false,
    GetAllProperty: null,
    errorz: null,
}

const GetAllPropertySlice= createSlice({
    name: "GetAllProperty",
    initialState,
    reducers: {

    },

    extraReducers: {
      [GetAllPropertyThunk.pending] : (state) =>{
        return{
            ...state,
            loads: true
        }
      },
      [GetAllPropertyThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loads:false,
            errorz:payload
        }
      },
      [GetAllPropertyThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loads: false,
            GetAllProperty: payload
        }
      }  
    }
})

export default GetAllPropertySlice.reducer