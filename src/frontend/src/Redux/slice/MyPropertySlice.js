import { createSlice } from "@reduxjs/toolkit";
import { getMyPropertyThunk } from "../action/MyProperty";

const initialState = {
    loads: false,
    getMyProperty: null,
    errorz: null,
}

const getMyPropertySlice= createSlice({
    name: "getMyProperty",
    initialState,
    reducers: {

    },

    extraReducers: {
      [getMyPropertyThunk.pending] : (state) =>{
        return{
            ...state,
            loads: true
        }
      },
      [getMyPropertyThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loads:false,
            errorz:payload
        }
      },
      [getMyPropertyThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loads: false,
            getMyProperty: payload
        }
      }  
    }
})

export default getMyPropertySlice.reducer