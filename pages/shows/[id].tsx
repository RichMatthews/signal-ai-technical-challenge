import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ShowHeader } from 'components/ShowHeader'
import { ImageTextRow } from 'components/ImageTextRow'
import layoutStyles from '/styles/Layout.module.css'
import { FavouritesContext } from 'context/Favourites'
import type { Show as ShowType, Season } from 'types'

const regex = /(<([^>]+)>)/gi

export const Show = () => {
  const router = useRouter()
  const { id } = router?.query
  const [show, setShow] = useState<ShowType>()
  const [loading, setLoading] = useState(false)
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
          setLoading(false)
        })
      )
      .catch(() => router.push('/404'))
  }, [id, router])

  useEffect(() => {
    setLoading(true)
    if (id) {
      getEmbeddedShowDetails()
    }
  }, [getEmbeddedShowDetails, id])

  const renderCorrectContentState = useMemo(() => {
    console.log(loading)
    if (loading) {
      return (
        <div className={layoutStyles.container}>
          Fetching show information...
        </div>
      )
    }

    if (!loading && !show?.id) {
      return (
        <div className={layoutStyles.container}>
          We could not fine the relevant page
        </div>
      )
    }

    return (
      show?.id && (
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
      )
    )
  }, [loading, show, toggleFavourite])

  return renderCorrectContentState
}

export default Show
