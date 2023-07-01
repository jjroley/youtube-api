'use client'

import { useAppSelector } from '@/redux/hooks'

import VideoItem from "@/components/video/VideoItem"

import Chips from "@/components/layout/Chips"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { useGetVideosQuery } from '@/redux/api'


export default function Home() {
  const categoryId = useAppSelector(store => store.videosReducer.category)
  const { data: videos, error, isLoading } = useGetVideosQuery(categoryId)

  return (
    <main className='w-full p-4'>
      <Chips />
        
      <div className='video-grid gap-4 gap-y-10 justify-items-center mx-auto'>
        {
          isLoading ?
          "Loading videos" :
          !videos ?
          "No Videos Found" :
          videos.map(video => (
            <VideoItem data={video} key={video.id} />
          ))
        }
      </div>
    </main>
  )
}
