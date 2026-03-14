import { Link } from 'react-router'

import {
  getAllLeaderboards,
  type GameLeaderboard,
} from '../../shared/leaderboard'

import styles from './List.module.css'

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

type GameLeaderboardCardProps = {
  leaderboard: GameLeaderboard
}

const GameLeaderboardCard: React.FC<GameLeaderboardCardProps> = ({
  leaderboard,
}): React.JSX.Element => {
  return (
    <div className={styles.gameCard}>
      <div className={styles.gameHeader}>
        <h2 className={styles.gameTitle}>{leaderboard.gameTitle}</h2>
        <Link
          to={`/leaderboard/${leaderboard.gameSlug}`}
          className={styles.viewAllLink}
        >
          View All
        </Link>
      </div>
      {leaderboard.entries.length === 0 ? (
        <p className={styles.emptyState}>No scores yet</p>
      ) : (
        <ul className={styles.entriesList}>
          {leaderboard.entries.map((entry) => (
            <li key={entry.id} className={styles.entry}>
              <span className={`${styles.rank} ${getRankClass(entry.rank)}`}>
                <span className={styles.trophy}>{getTrophy(entry.rank)}</span>
              </span>
              <span className={styles.playerName}>{entry.player.name}</span>
              <span className={styles.score}>{formatScore(entry.score)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const LeaderboardList: React.FC = (): React.JSX.Element => {
  const leaderboards = getAllLeaderboards(3)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>High Scores</h1>
      <p className={styles.subtitle}>Hall of Fame</p>

      <div className={styles.gamesList}>
        {leaderboards.map((leaderboard) => (
          <GameLeaderboardCard
            key={leaderboard.gameSlug}
            leaderboard={leaderboard}
          />
        ))}
      </div>

      <Link to="/" className={styles.backLink}>
        Back to Games
      </Link>
    </div>
  )
}

export default LeaderboardList
