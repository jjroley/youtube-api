'use client'

import { ArrowLeft, Mic, Search } from "lucide-react";
import useBreakpoints from "@/hooks/useBreakpoints";
import { FormEvent, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter()
  const params = useSearchParams()

  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>(params.get('q') || '')
  const { screenIs } = useBreakpoints()

  const toggleSearch = () => {
    if(!isOpen) {
      setTimeout(focus, 50)
    }
    setIsOpen(!isOpen)
  }

  const focus = () => {
    inputRef.current?.focus()
  }

  const handleSearch = (e:FormEvent) => {
    e.preventDefault()

    if(!searchTerm) {
      setTimeout(focus, 50)
      return;
    }

    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const conditionalClasses = screenIs('sm') ? 'w-[50vw] max-w-[650px] ' : ''

  const searchForm = (
    <form className={`${conditionalClasses} flex-1 border rounded-full flex overflow-hidden shadow-inner`} onSubmit={handleSearch}>
      <input ref={inputRef} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder="Search..." className='p-2 pl-4 flex-1 text-sm focus:outline-1 focus:outline-blue-500 focus:shadow-inner rounded-l-full '></input>
      <button className='p-2 px-6 flex-0 border-l bg-slate-100 flex justify-center items-center cursor-pointer'>
        <Search strokeWidth={1} size={24} />
      </button>
    </form>
  )

  if(screenIs('sm')) {
    return searchForm
  }

  if(isOpen) {
    return (
      <div className='absolute z-50 inset-0 bg-white flex items-center gap-4 px-4'>
        <div className="icon-btn">
          <ArrowLeft strokeWidth={1} size={24} onClick={toggleSearch} />
        </div>
        { searchForm }
        <div className="icon-btn">
          <Mic strokeWidth={1} size={24} />
        </div>
      </div>
    )
  }

  else {
    return (
      <div className='flex flex-1 justify-end'>
        <div className='icon-btn' onClick={toggleSearch}>
          <Search strokeWidth={1} size={24} />
        </div>
      </div>
    )
  }
}