import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from '/styles/Show.module.css'
import { ImageTextRow } from '/components/ImageTextRow'
import YourSvg from '/assets/star.svg'

const regex = /(<([^>]+)>)/gi

const Show: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [show, setShow] = useState()

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
          <YourSvg fill="red" onClick={() => console.log('favouriting')} />
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
