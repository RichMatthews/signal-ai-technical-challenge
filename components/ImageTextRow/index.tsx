import type { NextPage } from 'next'
import Link from 'next/link'
import { ImageWithText } from 'components/ImageWithText'
import styles from '/styles/Show.module.css'

type ImageTextRow<T> = {
  data: T[]
  iterator: string
}

export const ImageTextRow = <T,>({ data, iterator }: ImageTextRow<T>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className={styles.showsContainer}>
        {data?.map(i => (
          <ImageWithText
            key={i?.id}
            id={i?.id}
            image={i?.image?.medium}
            text={i?.[iterator]}
          />
        ))}
      </div>
    </div>
  )
}
