import { type ReactNode } from 'react'

import styles from './ErrorMessage.module.css'

export type ErrorMessageProps = {
  title?: string
  message: string
  onRetry?: () => void
  children?: ReactNode
}

export default function ErrorMessage({
  title = 'Oops! Something went wrong',
  message,
  onRetry,
  children,
}: ErrorMessageProps): React.JSX.Element {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
      {children}
    </div>
  )
}
