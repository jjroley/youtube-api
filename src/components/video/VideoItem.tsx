'use client'
import Link from "next/link";
import { useMemo } from "react";
import { timeSince, shortenNumber, getDuration } from "@/helpers";

import type { YouTubeVideo } from "@/helpers/youtube";


export default function VideoItem({ data }: { data: YouTubeVideo }) {
  const absoluteTime = useMemo(() => timeSince(data.snippet.publishedAt), [data.snippet.publishedAt])
  const viewCount = useMemo(() => shortenNumber(data.statistics.viewCount), [data.statistics.viewCount])
  const videoDuration = data.contentDetails?.duration ? getDuration(data.contentDetails.duration) : ''

  return (
    <Link href={{ pathname: 'watch', query: { v: data.id } }}>
      <div>
          <div className="relative w-full">
            <img src={data.snippet.thumbnails.medium.url} alt={data.snippet.title} className="sm:rounded-lg w-full" />
            <div className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-80 p-[1px]">
              {videoDuration}
            </div>
          </div>
          <div className='px-3 py-3 flex gap-3 items-start min-h-[5rem]'>
            {
              data.channel &&
              <img className='w-10 h-10 rounded-full' src={data.channel?.snippet.thumbnails.default.url} alt={data.snippet.channelTitle} />
            }
            <div className='flex-1'>
              <div className="font-medium text-sm line-clamp-2 mt-[-4px] mb-1">{data.snippet.title}</div>
              <div className='text-slate-600 text-sm'>
                <span className='text-slate-600 text-sm'>{data.snippet.channelTitle}</span>
                <span className='sm:block sm:opacity-0 sm:h-0 mx-1'>•</span>
                <span>{viewCount} views</span>
                <span className='mx-1'>•</span>
                <span>{absoluteTime}</span>
              </div>
            </div>
          </div>
      </div>
    </Link>
  )
}