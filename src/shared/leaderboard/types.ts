/**
 * Leaderboard data types
 */

export type Player = {
  id: string
  name: string
  avatar?: string
}

export type LeaderboardEntry = {
  id: string
  player: Player
  score: number
  date: Date
  rank: number
}

export type GameLeaderboard = {
  gameSlug: string
  gameTitle: string
  entries: LeaderboardEntry[]
}
