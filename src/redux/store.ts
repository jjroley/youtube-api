import { configureStore } from "@reduxjs/toolkit"

// import slices
import layoutReducer from './layout/layoutSlice'

export const store = configureStore({
  reducer: {
    layoutReducer
  },
  devTools: process.env.NODE_ENV !== "production"
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch