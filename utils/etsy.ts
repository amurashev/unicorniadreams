import request from './request'
import { convertObjectToGetString } from './string'

const API_URL = 'https://openapi.etsy.com/v2'
const API_KEY = process.env.ETSY_API_KEY_STRING
const SHOP_ID = '21006026'

const EtsyRequest = async (url: string, data?: {}) => {
  const newData = {
    api_key: API_KEY,
    ...data,
  }

  const getParams = convertObjectToGetString(newData)

  return await request(`${API_URL}${url}?${getParams}`)
}

export const getShop = async () => {
  const data = {
    includes: ['Listings/MainImage', 'Sections', 'FAQ', 'About', 'User'].join(
      ','
    ),
  }

  const response = await EtsyRequest(`/shops/${SHOP_ID}`, data)

  return response.results[0]
}

export const getShopSection = async (sectionId: number) => {
  const data = {
    includes: ['Listings/MainImage'].join(','),
  }

  const response = await EtsyRequest(
    `/shops/${SHOP_ID}/sections/${sectionId}`,
    data
  )

  return response.results[0]
}


export const getShopListings = async () => {
  const data = {
    includes: ['MainImage'].join(','),
    limit: 75,
  }

  const response = await EtsyRequest(
    `/shops/${SHOP_ID}/listings/active`,
    data
  )

  return response.results
}


export const getListing = async (listingId: number) => {
  const data = {
    includes: ['MainImage', 'Images'].join(','),
  }

  const response = await EtsyRequest(`/listings/${listingId}`, data)

  return response.results[0]
}


export const getListingShippingInfo = async (listingId: number) => {
  const data = {
    includes: [''].join(','),
  }

  const response = await EtsyRequest(`/listings/${listingId}/shipping/info`, data)

  return response.results
}