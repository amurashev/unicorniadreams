import CATEGORIES from '../data/categories.json'
import LISTINGS from '../data/listings.json'

import { Listing, Category } from './types'
import { getIsRawListingCorrect } from './helpers'

export const mapImage = (raw: any) => {
  let image = {
    small: raw.url_75x75,
    medium: raw.url_170x135,
    large: raw.url_570xN,
    full: raw.url_fullxfull,
  }

  return image
}

export const mapListing = (raw: any): Listing => {
  const fixedData = LISTINGS[raw.listing_id]

  let newListing: Listing = {
    id: raw.listing_id,
    title: raw.title,
    description: raw.description,
    isOn: true,
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
    mainImage: null,
    images: [],
    meta: null,
    // __raw: raw,
  }

  if (raw.MainImage) {
    newListing.mainImage = mapImage(raw.MainImage)
  }

  if (raw.ShippingInfo) {
    const shippingInfoMain = raw.ShippingInfo.find(
      (item) => !item.destination_country_id
    )
    newListing.shippingInfo = {
      // TODO: Check
      isFree: shippingInfoMain.primary_cost === '0.00',
      primaryCost: shippingInfoMain.primary_cost,
    }
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
    mainImage: {
      large: `/images/categories/${id}.jpg`,
    },
    meta: null,

    // __raw: raw,
  }

  if (raw.Listings) {
    newCategory.listings = raw.Listings.filter(getIsRawListingCorrect).map(
      mapListing
    )
  }

  const fixedData = CATEGORIES[raw.shop_section_id]

  if (fixedData) {
    newCategory = {
      ...newCategory,
      isOn: fixedData.isOn,
      order: fixedData.order,
      slug: fixedData.slug,
      url: '/collections/' + fixedData.slug,
      meta: fixedData.meta,
      title: fixedData.meta.title,
    }
  }
  return newCategory
}
