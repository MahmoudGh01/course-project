import { get } from "./api"
import { type Dog } from "./interfaces"

export async function getDog(success: boolean = true): Promise<Dog> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const dog = await get<Dog>(`/dog${success ? "" : "-error"}?json=true`)

  return dog
}
