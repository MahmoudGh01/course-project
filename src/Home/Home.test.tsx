import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'

import Home from './Home'

describe('Home page', () => {
  it('renders a list of games', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading')).toHaveTextContent('Games')

    expect(screen.getByText('Play Go')).toHaveAttribute('href', '/play/go')
    expect(screen.getByText('Play Wordle')).toHaveAttribute(
      'href',
      '/play/wordle',
    )
  })
})
