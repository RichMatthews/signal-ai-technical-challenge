import { act, screen, render, waitFor } from '@testing-library/react'
import { Favourites } from 'pages/favourites'
import { FavouritesContext } from 'context/Favourites'
import * as hooks from 'next/router'
import axios from 'axios'

describe('Favourites page', () => {
  it('renders the correct text when there are no Favourites', () => {
    render(<Favourites />)

    expect(screen.getByText('Your favourites will appear here')).toBeTruthy()
  })

  it('renders a single Favourite', () => {
    render(
      <FavouritesContext.Provider
        value={{
          favourites: [{ name: 'Test Show Title', id: 123 }],
          toggleFavourite: jest.fn(),
        }}
      >
        <Favourites />
      </FavouritesContext.Provider>
    )

    expect(screen.getByText('Test Show Title')).toBeTruthy()
  })

  it('renders multiple Favourites', () => {
    render(
      <FavouritesContext.Provider
        value={{
          favourites: [
            { name: 'Test Show Title', id: 123 },
            { name: 'James Bond', id: 124 },
          ],
          toggleFavourite: jest.fn(),
        }}
      >
        <Favourites />
      </FavouritesContext.Provider>
    )

    expect(screen.getByText('Test Show Title')).toBeTruthy()
    expect(screen.getByText('James Bond')).toBeTruthy()
  })
})
