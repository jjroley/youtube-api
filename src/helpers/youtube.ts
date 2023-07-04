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
  player?: {
    embedHtml: TrustedHTML
  }
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

  static async getVideo(videoId:string) {
    const query = serializeObject({
      ...YouTube.defaultParams,
      id: videoId,
      maxResults: 1,
      part: "snippet,contentDetails,statistics,player"
    })

    const url = `${paths.videos}?${query}`

    const res = await fetch(url)

    if(res.status === 200) {
      const data = await res.json()
      return data.items[0]
    }

    return null
  }

  static async getRelatedVideos(videoId:string) {
    const query = serializeObject({
      ...YouTube.defaultParams,
      relatedToVideoId: videoId
    })

    const url = `${paths.search}?${query}`

    const res = await fetch(url)

    if(res.status === 200) {
      const data = await res.json()
      return data.items
    }

    return null
  }

  static async searchVideos(searchTerm:string) {
    const query = serializeObject({
      ...YouTube.defaultParams,
      q: encodeURIComponent(searchTerm),
      maxResults: 25,
      part: "snippet",
    })

    const url = `${paths.search}?${query}`

    const res = await fetch(url)

    if(res.status === 200) {
      const data = await res.json()
      return data.items
    }

    return null
  }
}