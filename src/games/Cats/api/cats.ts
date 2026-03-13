import useAsync from '#shared/useAsync'

import { get, type TypeBase } from './api'

/**
 * Cat data structure from the Cat API
 */
export type Cat = {
  id: string
  tags: string[]
  url: string
  mimetype: string
} & TypeBase

/**
 * Fetches a random cat from the API
 * @param success - If false, will intentionally trigger an error for testing
 * @returns Promise<Cat> with cat data
 */
export async function getCat(success: boolean = true): Promise<Cat> {
  // Artificial delay to demonstrate loading state
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const cat = await get<Cat>(`/cat${success ? '' : '-error'}?json=true`)

  return cat
}

/**
 * React hook for fetching cat data with Suspense integration
 * @returns Tuple of [cat data, { refresh function }]
 */
export function useCat(): [Cat | undefined, { refresh: () => void }] {
  return useAsync(getCat)
}
