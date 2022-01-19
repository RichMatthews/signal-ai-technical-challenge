import type { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { PreviousSearchContext } from '@/context/PreviousSearch'
import styles from '/styles/Home.module.css'
import layoutStyles from '/styles/Layout.module.css'
import { Image } from 'components/Image'
import type { Show } from 'types'

const Home: NextPage = () => {
  const [tvShows, setTvShows] = useState([])
  const { search, setSearch } = useContext(PreviousSearchContext)

  const searchForShows = useCallback(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then(res => res.json())
      .then(res => setTvShows(res))
  }, [search])

  useEffect(() => {
    searchForShows()
  }, [searchForShows])

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const showNoShowsText = useMemo(
    () => search.length > 0 && tvShows.length === 0,
    [search.length, tvShows.length]
  )

  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.contentContainer}>
        <input
          placeholder="Search for a tvshow"
          onChange={searchHandler}
          className={styles.input}
          defaultValue={search}
        />
        {showNoShowsText ? (
          <div>No TV Shows found</div>
        ) : (
          <div className={layoutStyles.layout3Grid}>
            {tvShows?.map(({ show }: { show: Show }) => (
              <Link href={`/shows/${show.id}`} key={show?.id} passHref>
                <div className={styles.show}>
                  <Image alt="needsChanging" src={show?.image?.medium} />
                  <h4 className={styles.heading4}>{show?.name}</h4>
                  <p className={styles.subHeading}>
                    {show?.genres?.slice(0, 2).join(', ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
