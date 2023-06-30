import { paths, serializeObject } from "@/helpers/api"
import { NextResponse } from "next/server"
import type { YouTubeParams } from "@/helpers/youtube"

export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)

  const categoryId = searchParams.get('categoryId')

  const defaultQuery:YouTubeParams = {
    key: process.env.YOUTUBE_API_KEY as string,
    maxResults: 25,
    chart: 'mostPopular',
    regionCode: 'US',
    part: "snippet,contentDetails,statistics",
  }

  if(categoryId) {
    defaultQuery.videoCategoryId = categoryId
  }

  const query = serializeObject({
    ...defaultQuery
  })


  const videos = await fetch(`${paths.videos}?${query}`, {
    next: {
      revalidate: 0 // every hour
    }
  })
  .then(res => res.json())


  return NextResponse.json(videos)
}