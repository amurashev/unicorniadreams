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
  categoryId: number
  mainImage?: Image
  shippingInfo?: {
    isFree: boolean
    primaryCost: string
  }
  images?: Image[]
  materials: string[]
  url?: string
  slug?: string
  isOnHome?: boolean
  order?: number
  meta?: {
    h1: string
    description: string
    title: string
  }
}

export type Category = {
  id: number
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
