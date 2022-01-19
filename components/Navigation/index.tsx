import Link from 'next/link'

export const Navigation = () => {
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
      }}
    >
      <div
        style={{
          width: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/favourites">Favourites</Link>
      </div>
    </div>
  )
}
