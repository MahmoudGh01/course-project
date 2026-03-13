import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  it('should render with message', () => {
    render(<ErrorMessage message="Something went wrong" />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should render with default title', () => {
    render(<ErrorMessage message="Error occurred" />)

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
  })

  it('should render with custom title', () => {
    render(<ErrorMessage title="Custom Error" message="Error occurred" />)

    expect(screen.getByText('Custom Error')).toBeInTheDocument()
  })

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Error" onRetry={onRetry} />)

    expect(
      screen.getByRole('button', { name: 'Try Again' }),
    ).toBeInTheDocument()
  })

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error" />)

    expect(
      screen.queryByRole('button', { name: 'Try Again' }),
    ).not.toBeInTheDocument()
  })

  it('should call onRetry when retry button is clicked', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()

    render(<ErrorMessage message="Error" onRetry={onRetry} />)

    await user.click(screen.getByRole('button', { name: 'Try Again' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('should render children', () => {
    render(
      <ErrorMessage message="Error">
        <div>Additional content</div>
      </ErrorMessage>,
    )

    expect(screen.getByText('Additional content')).toBeInTheDocument()
  })

  it('should have role="alert"', () => {
    render(<ErrorMessage message="Error" />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
