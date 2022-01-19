import { useContext } from 'react'
import { FavouritesContext } from '@/context/Favourites'
import { Image } from 'components/Image'
import type { NextPage } from 'next'
import type { Favourite } from 'types'
import styles from '../styles/Home.module.css'

const Favourites: NextPage = () => {
  const { favourites } = useContext(FavouritesContext)

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h3>Favourites</h3>
        {favourites.length > 0 ? (
          favourites.map((favourite: Favourite) => (
            <div key={favourite.id}>
              <div>{favourite?.name}</div>
              <Image src={favourite?.image} alt="change" />
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
