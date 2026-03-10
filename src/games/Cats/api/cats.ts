import useAsync from "#shared/useAsync"

import { get } from "./api"

export type Cat = {
  id: string
  tags: string[]
  created_at: Date
  url: string
  mimetype: string
}

export async function getCat(success: boolean = true): Promise<Cat> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const cat = await get<Cat>(`/cat${success ? "" : "-error"}?json=true`)

  return cat
}

export function useCat(): [
  Cat | undefined,
  {
    refresh: () => void
  },
] {
  return useAsync(getCat)
}
