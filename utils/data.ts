import CATEGORIES from '../data/categories.json'
import LISTINGS from '../data/listings.json'

import { Listing, Category } from '../types'
import { getIsRawListingCorrect } from './helpers'

export const mapImage = (raw: any) => {
  let image = {
    small: raw.url_75x75,
    medium: raw.url_170x135,
    large: raw.url_570xN,
    full: raw.url_fullxfull,

    sizes: {
      large: {
        width: 570,
        height: Math.round(570 * raw.full_height / raw.full_width),
      },
    }
  }

  return image
}

export const mapListing = (raw: any): Listing => {
  const fixedData = LISTINGS[raw.listing_id]

  let newListing: Listing = {
    id: raw.listing_id,
    title: raw.title,
    description: raw.description,
    isOn: false,
    isOnHome: false,
    etsyUrl: raw.url,
    price: raw.price,
    tags: raw.tags,
    views: raw.views,
    numFavorers: raw.num_favorers,
    categoryId: raw.shop_section_id,
    materials: raw.materials,
    slug: null,
    url: null,
    measurements: null,
    mainImage: null,
    images: [],
    meta: null,
    order: 0,
    // __raw: raw,
  }

  if (raw.MainImage) {
    newListing.mainImage = mapImage(raw.MainImage)
  }

  if (raw.Images) {
    newListing.images = raw.Images.map(mapImage)
  }

  if (fixedData) {
    newListing = {
      ...newListing,
      title: fixedData.meta.h1,
      isOn: fixedData.isOn,
      isOnHome: fixedData.isOnHome,
      order: fixedData.order || 0,
      measurements: fixedData.measurements || null,
      slug: fixedData.slug,
      url: '/items/' + fixedData.slug,
      meta: fixedData.meta,
    }
  }

  return newListing
}

export const mapCategory = (raw: any): Category => {
  const id = raw.shop_section_id

  let newCategory: Category = {
    id,
    title: raw.title,
    listings: [],
    isOn: false,
    slug: null,
    url: null,
    meta: null,

    // __raw: raw,
  }

  if (raw.Listings) {
    newCategory.listings = raw.Listings.filter(getIsRawListingCorrect)
      .map(mapListing)
      .filter((item) => item.isOn)
  }


  const fixedData = CATEGORIES[id]

  if (fixedData) {
    newCategory = {
      ...newCategory,
      isOn: fixedData.isOn,
      order: fixedData.order,
      title: fixedData.title,
      slug: fixedData.slug,
      url: '/collections/' + fixedData.slug,
      meta: fixedData.meta,
      mainImage: {
        // large: require(`../images/categories/${id}.jpg`).default,
        large: `/images/categories/${id}.jpg`,
      },
    }
  }
  return newCategory
}

export const mapShippingInfo = (raw: any) => {
  let data = {
    id: raw.shipping_info_id,
    currencyCode: raw.currency_code,
    destinationCountryId: raw.destination_country_id,
    destinationCountryName: raw.destination_country_name,
    listingId: raw.listing_id,
    originCountryId: raw.origin_country_id,
    originCountryName: raw.origin_country_name,
    primaryCost: raw.primary_cost,
    regionId: raw.region_id,
    secondaryCost: raw.secondary_cost,
  }

  return data
}
