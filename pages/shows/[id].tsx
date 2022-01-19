import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ShowHeader } from 'components/ShowHeader'
import layoutStyles from '/styles/Show.module.css'
import { ImageTextRow } from '../../components/ImageTextRow'
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
  console.log(show)
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.contentContainer}>
        <ShowHeader
          image={show?.image?.medium}
          id={show?.id}
          name={show?.name}
          onToggle={() =>
            toggleFavourite({
              id: show?.id,
              name: show?.name,
              image: show?.image.medium,
            })
          }
        />

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
