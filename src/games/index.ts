import cats from './Cats'
import { type Game } from './types'
import wordle from './Wordle'

export type { Game }

const games: Record<string, Game> = {
  cats,
  wordle,
}

export default games
