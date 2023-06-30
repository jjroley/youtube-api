'use client'

import { useAppSelector } from '@/redux/hooks'

import VideoItem from "@/components/video/VideoItem"

import Chips from "@/components/layout/Chips"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getVideos } from '@/redux/videos/videosSlice'
import { AppDispatch } from '@/redux/store'


export default async function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { videos, loading, error } = useAppSelector(state => state.videosReducer)

  useEffect(() => {
    dispatch(getVideos())
    console.log("Component Loaded")
  }, [])

  if(error) {
    return error
  }

  if(loading) {
    return "Loading boss"
  }

  return (
    <main className='w-full p-4'>
      <Chips />
        
      <div className='video-grid gap-4 gap-y-10 justify-items-center mx-auto'>
        {
          loading ?
          "Loading videos" :
          videos.map(video => (
            <VideoItem data={video} key={video.id} />
          ))
        }
      </div>
    </main>
  )

}
