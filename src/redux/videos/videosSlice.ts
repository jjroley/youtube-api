import { clientPaths } from '@/helpers/api'
import { YouTubeVideo } from '@/helpers/youtube'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import videoCategories from './videoCategories.json'

type VideoCategory = {
  id: string
  name: string
}

type VideosState = {
  categories: VideoCategory[]
  category: string|null
  videos: YouTubeVideo[]
  loading: boolean
  error: string|null
}

const initialState:VideosState = {
  categories: videoCategories,
  category: null,
  videos: [],
  loading: false,
  error: null
}

export const videos = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload
    },
    clearCategory: (state) => {
      state.category = null
    }
  },
})

export const {
  setCategory,
  clearCategory
} = videos.actions

export default videos.reducer