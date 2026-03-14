import { Link } from 'react-router'

import games from '../games'

import styles from './Home.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Arcade</h1>
      <p className={styles.subtitle}>Select Your Game</p>

      <div className={styles.decoration}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>

      <section className={styles.gamesSection}>
        <h2 className={styles.sectionTitle}>Games</h2>
        <ul className={styles.gamesList}>
          {Object.entries(games).map(([slug, { title }]) => (
            <li key={slug} className={styles.gameItem}>
              <Link to={`/play/${slug}`} className={styles.gameLink}>
                <span className={styles.gameIcon}>
                  {slug === 'wordle' ? '📝' : slug === 'cats' ? '🐱' : '🎮'}
                </span>
                <span className={styles.gameName}>{title}</span>
                <span className={styles.playBadge}>Play</span>
              </Link>
            </li>
          ))}

          <li className={styles.gameItem}>
            <Link
              to="/play/go"
              className={`${styles.gameLink} ${styles.unavailable}`}
            >
              <span className={styles.gameIcon}>⚫</span>
              <span className={styles.gameName}>Go</span>
              <span className={styles.playBadge}>Soon</span>
            </Link>
          </li>
        </ul>
      </section>

      <section className={styles.leaderboardSection}>
        <h2 className={styles.sectionTitle}>High Scores</h2>
        <Link to="/leaderboard" className={styles.leaderboardLink}>
          <span className={styles.trophyIcon}>🏆</span>
          <span className={styles.leaderboardText}>View Leaderboard</span>
        </Link>
      </section>

      <footer className={styles.footer}>
        <p className={styles.insertCoin}>Press Start to Play</p>
        <p className={styles.credits}>© 2026 Retro Arcade</p>
      </footer>
    </div>
  )
}

export default Home
