import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useMemo, useEffect, useState } from 'react'
import styles from '/styles/Show.module.css'
import layoutStyles from '/styles/Show.module.css'
import { ImageTextRow } from '../../components/ImageTextRow'
import YourSvg from '/assets/star2.svg'
import { FavouritesContext } from '@/context/Favourites'
import type { Show } from 'types'

const regex = /(<([^>]+)>)/gi

const Show: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [show, setShow] = useState<Show>()
  const { favourites, toggleFavourite } = useContext(FavouritesContext)

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
    <div className={layoutStyles.container}>
      <div className={layoutStyles.contentContainer}>
        <div className={layoutStyles.imageAndTitle}>
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
              toggleFavourite({
                id: show?.id,
                name: show?.name,
                image: show?.image.medium,
              })
            }
          />
        </div>

        <div>{show?.summary && show?.summary.replace(regex, '')}</div>

        {show?.cast && show.cast.length > 0 && (
          <ImageTextRow
            data={show?.cast.map(x => x.person)}
            iterator="name"
            title="Cast"
          />
        )}

        {show?.seasons && show?.seasons?.length > 0 && (
          <ImageTextRow
            data={show?.seasons}
            iterator="number"
            title="Seasons"
          />
        )}
      </div>
    </div>
  )
}

export default Show
