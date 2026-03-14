/**
 * Synchronous data access functions for leaderboard
 * These mock functions simulate what would typically be async API calls
 */

import { leaderboardData } from './data'
import { type GameLeaderboard, type LeaderboardEntry } from './types'

/**
 * Get all game leaderboards with their top N entries
 */
export const getAllLeaderboards = (topN: number = 3): GameLeaderboard[] => {
  return Object.values(leaderboardData).map((leaderboard) => ({
    ...leaderboard,
    entries: leaderboard.entries.slice(0, topN),
  }))
}

/**
 * Get a single game's leaderboard by slug
 */
export const getLeaderboardBySlug = (
  slug: string,
  topN: number = 10,
): GameLeaderboard | null => {
  const leaderboard = leaderboardData[slug]
  if (!leaderboard) {
    return null
  }
  return {
    ...leaderboard,
    entries: leaderboard.entries.slice(0, topN),
  }
}

/**
 * Get a specific entry by game slug and player ID
 */
export const getEntryByPlayer = (
  slug: string,
  playerId: string,
): LeaderboardEntry | null => {
  const leaderboard = leaderboardData[slug]
  if (!leaderboard) {
    return null
  }
  return (
    leaderboard.entries.find((entry) => entry.player.id === playerId) || null
  )
}

/**
 * Get all available game slugs
 */
export const getAvailableGames = (): string[] => {
  return Object.keys(leaderboardData)
}

/**
 * Check if a game has leaderboard data
 */
export const hasLeaderboard = (slug: string): boolean => {
  return slug in leaderboardData
}
