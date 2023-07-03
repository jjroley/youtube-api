const baseUrl = "https://www.googleapis.com/youtube/v3"
const clientBaseUrl = '/api'

export const paths = {
  baseUrl: baseUrl,
  search: baseUrl + '/search',
  videos: baseUrl + '/videos',
  categories: baseUrl + '/videoCategories'
}

export const clientPaths = {
  baseUrl: clientBaseUrl,
  videos: clientBaseUrl + '/videos',
  categories: clientBaseUrl + '/categories'
}


export type queryParams = {
  [key:string]: any
}


export const serializeObject = (params:queryParams) => {
  params = { ...params, key: process.env.YOUTUBE_API_KEY as string }

  let queryArgs = []

  for(const key in params) {
    const value = params[key]
    queryArgs.push(`${encodeURIComponent(key)}=${(encodeURIComponent(value))}`)
  }

  return queryArgs.join('&')
}