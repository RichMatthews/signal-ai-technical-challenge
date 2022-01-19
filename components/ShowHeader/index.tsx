import styles from '/styles/Show.module.css'
import YourSvg from '/assets/star2.svg'
import { Image } from 'components/Image'
import { useContext } from 'react'
import { FavouritesContext } from '@/context/Favourites'

type ShowHeaderProps = {
  name: string
  id: string
  image: string
  onToggle: any // change
}

export const ShowHeader = ({ name, image, id, onToggle }: ShowHeaderProps) => {
  const { favourites } = useContext(FavouritesContext)

  return (
    <div className={styles.imageAndTitle}>
      <Image src={image} alt="something" size="large" />
      <h2 style={{ margin: 0, marginRight: '20px' }}>{name}</h2>
      <YourSvg
        fill={
          favourites.filter(fave => fave.id === id).length === 1
            ? 'gold'
            : 'white'
        }
        stroke={'black'}
        strokeWidth="1"
        onClick={onToggle}
      />
    </div>
  )
}
