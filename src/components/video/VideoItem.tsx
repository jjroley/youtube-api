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
      <div className="w-full flex flex-col">
          <div className="relative mb-2">
            <img src={data.snippet.thumbnails.medium.url} alt={data.snippet.title} className="rounded-lg" />
            <div className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-80 p-[1px]">
              {videoDuration}
            </div>
          </div>
          <div className="font-medium">{data.snippet.title}</div>
          <div className='text-slate-600 text-sm'>{data.snippet.channelTitle}</div>
          <div className='text-slate-600 text-sm flex items-center gap-1'>
            <span>{viewCount} views</span>
            <span>•</span>
            <span>{absoluteTime}</span>
          </div>
      </div>
    </Link>
  )
}