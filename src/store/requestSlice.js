import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            return state.filter((connection)=>connection._id!=action.payload)
        },
        removeRequests:()=>null
    }
})

export const {addRequests,removeRequest,removeRequests}=requestSlice.actions
export default requestSlice.reducer