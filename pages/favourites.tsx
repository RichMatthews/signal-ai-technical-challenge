import { useContext } from 'react'
import { FavouritesContext } from '@/context/Favourites'
import type { NextPage } from 'next'
import styles from '/styles/Home.module.css'
import { ImageTextRow } from 'components/ImageTextRow'

const Favourites: NextPage = () => {
  const { favourites } = useContext(FavouritesContext)

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        {favourites.length > 0 ? (
          <ImageTextRow data={favourites} iterator="name" title="Favourites" />
        ) : (
          <div>Your favourites will appear here</div>
        )}
      </div>
    </div>
  )
}

export default Favourites
