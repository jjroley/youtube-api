import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type screenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type LayoutState = {
  sidebarOpen: boolean
  screenSize: screenSize
}


const initialState = {
  sidebarOpen: false,
  screenSize: 'xs'
} as LayoutState

export const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpen = true
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload
    }
  }
})

export const {
  openSidebar,
  closeSidebar,
  toggleSidebar
} = layout.actions

export default layout.reducer