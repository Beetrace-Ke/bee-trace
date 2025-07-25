import { createSlice } from "@reduxjs/toolkit";
import { PayThunk } from "../action/Pay";

const initialState = {
    loadz: false,
    Pay: null,
    error: null,
}

const PaySlice= createSlice({
    name: "Pay",
    initialState,
    reducers: {

    },

    extraReducers: {
      [PayThunk.pending] : (state) =>{
        return{
            ...state,
            loadz: true
        }
      },
      [PayThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loadz:false,
            error:payload
        }
      },
      [PayThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loadz: false,
            Pay: payload
        }
      }  
    }
})

export default PaySlice.reducer