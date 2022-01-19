import { Image } from 'components/Image'
import styles from '/styles/Images.module.css'

type ImageWithTextProps = {
  image: string
  text: string
}

export const ImageWithText = ({ image, text }: ImageWithTextProps) => (
  <div>
    <Image
      src={image}
      alt="something"
      size="small"
      // style={{ marginBottom: '250px' }}
    />
    <p>{text}</p>
  </div>
)
