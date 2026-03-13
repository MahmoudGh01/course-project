import { use, useCallback, useEffect, useRef, useState } from 'react'

/**
 * A hook for handling async data fetching with React Suspense integration
 * @template Type - The type of data returned by the async function
 * @param fn - Async function that returns a Promise<Type>. Receives a boolean indicating if it's the initial load
 * @param deps - Dependency array similar to useEffect
 * @returns A tuple of [data, { refresh }] where data is Type | undefined and refresh is a function to refetch
 */
export default function useAsync<Type>(
  fn: (initial: boolean) => Promise<Type>,
  deps: unknown[] = [],
): [Type | undefined, { refresh: () => void }] {
  const fnRef = useRef(fn)
  fnRef.current = fn

  const [promise, setPromise] = useState<Promise<Type>>()

  useEffect(() => {
    setPromise(fnRef.current(true))
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  const refresh = useCallback(() => {
    setPromise(fnRef.current(false))
  }, [])

  const value = promise && use(promise)

  return [value, { refresh }]
}
