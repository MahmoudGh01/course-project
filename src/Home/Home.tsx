import { Link } from 'react-router'

import games from '../games'

const Home: React.FC = () => {
  return (
    <>
      <h1>Games</h1>
      <ul>
        {Object.entries(games).map(([slug, { title }]) => (
          <li key={slug}>
            <Link to={`/play/${slug}`}>Play {title}</Link>
          </li>
        ))}

        <li>
          <Link to="/play/go">Play Go</Link>
        </li>
      </ul>
    </>
  )
}

export default Home
