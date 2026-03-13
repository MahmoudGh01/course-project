import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import Card from './Card'
import styles from './Card.module.css'

describe('Card', () => {
  it('should render with children', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>,
    )

    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should apply default variant', () => {
    const { container } = render(<Card>Content</Card>)

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass(styles.default)
  })

  it('should apply elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>)

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass(styles.elevated)
  })

  it('should apply outlined variant', () => {
    const { container } = render(<Card variant="outlined">Content</Card>)

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass(styles.outlined)
  })

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>)

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('custom-card')
  })

  it('should pass through other div props', () => {
    const { container } = render(<Card data-testid="test-card">Content</Card>)

    const card = container.firstChild as HTMLElement
    expect(card).toHaveAttribute('data-testid', 'test-card')
  })
})
