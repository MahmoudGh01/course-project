/**
 * Mock leaderboard data store
 * In a real app, this would come from a backend API
 */

import {
  type LeaderboardEntry,
  type GameLeaderboard,
  type Player,
} from './types'

// Mock players
const players: Player[] = [
  { id: 'p1', name: 'PIXEL_MASTER', avatar: undefined },
  { id: 'p2', name: 'ARCADE_KING', avatar: undefined },
  { id: 'p3', name: 'RETRO_QUEEN', avatar: undefined },
  { id: 'p4', name: 'NEON_NINJA', avatar: undefined },
  { id: 'p5', name: 'BYTE_CRUSHER', avatar: undefined },
  { id: 'p6', name: 'GLITCH_WIZARD', avatar: undefined },
  { id: 'p7', name: 'TURBO_GAMER', avatar: undefined },
  { id: 'p8', name: 'CYBER_WOLF', avatar: undefined },
  { id: 'p9', name: 'LASER_CAT', avatar: undefined },
  { id: 'p10', name: 'MEGA_PLAYER', avatar: undefined },
  { id: 'p11', name: 'STAR_CHASER', avatar: undefined },
  { id: 'p12', name: 'POWER_UP_PRO', avatar: undefined },
]

// Helper to create entries with proper ranking
const createEntries = (
  gameSlug: string,
  scores: { playerId: string; score: number; daysAgo: number }[],
): LeaderboardEntry[] => {
  return scores
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => {
      const player = players.find((p) => p.id === entry.playerId)!
      const date = new Date()
      date.setDate(date.getDate() - entry.daysAgo)
      return {
        id: `${gameSlug}-${entry.playerId}`,
        player,
        score: entry.score,
        date,
        rank: index + 1,
      }
    })
}

// Mock data for each game
const wordleEntries = createEntries('wordle', [
  { playerId: 'p1', score: 9850, daysAgo: 1 },
  { playerId: 'p2', score: 9720, daysAgo: 3 },
  { playerId: 'p3', score: 9650, daysAgo: 2 },
  { playerId: 'p4', score: 9400, daysAgo: 5 },
  { playerId: 'p5', score: 9200, daysAgo: 4 },
  { playerId: 'p6', score: 8950, daysAgo: 7 },
  { playerId: 'p7', score: 8800, daysAgo: 6 },
  { playerId: 'p8', score: 8650, daysAgo: 8 },
  { playerId: 'p9', score: 8500, daysAgo: 10 },
  { playerId: 'p10', score: 8350, daysAgo: 9 },
])

const catsEntries = createEntries('cats', [
  { playerId: 'p3', score: 15420, daysAgo: 2 },
  { playerId: 'p5', score: 14800, daysAgo: 1 },
  { playerId: 'p1', score: 14200, daysAgo: 4 },
  { playerId: 'p7', score: 13900, daysAgo: 3 },
  { playerId: 'p9', score: 13500, daysAgo: 6 },
  { playerId: 'p2', score: 13100, daysAgo: 5 },
  { playerId: 'p11', score: 12800, daysAgo: 8 },
  { playerId: 'p4', score: 12400, daysAgo: 7 },
  { playerId: 'p12', score: 12000, daysAgo: 10 },
  { playerId: 'p6', score: 11600, daysAgo: 9 },
])

// The main data store
export const leaderboardData: Record<string, GameLeaderboard> = {
  wordle: {
    gameSlug: 'wordle',
    gameTitle: 'Wordle',
    entries: wordleEntries,
  },
  cats: {
    gameSlug: 'cats',
    gameTitle: 'Cat Viewer',
    entries: catsEntries,
  },
}
