import { createContext } from 'react'

export type Favourites = {
  favourites: []
  toggleFavourite: any //change this
}

export const FavouritesContext = createContext<Favourites>({
  favourites: [],
  toggleFavourite: () => {},
})
