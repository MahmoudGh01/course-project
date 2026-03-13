import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it } from 'vitest'

import AppLayout from './AppLayout'

describe('AppLayout page', () => {
  it('works', () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>,
    )
  })
})
