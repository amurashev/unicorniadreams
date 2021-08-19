import CATEGORIES from '../data/categories.json'
import LISTINGS from '../data/listings.json'

import { Category } from '../types'

export const getIsRawListingCorrect = (item: any): boolean =>
  item.state === 'active'

export const getListingIdBySlug = (slug: string): number => {
  const id = Object.keys(LISTINGS).find((key) => LISTINGS[key].slug === slug)
  return Number(id)
}

export const getIsCategoryShown = (cat: Category): boolean => cat.isOn

export const getCategoryIdBySlug = (slug: string): number => {
  const id = Object.keys(CATEGORIES).find(
    (key) => CATEGORIES[key].slug === slug
  )

  return Number(id)
}
