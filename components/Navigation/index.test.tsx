import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { Navigation } from './index'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    }
  },
}))

describe('Navigation Component', () => {
  it('renders correctly', () => {
    render(<Navigation />)

    expect(screen.getByText('Home')).toBeTruthy()
    expect(screen.getByText('Favourites')).toBeTruthy()
  })
})
