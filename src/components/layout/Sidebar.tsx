'use client'

import { useEffect, useState } from 'react'
import { closeSidebar } from '@/redux/layout/layoutSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

import Home from '@icons/home.svg'
import HomeFill from '@icons/home-fill.svg'
import Shorts from '@icons/shorts.svg'
import Menu from '@icons/menu.svg'
import YouTubeLogo from '@icons/youtube.svg'

import SidebarLink from './SidebarLink'
import useBreakpoints from '@/hooks/useBreakpoints'



export default function Sidebar() {
  const isOpen = useAppSelector((state) => state.layoutReducer.sidebarOpen)
  const dispatch = useAppDispatch()
  const { screenIs } = useBreakpoints()

  const [isDrawer, setIsDrawer] = useState<Boolean>(false)

  const handleResize = () => {
    setIsDrawer(window.innerWidth <= 1312)
  }

  useEffect(() => {
    handleResize()
    addEventListener('resize', handleResize)
    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  let wrapperClasses = 'bg-black bg-opacity-0'

  if(!isOpen) {
    wrapperClasses += ' hidden'
  }
  else if(isDrawer) {
    wrapperClasses += ' bg-opacity-20 fixed inset-0'
  }

  return (
    <div className={`h-full overflow-y-auto main-sidebar z-50 relative`}>
      {
        (!isOpen || isDrawer) && !screenIs('xs') &&
        <div>
          <SidebarLink fillIcon={HomeFill} outlineIcon={Home} href='/' small text={"Home"} />
          <SidebarLink fillIcon={Shorts} outlineIcon={Shorts} href='/shorts' small text={"Shorts"} />
        </div>
      }
      {
        <div className={wrapperClasses}>
          <div className={`p-3 w-[240px] h-full bg-white`}>
            {
              isDrawer &&
              <div className="flex-1 flex items-center pr-4 mb-4">
                <div className='icon-btn w-10 h-10'>
                  <Menu onClick={() => dispatch(closeSidebar())} />
                </div>
                <div className="px-5">
                  <YouTubeLogo />
                </div>
              </div>
            }
            <SidebarLink fillIcon={HomeFill} outlineIcon={Home} text="Home" href='/' />
            <SidebarLink fillIcon={Shorts} outlineIcon={Shorts} text="Shorts" href='/shorts' />
          </div>
        </div>
      }
    </div>
  )
}