import type { NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useContext, useEffect, useState } from 'react'
import { PreviousSearchContext } from '/context/PreviousSearch'
import styles from '/styles/Home.module.css'

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

  const searchHandler = e => {
    setSearch(e.target.value)
  }

  const renderPriorityImage = (medium: string) => {
    return (
      <img
        alt="needsChanging"
        src={medium ? medium : '/images/not-available.png'}
        className={styles.showImage}
      />
    )
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
          {tvShows?.map(({ show }: Show) => (
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
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
