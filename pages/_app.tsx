import type { AppProps } from 'next/app'
import { useCallback, useMemo, useState } from 'react'
import { PreviousSearchContext } from '@/context/PreviousSearch'
import { FavouritesContext } from '@/context/Favourites'
import { Navigation } from 'components/Navigation'
import type { Favourite } from 'types'
import '/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState('')
  const [favourites, setFavourites] = useState<Favourite[]>([])

  const toggleFavourite = useCallback(
    ({ id, name, image }) => {
      const idAlreadyFavourited =
        favourites.filter(fave => fave.id === id).length === 0
      if (idAlreadyFavourited) {
        setFavourites([...favourites, { id, name, image }])
      } else {
        setFavourites(favourites.filter(fave => fave.id !== id))
      }
    },
    [favourites]
  )

  const searchValue = useMemo(() => ({ search, setSearch }), [search])
  const favouritesValue = useMemo(
    () => ({ favourites, toggleFavourite }),
    [favourites, toggleFavourite]
  )

  return (
    <PreviousSearchContext.Provider value={searchValue}>
      <FavouritesContext.Provider value={favouritesValue}>
        <Navigation />
        <Component {...pageProps} />
      </FavouritesContext.Provider>
    </PreviousSearchContext.Provider>
  )
}

export default MyApp
