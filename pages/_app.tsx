import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCallback, useMemo, useState } from "react";
import { PreviousSearchContext } from "../context/PreviousSearch";

function MyApp({ Component, pageProps }: AppProps) {
  const [search, setSearch] = useState("");

  const currencyFormatterContext = useMemo(
    () => ({ search, setSearch }),
    [search]
  );

  console.log(search, "<< s");
  return (
    <PreviousSearchContext.Provider value={currencyFormatterContext}>
      <Component {...pageProps} />
    </PreviousSearchContext.Provider>
  );
}

export default MyApp;
