import Head from 'next/head'

import Layout from '../../components/Layout'
import ItemPage from '../../components/pages/ItemPage'

import LISTINGS from '../../data/listings.json'
import CONFIG from '../../data/config.json'
import { mapListing, mapCategory, mapShippingInfo } from '../../utils/data'
import { getListingIdBySlug } from '../../utils/helpers'
import {
  getListing,
  getShopSection,
  getListingShippingInfo,
} from '../../utils/etsy'
import { CategoryType, ListingType, ShippingInfo } from '../../types'

export async function getStaticPaths() {
  const listings = Object.keys(LISTINGS)
    .filter((key) => LISTINGS[key].isOn)
    .map((key) => LISTINGS[key].slug)

  const paths = listings.map((item) => ({
    params: {
      slug: item,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getStaticProps(context) {
  const { params } = context
  const id = getListingIdBySlug(params.slug)
  const data = await getListing(id)
  const listing = mapListing(data)
  await sleep(2000)

  const shippingInfoList = await getListingShippingInfo(id)
  await sleep(2000)

  const shippingInfoRaw = shippingInfoList.find(
    (item) => !item.destination_country_id
  )
  const shippingInfo = shippingInfoRaw
    ? mapShippingInfo(shippingInfoRaw)
    : undefined

  let category = null
  let similarListings = []

  if (listing.categoryId) {
    const section = await getShopSection(listing.categoryId)
    await sleep(2000)

    category = mapCategory(section)
    const listings = category.listings

    let indexOfCurrentElement = 0
    listings.forEach((item, i) => {
      if (item.id === id) {
        indexOfCurrentElement = i
      }
    })

    similarListings = [
      ...listings.slice(indexOfCurrentElement),
      ...listings.slice(0, indexOfCurrentElement),
    ].slice(1, 5)
  }

  return {
    props: {
      listing,
      shippingInfo,
      category,
      similarListings,
    },
  }
}

export default function Item({
  listing,
  shippingInfo,
  category,
  similarListings,
}: {
  listing: ListingType
  shippingInfo: ShippingInfo
  category?: CategoryType
  similarListings: ListingType[]
}) {
  const today = new Date()
  const from = new Date()
  const to = new Date()

  const daysCountFrom = CONFIG.shippingDetails.transitTime.min
  const daysCountTo = CONFIG.shippingDetails.transitTime.max

  const options = { month: 'short' as 'short', day: 'numeric' as 'numeric' }
  const dateFrom = new Intl.DateTimeFormat('en-US', options).format(
    from.setDate(today.getDate() + daysCountFrom)
  )
  const dateTo = new Intl.DateTimeFormat('en-US', options).format(
    from.setDate(to.getDate() + daysCountTo)
  )

  const isFree = shippingInfo && shippingInfo.primaryCost === '0.00'
  const h1 = listing.meta ? listing.meta.h1 : listing.title

  // TODO: Site rating count
  const schema: any = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: listing.title,
    image: listing.mainImage.large,
    images: listing.images.map((item) => item.large),
    description: listing.description,
    brand: {
      '@type': 'Brand',
      name: CONFIG.brandName,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      reviewCount: '24',
    },
    offers: {
      '@type': 'Offer',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: listing.etsyUrl,
      offerCount: '1',
      price: listing.price,
      priceCurrency: 'USD',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: CONFIG.shippingDetails.handlingTime.min,
            maxValue: CONFIG.shippingDetails.handlingTime.max,
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: CONFIG.shippingDetails.transitTime.min,
            maxValue: CONFIG.shippingDetails.transitTime.max,
          },
        },
      },
    },
  }

  if (shippingInfo && shippingInfo.primaryCost) {
    schema.offers.shippingDetails.shippingRate = {
      '@type': 'MonetaryAmount',
      value: isFree ? 0 : shippingInfo.primaryCost,
      currency: 'USD',
    }
  }

  return (
    <Layout
      title={`Buy ${listing.title}`}
      description={listing.meta ? listing.meta.description : ''}
      keywords={listing.tags.join(', ')}
    >
      <Head>
        {listing.mainImage && (
          <meta property="og:image" content={listing.mainImage.large} />
        )}
      </Head>

      <div>
        <ItemPage
          listing={listing}
          category={category}
          similarListings={similarListings}
          h1={h1}
          dateFrom={dateFrom}
          dateTo={dateTo}
          shippingCost={shippingInfo && shippingInfo.primaryCost}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </div>
    </Layout>
  )
}
