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

export const getVideos = createAsyncThunk(
  'videis/getVideos',
  async () => {
    console.log("Starting videos fetch")
    const res = await fetch(`${clientPaths.videos}`).then(res => res.json())
    console.log("Ending videos fetch")
    return res.items
  }
)

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
  extraReducers: (builder) => {
    builder.addCase(getVideos.pending, (state) => {
      state.loading = true
      console.log("Videos pending")
    })
    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.loading = false
      state.videos = action.payload
      console.log("Videos fulfilled")
    })
    builder.addCase(getVideos.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || "Unexpected error occured"
      console.log("Videos rejected")
    })
  }
})

export const {
  setCategory,
  clearCategory
} = videos.actions

export default videos.reducer



