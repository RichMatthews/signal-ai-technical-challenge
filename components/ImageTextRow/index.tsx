import { ImageWithText } from 'components/ImageWithText'
import layoutStyles from '/styles/Layout.module.css'

type ImageTextRow<T> = {
  data: T[]
  iterator: string
  title: string
}

export const ImageTextRow = <T,>({
  data,
  iterator,
  title,
}: ImageTextRow<T>) => (
  <div>
    <h3>{title}</h3>
    <div className={layoutStyles.layout5Grid}>
      {data?.map(i => (
        <ImageWithText
          key={i.id}
          image={i?.image?.medium}
          text={i[iterator as keyof i]}
        />
      ))}
    </div>
  </div>
)
