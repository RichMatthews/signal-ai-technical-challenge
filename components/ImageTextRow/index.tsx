import { ImageWithText } from 'components/ImageWithText'
import styles from '/styles/Show.module.css'

type ImageTextRow<T> = {
  data: T[]
  iterator: string
  title: string
}

export const ImageTextRow = <T,>({
  data,
  iterator,
  title,
}: ImageTextRow<T>) => {
  return (
    <>
      <h3>{title}</h3>
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
    </>
  )
}
