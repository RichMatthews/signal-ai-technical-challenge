import { useContext, useMemo } from 'react'
import { FavouritesContext } from '@/context/Favourites'
import { Image } from 'components/Image'
import styles from '/styles/Show.module.css'
import YourSvg from '/assets/star.svg'

type ShowHeaderProps = {
  name: string
  id: string
  image?: string
  onToggle: () => void
}

export const ShowHeader = ({ name, image, id, onToggle }: ShowHeaderProps) => {
  const { favourites } = useContext(FavouritesContext)

  const favouriteStartColor = useMemo(
    () =>
      favourites.filter(fave => fave.id === id).length === 1 ? 'gold' : 'white',
    [favourites, id]
  )
  return (
    <div className={styles.imageAndTitle}>
      <Image src={image ?? '/public/images'} alt="something" size="large" />
      <h2 className={styles.title}>{name}</h2>
      <YourSvg
        fill={favouriteStartColor}
        stroke="black"
        strokeWidth="1"
        onClick={onToggle}
      />
    </div>
  )
}
