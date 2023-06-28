'use client'

import { toggleSidebar } from "@/redux/layout/layoutSlice"
import { useAppDispatch } from "@/redux/hooks"

import YouTubeLogo from "@icons/youtube.svg"
import Menu from "@icons/menu.svg"
import { Search, MoreVertical, UserCircle } from "lucide-react"

export default function Header() {
  const dispatch = useAppDispatch()

  return (
    <header className="px-4 py-2 flex items-center">
      <div className="flex-1 flex items-center pr-4">
        <div className='icon-btn w-10 h-10' onClick={() => dispatch(toggleSidebar())}>
          <Menu />
        </div>
        <div className="px-5">
          <YouTubeLogo />
        </div>
      </div>
      
      <form className='flex flex-1 w-[50vw] max-w-[650px] border rounded-full overflow-hidden pl-2 shadow-inner'>
        <input type='text' placeholder="Search..." className='p-2 flex-1 outline-none text-sm'></input>
        <div className='p-2 px-6 flex-0 border-l bg-slate-100 flex justify-center items-center'>
          <Search strokeWidth={1} size={24} />
        </div>
      </form>

      <div className='flex-1 items-center justify-end flex pr-4'>
        <div className='icon-btn mr-3'>
          <MoreVertical strokeWidth={1} />
        </div>
        <div className='p-2 pr-4 border rounded-full font-semibold text-blue-600 flex gap-2 text-sm items-center hover:bg-blue-100 cursor-pointer transition-colors'>
          <UserCircle strokeWidth={1} />
          Sign In
        </div>
      </div>
    </header>
  )
}
