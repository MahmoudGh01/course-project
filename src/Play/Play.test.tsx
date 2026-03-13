import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it } from 'vitest'

import Play from './Play'

describe('Play page', () => {
  it('works', () => {
    render(
      <MemoryRouter>
        <Play />
      </MemoryRouter>,
    )
  })
})
