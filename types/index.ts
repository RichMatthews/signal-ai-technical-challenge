export type Favourite = {
  id: string
  name: string
  image: string
}

type Cast = {
  person: string
}
type Season = {}
type ShowImage = {
  medium: string
}

export type Show = {
  id: string
  name: string
  image?: ShowImage
  cast?: Cast[]
  seasons?: Season[]
  summary?: string
}
