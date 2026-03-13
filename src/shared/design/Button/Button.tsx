import classNames from 'classnames'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
