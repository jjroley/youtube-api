import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { YouTubeVideo } from '@/helpers/youtube'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['videos'],
  endpoints: (builder) => ({
    getVideos: builder.query<YouTubeVideo[], string|null>({
      query: (id) => id ? `videos?categoryId=${id}&includeChannel=true` : 'videos?includeChannel=true',
      providesTags: (result, error, categoryId) => [{type: 'videos', id: categoryId || 0 }]
    }),
  }),
})

export const { useGetVideosQuery } = api