import { createSlice } from "@reduxjs/toolkit";
import { MyBookingThunk } from "../action/MyBooking";

const initialState = {
    loads: false,
    MyBooking: null,
    errorz: null,
}

const  MyBookingSlice= createSlice({
    name: "MyBooking",
    initialState,
    reducers: {

    },

    extraReducers: {
      [ MyBookingThunk.pending] : (state) =>{
        return{
            ...state,
            loads: true
        }
      },
      [ MyBookingThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loads:false,
            errorz:payload
        }
      },
      [ MyBookingThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loads: false,
            MyBooking: payload
        }
      }  
    }
})

export default  MyBookingSlice.reducer