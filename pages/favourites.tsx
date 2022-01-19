import { useContext } from 'react'
import { FavouritesContext } from '@/context/Favourites'
import type { NextPage } from 'next'
import styles from '/styles/Layout.module.css'
import { ImageTextRow } from 'components/ImageTextRow'

const Favourites: NextPage = () => {
  const { favourites } = useContext(FavouritesContext)

  return (
    <div className={styles.container}>
      {favourites.length > 0 ? (
        <div className={styles.contentContainer}>
          <ImageTextRow data={favourites} iterator="name" title="Favourites" />
        </div>
      ) : (
        <div>Your favourites will appear here</div>
      )}
    </div>
  )
}

export default Favourites
