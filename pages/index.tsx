import type { NextPage } from 'next'
import Link from 'next/link'
import { debounce } from 'lodash'
import { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { PreviousSearchContext } from '@/context/PreviousSearch'
import styles from '/styles/Home.module.css'
import showStyles from '/styles/Show.module.css'
import layoutStyles from '/styles/Layout.module.css'
import { Image } from 'components/Image'
import type { Show } from 'types'

const Home: NextPage = () => {
  const [tvShows, setTvShows] = useState([])
  const [loading, setLoading] = useState<boolean>()
  const { search, setSearch } = useContext(PreviousSearchContext)
  const [value, setValue] = useState(0)

  const searchForShows = useCallback(() => {
    setLoading(true)
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then(res => res.json())
      .then(res => setTvShows(res))
      .then(() => setLoading(false))
  }, [search])

  useEffect(() => {
    searchForShows()
  }, [searchForShows])

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const renderCorrectState = useMemo(() => {
    if (loading) {
      return <div>Loading...</div>
    }
    if (search.length > 0 && tvShows.length === 0 && !loading)
      return <div>No TV Shows found</div>
    return (
      <div className={layoutStyles.layout3Grid}>
        {tvShows?.map(({ show }: { show: Show }) => (
          <Link href={`/shows/${show.id}`} key={show?.id} passHref>
            <div className={showStyles.show}>
              <Image alt="needsChanging" src={show?.image?.medium} />
              <h4 className={styles.heading4}>{show?.name}</h4>
              <p className={styles.subHeading}>
                {show?.genres?.slice(0, 2).join(', ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    )
  }, [loading, search.length, tvShows])

  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.contentContainer}>
        <input
          placeholder="Search for a tv show"
          onChange={debounce(searchHandler, 250)}
          className={styles.input}
          defaultValue={search}
        />
        {renderCorrectState}
      </div>
    </div>
  )
}

export default Home
