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
    <img src={image} style={{ width: '80px' }} />
    {text}
  </div>
)
