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

    // Check main title
    expect(
      screen.getByRole('heading', { level: 1, name: 'Arcade' }),
    ).toBeInTheDocument()

    // Check section headings
    expect(
      screen.getByRole('heading', { level: 2, name: 'Games' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'High Scores' }),
    ).toBeInTheDocument()

    // Check game links by their game name text
    expect(screen.getByText('Wordle').closest('a')).toHaveAttribute(
      'href',
      '/play/wordle',
    )
    expect(screen.getByText('Cats').closest('a')).toHaveAttribute(
      'href',
      '/play/cats',
    )
    expect(screen.getByText('Go').closest('a')).toHaveAttribute(
      'href',
      '/play/go',
    )

    // Check leaderboard link
    expect(screen.getByText('View Leaderboard').closest('a')).toHaveAttribute(
      'href',
      '/leaderboard',
    )
  })
})
