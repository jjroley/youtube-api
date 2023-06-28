import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LayoutState = {
  sidebarOpen: boolean
}

const initialState = {
  sidebarOpen: false
} as LayoutState

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openSidebar: (state) => {
      return { ...state, sidebarOpen: true }
    },
    closeSidebar: (state) => {
      return { ...state, sidebarOpen: false }
    },
    toggleSidebar: (state) => {
      return { ...state, sidebarOpen: !state.sidebarOpen }
    }
  }
})

export const {
  openSidebar,
  closeSidebar,
  toggleSidebar
} = layout.actions

export default layout.reducer