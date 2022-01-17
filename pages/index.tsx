import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [tvShows, setTvShows] = useState([]);

  const searchForShows = useCallback(() => {
    console.log(search, "the search?");
    fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then((res) => res.json())
      .then((r) => setTvShows(r));
  }, [search]);

  useEffect(() => {
    searchForShows();
  }, [searchForShows]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <input
          placeholder="Search for a tvshow"
          onChange={searchHandler}
          className={styles.input}
        />
        <div className={styles.showsContainer}>
          {tvShows?.map((show) => (
            <div className={styles.show}>
              <img
                src={show?.show?.image?.original}
                className={styles.showImage}
              />
              <h3>{show.show.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
