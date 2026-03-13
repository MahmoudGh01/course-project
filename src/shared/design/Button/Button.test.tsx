import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import Button from './Button'
import styles from './Button.module.css'

describe('Button', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('should apply primary variant by default', () => {
    render(<Button>Primary</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.primary)
  })

  it('should apply secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.secondary)
  })

  it('should apply danger variant', () => {
    render(<Button variant="danger">Danger</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.danger)
  })

  it('should apply medium size by default', () => {
    render(<Button>Medium</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.medium)
  })

  it('should apply small size', () => {
    render(<Button size="small">Small</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.small)
  })

  it('should apply large size', () => {
    render(<Button size="large">Large</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.large)
  })

  it('should apply fullWidth class', () => {
    render(<Button fullWidth>Full Width</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(styles.fullWidth)
  })

  it('should handle click events', async () => {
    const user = userEvent.setup()
    let clicked = false
    const handleClick = () => {
      clicked = true
    }

    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('should pass through other button props', () => {
    render(<Button type="submit">Submit</Button>)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
