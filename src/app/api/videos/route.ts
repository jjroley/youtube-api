import { paths, serializeObject } from "@/helpers/api"
import { NextResponse } from "next/server"
import type { YouTubeParams } from "@/helpers/youtube"
import YouTube from "@/helpers/youtube"

export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)

  const categoryId = searchParams.get('categoryId')
  const includeChannel = searchParams.get('includeChannel')

  console.log("Include channel?", includeChannel)

  const videos = await YouTube.getVideos(categoryId, includeChannel === 'true')

  return NextResponse.json(videos)
}