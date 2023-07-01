import { ArrowLeft, Mic, Search } from "lucide-react";
import useBreakpoints from "@/hooks/useBreakpoints";
import { useRef, useState } from "react";


export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
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

  const conditionalClasses = screenIs('sm') ? 'w-[50vw] max-w-[650px] ' : ''

  const searchForm = (
    <form className={`${conditionalClasses} flex-1 border rounded-full flex overflow-hidden shadow-inner`}>
      <input ref={inputRef} type='text' placeholder="Search..." className='p-2 pl-4 flex-1 text-sm focus:outline-1 focus:outline-blue-500 focus:shadow-inner rounded-l-full '></input>
      <div className='p-2 px-6 flex-0 border-l bg-slate-100 flex justify-center items-center cursor-pointer' onClick={focus}>
        <Search strokeWidth={1} size={24} />
      </div>
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