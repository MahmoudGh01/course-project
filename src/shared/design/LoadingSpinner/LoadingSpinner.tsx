import styles from './LoadingSpinner.module.css'

export type SpinnerSize = 'small' | 'medium' | 'large'

export type LoadingSpinnerProps = {
  size?: SpinnerSize
  color?: string
}

export default function LoadingSpinner({
  size = 'medium',
  color = '#007bff',
}: LoadingSpinnerProps): React.JSX.Element {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.spinner} ${styles[size]}`}
        style={{ borderTopColor: color }}
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}
