import { Link } from 'react-router'

import { getLeaderboardBySlug, type LeaderboardEntry } from '../../leaderboard'

import styles from './GameLeaderboard.module.css'

export type GameLeaderboardProps = {
  /** The game slug to show leaderboard for */
  gameSlug: string
  /** Number of entries to display (default: 3) */
  topN?: number
  /** Use compact styling */
  compact?: boolean
  /** Custom class name */
  className?: string
}

const getMedal = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🥇'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return ''
  }
}

const getRankClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return styles.rank1
    case 2:
      return styles.rank2
    case 3:
      return styles.rank3
    default:
      return ''
  }
}

const formatScore = (score: number): string => {
  return score.toLocaleString()
}

type EntryRowProps = {
  entry: LeaderboardEntry
}

const EntryRow: React.FC<EntryRowProps> = ({ entry }): React.JSX.Element => {
  return (
    <li className={styles.entry}>
      <span className={`${styles.rank} ${getRankClass(entry.rank)}`}>
        <span className={styles.medal}>{getMedal(entry.rank)}</span>
      </span>
      <span className={styles.playerName}>{entry.player.name}</span>
      <span className={styles.score}>{formatScore(entry.score)}</span>
    </li>
  )
}

/**
 * A compact leaderboard widget for displaying top scores on game pages
 */
const GameLeaderboard: React.FC<GameLeaderboardProps> = ({
  gameSlug,
  topN = 3,
  compact = false,
  className = '',
}): React.JSX.Element | null => {
  const leaderboard = getLeaderboardBySlug(gameSlug, topN)

  if (!leaderboard) {
    return null
  }

  const containerClass =
    `${styles.container} ${compact ? styles.compact : ''} ${className}`.trim()

  return (
    <div className={containerClass}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.trophy}>🏆</span>
          High Scores
        </h3>
        <Link to={`/leaderboard/${gameSlug}`} className={styles.viewAllLink}>
          View All
        </Link>
      </div>

      {leaderboard.entries.length === 0 ? (
        <p className={styles.emptyState}>No scores yet</p>
      ) : (
        <ul className={styles.entriesList}>
          {leaderboard.entries.map((entry) => (
            <EntryRow key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default GameLeaderboard
