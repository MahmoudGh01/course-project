import { get } from "./api"
import { type Cat } from "./interfaces"

export async function getCat(success: boolean = true): Promise<Cat> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const dog = await get<Cat>(`/cat${success ? "" : "-error"}?json=true`)

  return dog
}
