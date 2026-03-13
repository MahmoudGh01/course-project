import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router'

const AppLayout: React.FC = () => {
  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default AppLayout
