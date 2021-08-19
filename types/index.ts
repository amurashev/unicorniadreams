import { CATEGORIES_ID } from "../constants"

export type Image = {
  small: string
  medium: string
  large: string
  full: string
}

export type ShippingInfo = {
  id: number
  currencyCode: string
  destinationCountryId: null | number
  destinationCountryName: string
  listingId: number
  originCountryId: number
  originCountryName: string
  primaryCost: string
  regionId: null
  secondaryCost: string
}

export type Listing = {
  id: number
  title: string
  description: string
  price: string
  isOn: boolean
  etsyUrl: string
  tags: string[]
  views: number
  numFavorers: number
  categoryId: CATEGORIES_ID
  mainImage?: Image
  shippingInfo?: {
    isFree: boolean
    primaryCost: string
  }
  images?: Image[]
  materials: string[]
  measurements?: {
    label: string
    value: string
  }[]
  url?: string
  slug?: string
  isOnHome?: boolean
  order?: number
  meta?: {
    h1: string
    description: string
    keywords: string[]
    title: string
  }
}

export type Category = {
  id: CATEGORIES_ID
  isOn: boolean
  title: string
  url?: string
  slug?: string
  order?: number
  mainImage?: {
    large: string
  }
  listings: Listing[]
  meta?: {
    h1: string
    description: string
    title: string
  }
}
