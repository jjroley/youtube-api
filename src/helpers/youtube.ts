import { queryParams, serializeObject, paths } from "./api"

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

type VideoDetails = {
  duration: string
}

type VideoStatistics = {
  viewCount: string
  likeCount: string
  commentCount: string
}

type ChannelStatistics = {
  viewCount: string
  subscriberCount: string
}


export type Channel = {
  kind:string
  id:string
  snippet: Snippet
  statistics: ChannelStatistics
}

export type YouTubeVideo = {
  kind: string
  id: string
  snippet: Snippet
  statistics: VideoStatistics
  player?: {
    embedHtml: TrustedHTML
  }
  contentDetails?: VideoDetails
  channel?: Channel|null
}

export type SearchResult = {
  id: {
    kind: string
    videoId: string
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

export default class YouTube {
  static defaultParams:YouTubeParams = {
    regionCode: "US",
    part: "snippet,contentDetails,statistics",
    key: process.env.YOUTUBE_API_KEY as string
  }

  static async getVideos(categoryId:string|null, channel = false) {
    const params:YouTubeParams = {
      ...YouTube.defaultParams,
      maxResults: 25,
      chart: 'mostPopular'
    }

    if(categoryId !== null) {
      params.videoCategoryId = categoryId
    }

    const query = serializeObject(params)

    const url = `${paths.videos}?${query}`

    const res = await fetch(url)

    if(res.status === 200) {
      const data = await res.json()
      const videos:YouTubeVideo[] = data.items.filter((item:any) => !!item)

      if(channel) {
        return await Promise.all(videos.map(async video => {
          return {
            ...video,
            channel: await YouTube.getChannel(video.snippet.channelId)
          }
        }))
      }

      return videos
    }

    return []
  }

  static async getChannel(channelId:string):Promise<Channel|null> {
    const query = serializeObject({
      ...YouTube.defaultParams,
      id: channelId,
      maxResults: 1,
      part: "snippet,contentDetails,statistics"
    })

    const url = `${paths.channels}?${query}`

    const res = await fetch(url)

    if(res.status === 200) {
      const data = await res.json()
      return data.items[0] || null
    }

    return null
  }

  static async getVideo(videoId:string, channel = false):Promise<YouTubeVideo|null> {
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

      const item:YouTubeVideo = data.items[0]

      if(!item) {
        return null
      }

      if(channel) {
        item.channel = await YouTube.getChannel(item.snippet.channelId)
      }

      return item
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

  static async searchVideos(searchTerm:string):Promise<YouTubeVideo[]|null> {
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

      const videos = await Promise.all(data.items.map((v:SearchResult) => (
        YouTube.getVideo(v.id.videoId, true)
      )))

      return videos.filter(v => !!v)
    }

    return null
  }
}