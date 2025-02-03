import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeFeed:()=>{
            return null;
        },
        swipeInterest:(state,action)=>{
            if (!Array.isArray(state)) return state
            return state.filter((user)=>user._id!=action.payload)
            
        },

        swipeIgnore:(state,action)=>{
            if (!Array.isArray(state)) return state
            return state.filter((user)=>user._id!=action.payload)
        }
    }   
})

export const {addFeed,removeFeed,swipeInterest,swipeIgnore}=feedSlice.actions
export default feedSlice.reducer