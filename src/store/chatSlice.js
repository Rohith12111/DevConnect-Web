import { createSlice } from "@reduxjs/toolkit";

const chatSlice=createSlice({

    name:"chat",
    initialState:null,
    reducers:{
        addTargetUser:(state,action)=>{
            return action.payload 
        }
    }
})


export const {addTargetUser}=chatSlice.actions
export default chatSlice.reducer