type ShowImage = {
  medium?: string
}

export type Favourite = {
  id: number
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
  id: number
  genres: string[]
  name: string
  image?: ShowImage
  seasons?: Season[]
  summary?: string
}
