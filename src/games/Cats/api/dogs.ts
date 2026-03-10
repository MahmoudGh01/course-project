import useAsync from "#shared/useAsync"

import { get } from "./api"

export type Dog = {
  id: string
  tags: string[]
  created_at: Date
  url: string
  mimetype: string
}

export async function getDog(success: boolean = true): Promise<Dog> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const dog = await get<Dog>(`/dog${success ? "" : "-error"}?json=true`)

  return dog
}

export function useDog(): [
  Dog | undefined,
  {
    refresh: () => void
  },
] {
  return useAsync(getDog)
}
