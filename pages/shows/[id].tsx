import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ShowHeader } from 'components/ShowHeader'
import { ImageTextRow } from 'components/ImageTextRow'
import layoutStyles from '/styles/Layout.module.css'
import { FavouritesContext } from '@/context/Favourites'
import type { Cast, Show, Season } from 'types'

const regex = /(<([^>]+)>)/gi

const Show: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [show, setShow] = useState<Show>()
  const { toggleFavourite } = useContext(FavouritesContext)

  const getEmbeddedShowDetails = useCallback(async () => {
    axios
      .all([
        axios.get(`https://api.tvmaze.com/shows/${id}`),
        axios.get(`https://api.tvmaze.com/shows/${id}/cast`),
        axios.get(`https://api.tvmaze.com/shows/${id}/seasons`),
      ])
      .then(
        axios.spread(({ data }, { data: cast }, { data: seasons }) => {
          const generatedAmalgamatedData = {
            ...data,
            cast,
            seasons,
          }
          setShow(generatedAmalgamatedData)
        })
      )
  }, [id])

  useEffect(() => {
    if (id) {
      getEmbeddedShowDetails()
    }
  }, [getEmbeddedShowDetails, id])

  return show?.id ? (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.contentContainer}>
        <ShowHeader
          image={show?.image?.medium}
          id={show?.id}
          name={show.name}
          onToggle={() =>
            toggleFavourite({
              id: show?.id,
              name: show?.name,
              image: {
                medium: show?.image?.medium,
              },
            })
          }
        />

        <div>{show?.summary && show?.summary.replace(regex, '')}</div>

        {show?.cast && show.cast.length > 0 && (
          <ImageTextRow<string>
            data={show?.cast.map(x => x.person)}
            iterator="name"
            title="Cast"
          />
        )}

        {show?.seasons && show?.seasons?.length > 0 && (
          <ImageTextRow<Season>
            data={show?.seasons}
            iterator="number"
            title="Seasons"
          />
        )}
      </div>
    </div>
  ) : (
    <div className={layoutStyles.container}>
      We could not fine the relevant page
    </div>
  )
}

export default Show
