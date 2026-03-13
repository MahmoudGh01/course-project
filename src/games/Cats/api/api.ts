/**
 * Base type for all API responses that include a created_at field
 */
export type TypeBase = {
  created_at: Date
}

/**
 * Server representation of Type where created_at is a string instead of Date
 */
export type ServerType<Type> = Omit<Type, 'created_at'> & {
  created_at: string
}

/**
 * Generic GET request handler for the Cat API
 * @template Type - The expected response type (must extend TypeBase)
 * @param path - API endpoint path
 * @returns Promise<Type> with created_at transformed from string to Date
 * @throws Error if the response is not ok
 */
export async function get<Type extends TypeBase>(path: string): Promise<Type> {
  const response = await fetch(`https://cataas.com${path}`)

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Cannot get item. ${text}`)
  }

  const { created_at, ...data } = (await response.json()) as ServerType<Type>

  return {
    ...data,
    created_at: new Date(created_at),
  } as unknown as Type
}
