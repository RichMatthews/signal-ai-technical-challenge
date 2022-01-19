import type { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { PreviousSearchContext } from '/context/PreviousSearch'
import styles from '/styles/Home.module.css'
import { Image } from 'components/Image'
type Show = {
  id: string
  name: string
  genres: string[]
  image: {
    medium: string
  }
}

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

  const renderPriorityImage = (medium: string) => {
    return <Image alt="needsChanging" src={medium} />
    // return (
    //   <Image
    //     alt="needsChanging"
    //     src={original ? original : medium ? medium : ""}
    //     // className={styles.showImage}
    //     layout="fill"
    //     objectFit=""
    //   />
    // );
  }

  const showNoShowsText = useMemo(
    () => search.length > 0 && tvShows.length === 0,
    [search.length, tvShows.length]
  )

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <input
          placeholder="Search for a tvshow"
          onChange={searchHandler}
          className={styles.input}
          defaultValue={search}
        />
        <div className={styles.showsContainer}>
          {showNoShowsText ? (
            <div>No TV Shows found</div>
          ) : (
            tvShows?.map(({ show }: Show) => (
              <Link href={`/shows/${show.id}`} key={show?.id} passHref>
                <div className={styles.show}>
                  <div className={styles.imageContainer}>
                    {renderPriorityImage(show?.image?.medium)}
                  </div>
                  <h4 className={styles.heading4}>{show?.name}</h4>
                  <p className={styles.subHeading}>
                    {show?.genres?.slice(0, 2).join(', ')}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
