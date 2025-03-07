import { combineReducers } from "@reduxjs/toolkit"
import authReducer from  "../feature/AuthSlice"
import { authApi } from "../feature/api/authApi"

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
})
export default rootReducer
