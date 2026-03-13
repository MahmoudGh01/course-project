import classNames from 'classnames'
import { type HTMLAttributes, type ReactNode } from 'react'

import styles from './Card.module.css'

export type CardVariant = 'default' | 'elevated' | 'outlined'

export type CardProps = {
  variant?: CardVariant
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function Card({
  variant = 'default',
  className,
  children,
  ...props
}: CardProps): React.JSX.Element {
  return (
    <div
      className={classNames(styles.card, styles[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}
