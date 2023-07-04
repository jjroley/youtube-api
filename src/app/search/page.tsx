import SearchResult from "@/components/video/SearchResult"
import YouTube, { YouTubeVideo } from "@/helpers/youtube"
import { SlidersHorizontal } from "lucide-react"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchTerm = searchParams['q']
  const videos = typeof searchTerm === 'string' && await YouTube.searchVideos(searchTerm)

  console.log('Videos', videos)

  if(!videos) {
    return "No Videos Found"
  }

  return (
    <div className='overflow-y-auto p-4'>
      <div className="max-w-6xl mx-auto flex flex-col gap-5 mt-4">
        <div>
          <div className="icon-btn max-w-max gap-2 !px-4 mb-0">
            <SlidersHorizontal strokeWidth={1} size={24} />
            Filters
          </div>
          <hr></hr>
        </div>
        {
          videos.map((video) => (
            <SearchResult key={video.id} data={video} /> 
          ))
        } 
      </div>
    </div>
  )
}