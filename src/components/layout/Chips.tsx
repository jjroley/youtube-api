'use client'

import { setCategory } from '@/redux/videos/videosSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'


import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

export default function Chips() {
  const categories = useAppSelector(state => state.videosReducer.categories)
  const categoryId = useAppSelector(state => state.videosReducer.category)
  const dispatch = useAppDispatch()

  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e:WheelEvent) => {
    if(!scrollRef.current) return
    e.preventDefault()
    scrollRef.current.scrollLeft += e.deltaY
  }

  const scroll = (amount:number) => {
    if(!scrollRef.current) return
    scrollRef.current.scrollLeft += amount
  }

  useLayoutEffect(() => {
    scrollRef.current?.addEventListener('wheel', handleScroll)
    return () => {
      scrollRef.current?.removeEventListener('wheel', handleScroll)
    }
  }, [])

  return (
    <div className="relative yt-chip-list">
      <div className="yt-chip-list-prev-btn">
        <div className="icon-btn" onClick={() => scroll(-500)}>
          <ChevronLeft />
        </div>
      </div>
      <div className="py-2 mb-4 flex items-center min-w-0 overflow-x-auto no-scrollbar scroll-smooth" ref={scrollRef}>
        <div className="flex items-center justify-start gap-3 yt-chips">
          {
            categories.map(category => (
              <div 
                className={`yt-chip ${ categoryId == category.id && '!bg-black !text-white' }`}
                key={category.id}
                onClick={() => dispatch(setCategory(category.id))} >
                  {category.name}
              </div>
            ))
          }
        </div>
      </div>
      <div className="yt-chip-list-next-btn">
        <div className="icon-btn" onClick={() => scroll(500)}>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
