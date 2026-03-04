import { Outlet } from "react-router"

const AppLayout: React.FC = () => {
  return (
    <div>
      <h1>Wordlish</h1>
      <Outlet />
    </div>
  )
}

export default AppLayout
