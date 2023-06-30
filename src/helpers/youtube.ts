import { queryParams, serializeObject, paths } from "./api"

type videosQuery = {
  maxResults?: number
  page?: number
}


type Thumbnail = {
  url: string
  width: number
  height: number
}

type Snippet = {
  channelId: string
  channelTitle: string
  title: string
  description: string
  thumbnails: {
    default: Thumbnail
    medium: Thumbnail
  }
  publishedAt: string
}

type Statistics = {
  viewCount: string
  likeCount: string
  commentCount: string
}

export type YouTubeVideo = {
  kind: string
  id: string
  snippet: Snippet
  statistics: Statistics
}

export type YouTubeParams = {
  key: string,
  maxResults?: number
  chart?: string
  regionCode?: string
  part?: string
  videoCategoryId?: string
}

const defaultQuery = {
  key: process.env.YOUTUBE_API_KEY,
  maxResults: 25,
  chart: 'mostPopular',
  regionCode: 'US',
  part: "snippet,contentDetails,statistics",
}

export default class YouTube {
  static defaultParams:queryParams = {
    regionCode: "US",
    chart: "mostPopular",
    part: "snippet,contentDetails,statistics",
    key: process.env.YOUTUBE_API_KEY as string
  }

  static async getVideos(params:videosQuery) {
    const query = serializeObject({
      ...YouTube.defaultParams,
      ...params
    })

    return await fetch(`${paths.videos}?${query}`)
    .then(res => res.json())
  }

  
}