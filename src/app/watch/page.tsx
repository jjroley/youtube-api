import YouTube, { YouTubeVideo } from "@/helpers/youtube"
import Script from "next/script"
import 'videojs-youtube/dist/YouTube.min.js'

export default async function VideoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const videoId = searchParams['v']
  const video:YouTubeVideo|null = typeof videoId === 'string' && videoId ? await YouTube.getVideo(videoId) : null

  if(!video) {
    return "Video not found"
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <iframe src={`https://youtube.com/embed/${videoId}`} width="100%" className="aspect-video"></iframe>
        <h4 className='mt-3'>{video.snippet.title}</h4>
      </div>
      <div></div>
    </div>
  )
}