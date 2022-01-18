import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/Link'
import { useMemo, useState } from 'react'
import { PreviousSearchContext } from '/context/PreviousSearch'
import { FavouritesContext } from '/context/Favourites'

function MyApp({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState('')
  const [favourites, setFavourites] = useState([])

  const toggleFavourites = props => {
    const isIt = favourites.filter(x => x.id === props.id).length === 0
    if (isIt) {
      setFavourites([...favourites, { ...props }])
    } else {
      setFavourites(favourites.filter(x => x.id !== props.id))
    }
  }

  console.log(favourites)

  const searchValue = useMemo(() => ({ search, setSearch }), [search])
  const favouritesValue = useMemo(
    () => ({ favourites, toggleFavourites }),
    [favourites, toggleFavourites]
  )

  return (
    <PreviousSearchContext.Provider value={searchValue}>
      <FavouritesContext.Provider value={favouritesValue}>
        <Link href="/favourites">Favourites</Link>
        <Component {...pageProps} />
      </FavouritesContext.Provider>
    </PreviousSearchContext.Provider>
  )
}

export default MyApp
