import { configureStore } from "@reduxjs/toolkit"

// import slices
import layoutReducer from './layout/layoutSlice'
import videosReducer from './videos/videosSlice'
import { api } from "./api"

export const store = configureStore({
  reducer: {
    layoutReducer,
    videosReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleward) => 
    getDefaultMiddleward().concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production"
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch