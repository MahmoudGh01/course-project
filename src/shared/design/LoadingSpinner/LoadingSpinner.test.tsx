import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import LoadingSpinner from './LoadingSpinner'
import styles from './LoadingSpinner.module.css'

describe('LoadingSpinner', () => {
  it('should render with default props', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status', { name: 'Loading' })
    expect(spinner).toBeInTheDocument()
  })

  it('should apply medium size by default', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass(styles.medium)
  })

  it('should apply small size', () => {
    render(<LoadingSpinner size="small" />)

    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass(styles.small)
  })

  it('should apply large size', () => {
    render(<LoadingSpinner size="large" />)

    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass(styles.large)
  })

  it('should apply custom color', () => {
    render(<LoadingSpinner color="#ff0000" />)

    const spinner = screen.getByRole('status')
    expect(spinner).toHaveStyle({ borderTopColor: '#ff0000' })
  })

  it('should apply default color when not specified', () => {
    render(<LoadingSpinner />)

    const spinner = screen.getByRole('status')
    expect(spinner).toHaveStyle({ borderTopColor: '#007bff' })
  })
})
