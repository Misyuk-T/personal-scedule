import { configureStore } from '@reduxjs/toolkit'
import schedule from "./reducers/schedule";


export const store = configureStore({
    reducer: {schedule},
})