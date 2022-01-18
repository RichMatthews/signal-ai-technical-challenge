import { useContext } from 'react'
import { FavouritesContext } from '@/context/Favourites'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Favourites: NextPage = () => {
  const { favourites } = useContext(FavouritesContext)

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h3>Favourites</h3>
        {favourites.map(favourite => (
          <div>
            <div>{favourite?.name}</div>
            <img src={favourite?.image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favourites
