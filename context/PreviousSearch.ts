import { createContext } from "react";

export type PreviousSearch = {
  search: string;
  setSearch: any; //change this
};

export const PreviousSearchContext = createContext<PreviousSearch>({
  search: "",
  setSearch: () => {},
});
