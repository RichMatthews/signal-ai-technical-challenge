import { Image } from 'components/Image'

type ImageWithTextProps = {
  id: number
  image: string
  text: string
}

export const ImageWithText = ({ id, image, text }: ImageWithTextProps) => (
  <div key={id}>
    <Image src={image} alt="something" size="small" />
    <p>{text}</p>
  </div>
)
