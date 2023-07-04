import { truncate, timeSince, shortenNumber, getDuration } from "@/helpers";
import { YouTubeVideo } from "@/helpers/youtube";
import { useMemo } from "react";
import Link from "next/link";

export default function SearchResult({ data }: { data: YouTubeVideo }) {
  const absoluteTime = useMemo(() => timeSince(data.snippet.publishedAt), [data.snippet.publishedAt])
  const viewCount = useMemo(() => shortenNumber(data.statistics.viewCount), [data.statistics.viewCount])
  const videoUrl = `/watch?v=${encodeURIComponent(data.id)}`
  const videoDuration = data.contentDetails?.duration ? getDuration(data.contentDetails.duration) : ''

  return (
    <div className="flex gap-4 items-start w-full p-2">
      <Link href={videoUrl} className='relative block flex-1 max-w-[300px]' style={{ minWidth: 'min(50%, 300px)' }}>
        <img src={data.snippet.thumbnails.medium.url} alt={data.snippet.title} className="rounded-lg w-full" />
        <div className="absolute bottom-1 right-1 text-xs text-white bg-black bg-opacity-80 p-[1px]">
          {videoDuration}
        </div>
      </Link>
      <div className="flex-1">
        <Link href={videoUrl}>
          <h4 className='line-clamp-2'>{data.snippet.title}</h4>
        </Link>
        <div className='text-slate-600 text-sm flex items-center gap-1'>
          <span>{viewCount} views</span>
          <span>•</span>
          <span>{absoluteTime}</span>
        </div>
        <div className="flex gap-2 items-center my-2">
          {
            data.channel &&
            <img src={data.channel.snippet.thumbnails.default.url} className='w-6 h-6 rounded-full object-cover' alt={data.channel.snippet.title} />
          }
          <div className='text-slate-600 text-sm'>{data.snippet.channelTitle}</div>
        </div>
        <div className='text-slate-600 text-sm line-clamp-2'>{truncate(data.snippet.description, 100)}</div>
      </div>
    </div>
  )
}