import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { YouTubeVideo } from '@/helpers/youtube'
import { clientPaths } from '@/helpers/api'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: clientPaths.baseUrl }),
  tagTypes: ['videos'],
  endpoints: (builder) => ({
    getVideos: builder.query<YouTubeVideo[], string|null>({
      query: (id) => id ? `videos?categoryId=${id}` : 'videos',
      providesTags: (result, error, categoryId) => [{type: 'videos', id: categoryId || 0 }]
    }),
  }),
})

export const { useGetVideosQuery } = api