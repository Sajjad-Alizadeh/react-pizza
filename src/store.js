import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/src/features/user/userSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
    },
})

export default store