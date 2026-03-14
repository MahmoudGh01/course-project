import { Route, Routes } from 'react-router'

import AppLayout from './AppLayout'
import Home from './Home'
import { LeaderboardList, LeaderboardDetail } from './Leaderboard'
import Play from './Play'

const App: React.FC = () => {
  return (
    <Routes>
      <Route Component={AppLayout}>
        <Route index Component={Home} />
        <Route path="/play/:slug" Component={Play} />
        <Route path="/leaderboard" Component={LeaderboardList} />
        <Route path="/leaderboard/:slug" Component={LeaderboardDetail} />
      </Route>
    </Routes>
  )
}

export default App
