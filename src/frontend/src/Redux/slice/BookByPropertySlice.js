import { createSlice } from "@reduxjs/toolkit";
import { BookByPropertyThunk } from "../action/BookByProperty";

const initialState = {
    loading: false,
    BookByProperty: null,
    error: null,
}

const BookByPropertySlice= createSlice({
    name: "BookByProperty",
    initialState,
    reducers: {

    },

    extraReducers: {
      [BookByPropertyThunk.pending] : (state) =>{
        return{
            ...state,
            loading: true
        }
      },
      [BookByPropertyThunk.rejected]:(state,{payload}) =>{
        return {
            ...state,
            loads:false,
            error:payload
        }
      },
      [BookByPropertyThunk.fulfilled]: (state,{payload}) => {
        return {
            ...state,
            loading: false,
            BookByProperty: payload
        }
      }  
    }
})

export default BookByPropertySlice.reducer