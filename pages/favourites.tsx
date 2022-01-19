import { useContext } from 'react'
import { FavouritesContext } from '@/context/Favourites'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import type { Favourite } from 'types'

const Favourites: NextPage = () => {
  const { favourites } = useContext(FavouritesContext)

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h3>Favourites</h3>
        {favourites ? (
          favourites.map((favourite: Favourite) => (
            <div key={favourite.id}>
              <div>{favourite?.name}</div>
              <img src={favourite?.image} />
            </div>
          ))
        ) : (
          <div>Your favourites will appear here</div>
        )}
      </div>
    </div>
  )
}

export default Favourites
