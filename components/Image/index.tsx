import NextImage from 'next/image'
import { useMemo } from 'react'
import styles from '/styles/Layout.module.css'

type ImageProps = {
  alt: string
  src: string
  size?: 'small' | 'normal' | 'large'
}

export const Image = ({ alt, src, size = 'normal' }: ImageProps) => {
  const stylesForImageSize = useMemo(() => {
    if (size === 'small') {
      return styles.smallImageContainer
    }
    if (size === 'normal') {
      return styles.normalImageContainer
    }
    return styles.largeImageContainer
  }, [size])

  return (
    <div className={`${stylesForImageSize} ${styles.imageContainer}`}>
      <NextImage
        alt={alt}
        src={src ?? '/images/not-available.png'}
        layout="fill"
      />
    </div>
  )
}
