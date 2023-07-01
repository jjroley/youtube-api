import { YouTubeVideo } from "@/helpers/youtube";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link";
import numeral from 'numeral'

dayjs.extend(relativeTime)

export default function VideoItem({ data }: { data: YouTubeVideo }) {
  const absoluteTime = dayjs().to(data.snippet.publishedAt)
  const viewCount = numeral(data.statistics.viewCount).format('0a').toUpperCase()
  return (
    <Link href={{ pathname: 'watch', query: { v: data.id } }}>
      <div className="w-full flex flex-col">
          <img src={data.snippet.thumbnails.medium.url} className='max-w-full rounded-md mb-2' />
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