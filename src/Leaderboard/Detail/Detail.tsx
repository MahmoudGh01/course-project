import { Link, useParams } from 'react-router'

import { getLeaderboardBySlug } from '../../shared/leaderboard'

import styles from './Detail.module.css'

const getRankClass = (rank: number): string => {
  switch (rank) {
    case 1:
      return styles.rank1
    case 2:
      return styles.rank2
    case 3:
      return styles.rank3
    default:
      return styles.rankDefault
  }
}

const getTrophy = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🏆'
    case 2:
      return '🥈'
    case 3:
      return '🥉'
    default:
      return ''
  }
}

const formatScore = (score: number): string => {
  return score.toLocaleString()
}

const formatDate = (date: Date): string => {
  const now = new Date()
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

const LeaderboardDetail: React.FC = (): React.JSX.Element => {
  const { slug } = useParams<{ slug: string }>()
  const leaderboard = slug ? getLeaderboardBySlug(slug, 10) : null

  if (!leaderboard) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Game Not Found</h1>
          <p className={styles.notFoundMessage}>
            No leaderboard exists for this game
          </p>
          <Link
            to="/leaderboard"
            className={`${styles.navLink} ${styles.backLink}`}
          >
            Back to Leaderboards
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{leaderboard.gameTitle}</h1>
        <p className={styles.subtitle}>Top 10 Players</p>
      </div>

      <div className={styles.leaderboardTable}>
        <div className={styles.tableHeader}>
          <span>Rank</span>
          <span>Player</span>
          <span>Score</span>
          <span>Date</span>
        </div>

        {leaderboard.entries.length === 0 ? (
          <p className={styles.emptyState}>No scores recorded</p>
        ) : (
          <ul className={styles.entriesList}>
            {leaderboard.entries.map((entry) => (
              <li key={entry.id} className={styles.entry}>
                <div className={styles.rankCell}>
                  <span
                    className={`${styles.rank} ${getRankClass(entry.rank)}`}
                  >
                    {entry.rank}
                  </span>
                  <span className={styles.trophy}>{getTrophy(entry.rank)}</span>
                </div>
                <span className={styles.playerName}>{entry.player.name}</span>
                <span className={styles.score}>{formatScore(entry.score)}</span>
                <span className={styles.date}>{formatDate(entry.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className={styles.navigation}>
        <Link
          to="/leaderboard"
          className={`${styles.navLink} ${styles.backLink}`}
        >
          All Games
        </Link>
        <Link
          to={`/play/${slug}`}
          className={`${styles.navLink} ${styles.playLink}`}
        >
          Play Now
        </Link>
      </nav>
    </div>
  )
}

export default LeaderboardDetail
