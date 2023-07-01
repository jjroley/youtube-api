import YouTube, { YouTubeVideo } from "@/helpers/youtube"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchTerm = searchParams['q']
  const videos = typeof searchTerm === 'string' && await YouTube.searchVideos(searchTerm)

  if(!videos) {
    return "No Videos Found"
  }

  return (
    videos.map((video:YouTubeVideo) => (
      <div key={video.id}>{video.snippet.title}</div>
    ))
  )
}