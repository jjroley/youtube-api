'use client'

import { toggleSidebar } from "@/redux/layout/layoutSlice"
import { useAppDispatch } from "@/redux/hooks"

import YouTubeLogo from "@icons/youtube.svg"
import Menu from "@icons/menu.svg"
import { MoreVertical, UserCircle } from "lucide-react"
import useBreakpoints from "@/hooks/useBreakpoints"
import SearchBar from "./SearchBar"

export default function Header() {
  const { screenIs } = useBreakpoints()
  const dispatch = useAppDispatch()

  return (
    <header className="px-4 py-2 flex items-center relative">
      <div className="flex-1 flex items-center pr-4">
        <div className='icon-btn w-10 h-10' onClick={() => dispatch(toggleSidebar())}>
          <Menu />
        </div>
        <div className="px-5">
          <YouTubeLogo />
        </div>
      </div>

      <SearchBar />
      
      
      

      <div className='flex-1 items-center justify-end flex pr-4'>
        <div className='icon-btn mr-3'>
          <MoreVertical strokeWidth={1} />
        </div>
        <div className='p-2 pr-4 border rounded-full font-semibold text-blue-600 flex gap-2 text-sm items-center hover:bg-blue-100 cursor-pointer transition-colors w-max'>
          <UserCircle strokeWidth={1} />
          Sign In
        </div>
      </div>
    </header>
  )
}
