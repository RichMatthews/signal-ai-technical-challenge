import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const regex = /(<([^>]+)>)/gi;

const Show: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [show, setShow] = useState();

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
          };
          setShow(amalgamatedData);
        })
      );
  }, [id]);

  useEffect(() => {
    if (id) {
      //   fetch(`https://api.tvmaze.com/shows/${id}`)
      //     .then((res) => res.json())
      //     .then((res) => setShow(res));
      getEmbeddedShowDetails();
    }
  }, [getEmbeddedShowDetails, id]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "500px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          background: "red",
          width: "100%",
        }}
      >
        <img src={show?.image?.medium} style={{ marginRight: "10px" }} />
        <h2 style={{ margin: 0 }}>{show?.name}</h2>
        <div>Favourite goes here</div>
      </div>
      <div>{show?.summary.replace(regex, "")}</div>

      <h3>Cast</h3>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {show?.cast.map(({ person }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img src={person?.image.medium} style={{ width: "80px" }} />
            {person?.name}
          </div>
        ))}
      </div>

      <div>
        {show?.seasons.map((season) => (
          <>
            <div>{season?.number}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Show;
