import { Image } from 'components/Image'

type ImageWithTextProps = {
  id: number
  image: string
  text: string
}

export const ImageWithText = ({ id, image, text }: ImageWithTextProps) => (
  <div
    key={id}
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Image src={image} alt="something" />
    {text}
  </div>
)

//    <Image src={image} style={{ width: '80px' }} />
