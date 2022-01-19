type ShowImage = {
  medium?: string
}

export type Favourite = {
  id: string
  name: string
  image?: ShowImage
}

export type Cast = {
  person: string
}

export type Season = {
  number: number
}

export type Show = {
  cast?: Cast[]
  id: string
  genres: string[]
  name: string
  image?: ShowImage
  seasons?: Season[]
  summary?: string
}
