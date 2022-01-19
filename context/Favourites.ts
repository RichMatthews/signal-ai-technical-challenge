import { createContext } from 'react'
import type { Favourite } from 'types'

export type Favourites = {
  favourites: Favourite[]
  toggleFavourite: ({ id, name, image }: Favourite) => void
}

export const FavouritesContext = createContext<Favourites>({
  favourites: [],
  toggleFavourite: () => {},
})
