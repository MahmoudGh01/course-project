type TypeBase = {
  created_at: Date
}

type ServerType<Type> = Omit<Type, "created_at"> & {
  created_at: string
}

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
