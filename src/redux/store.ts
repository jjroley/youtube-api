import { configureStore } from "@reduxjs/toolkit"

// import slices
import layoutReducer from './layout/layoutSlice'
import videosReducer from './videos/videosSlice'

export const store = configureStore({
  reducer: {
    layoutReducer,
    videosReducer
  },
  devTools: process.env.NODE_ENV !== "production"
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch