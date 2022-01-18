import type { NextPage } from 'next'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '/styles/Show.module.css'
import { ImageTextRow } from '/components/ImageTextRow'
import YourSvg from '/assets/star2.svg'
import { FavouritesContext } from '@/context/Favourites'

const regex = /(<([^>]+)>)/gi

const Show: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [show, setShow] = useState()
  const { favourites, toggleFavourites } = useContext(FavouritesContext)

  const getEmbeddedShowDetails = useCallback(async () => {
    axios
      .all([
        axios.get(`https://api.tvmaze.com/shows/${id}`),
        axios.get(`https://api.tvmaze.com/shows/${id}/cast`),
        axios.get(`https://api.tvmaze.com/shows/${id}/seasons`),
      ])
      .then(
        axios.spread(({ data }, { data: cast }, { data: seasons }) => {
          const amalgamatedData = {
            ...data,
            cast,
            seasons,
          }
          setShow(amalgamatedData)
        })
      )
  }, [id])

  useEffect(() => {
    if (id) {
      getEmbeddedShowDetails()
    }
  }, [getEmbeddedShowDetails, id])

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            width: '100%',
          }}
        >
          <img src={show?.image?.medium} style={{ marginRight: '20px' }} />
          <h2 style={{ margin: 0, marginRight: '20px' }}>{show?.name}</h2>
          <YourSvg
            fill={
              favourites.filter(fave => fave.id === show?.id).length === 1
                ? 'gold'
                : 'white'
            }
            stroke={'black'}
            strokeWidth="1"
            onClick={() =>
              toggleFavourites({
                id: show?.id,
                name: show?.name,
                image: show?.image.medium,
              })
            }
          />
        </div>

        <div>{show?.summary.replace(regex, '')}</div>

        <h3>Cast</h3>
        <ImageTextRow data={show?.cast.map(x => x.person)} iterator="name" />

        <h3>Seasons</h3>
        <ImageTextRow data={show?.seasons} iterator="number" />
      </div>
    </div>
  )
}

export default Show
