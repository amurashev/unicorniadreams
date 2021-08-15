import Head from 'next/head'

import Layout from '../../components/Layout'
import Listing from '../../components/Listing'

import styles from './[slug].module.scss'

import LISTINGS from '../../data/listings.json'
import CONFIG from '../../data/config.json'
import { mapListing, mapCategory, mapShippingInfo } from '../../utils/data'
import { getListingIdBySlug } from '../../utils/helpers'
import {
  getListing,
  getShopSection,
  getListingShippingInfo,
} from '../../utils/etsy'
import {
  Category,
  Listing as ListingType,
  ShippingInfo,
} from '../../utils/types'

export async function getStaticPaths() {
  const listings = Object.keys(LISTINGS).map((key) => LISTINGS[key].slug)

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

  let category
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
    ].slice(1, 4)
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
  category?: Category
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
  const arrival = `${dateFrom} - ${dateTo}`

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
      value: shippingInfo.primaryCost === '0.00' ? 0 : shippingInfo.primaryCost,
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
        <meta name="keywords" content={listing.tags.join(', ')} />

        {listing.mainImage && (
          <meta property="og:image" content={listing.mainImage.large} />
        )}
      </Head>

      <div className={styles.content}>
        <div className={styles.imageListMobile}>
          <div className={styles.imageItemFull}>
            <div className={styles.imageBox}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${listing.images[0].large})`,
                }}
                itemProp="image"
              />
            </div>
          </div>
        </div>
        <div className={styles.imageListDesktop}>
          {listing.images[0] && (
            <div className={styles.imageItemFirst}>
              <div className={styles.imageBox}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${listing.images[0].large})`,
                  }}
                />
              </div>
            </div>
          )}

          {listing.images[1] && (
            <div className={styles.imageItemSecond}>
              <div className={styles.imageBox}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${listing.images[1].large})`,
                  }}
                />
              </div>
            </div>
          )}

          <div className={styles.list}>
            {listing.images[2] && (
              <div className={styles.imageItem}>
                <div className={styles.imageBox}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${listing.images[2].large})`,
                    }}
                  />
                </div>
              </div>
            )}

            {listing.images[3] && (
              <div className={styles.imageItem}>
                <div className={styles.imageBox}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${listing.images[3].large})`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          {listing.images[4] && (
            <div className={styles.imageItemSecond}>
              <div className={styles.imageBox}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${listing.images[4].large})`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.firstLine}>
          <div className={styles.titleBox}>
            <h1 className={styles.title}>{h1}</h1>
            <div className={styles.price}>
              <span>$</span>
              <span>{listing.price}</span>
            </div>
          </div>
          <div className={styles.buttonBox}>
            <a
              href={listing.etsyUrl}
              rel="noopener noreferrer"
              className={styles.button}
            >
              Buy it now on Etsy.com
            </a>
          </div>
        </div>

        <div className={styles.buttonBoxMobile}>
          <a
            href={listing.etsyUrl}
            rel="noopener noreferrer"
            className={styles.button}
          >
            Buy it now on Etsy.com
          </a>
        </div>

        <div className={styles.lineBox} />

        <div className={styles.highlightsBox}>
          <h2>Shipping</h2>
          <ul>
            {shippingInfo && shippingInfo.primaryCost === '0.00' && (
              <li>
                Shipping cost: <span>Free</span>
              </li>
            )}

            <li>
              Estimated arrival: <span>{arrival}</span>
            </li>
          </ul>
        </div>

        <div className={styles.lineBox} />

        <div className={styles.highlightsBox}>
          <h2>Highlights</h2>
          <ul>
            <li>
              <div>Handmade</div>
            </li>
            <li>
              <div>Materials: {listing.materials.join(', ')}</div>
            </li>
            <li>
              <div>Tags: {listing.tags.join(', ')}</div>
            </li>
          </ul>
        </div>

        <div className={styles.lineBox} />

        <div className={styles.highlightsBox}>
          <h2>Description</h2>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: `${listing.description}`,
            }}
          ></p>
        </div>

        {similarListings && similarListings.length > 0 && (
          <>
            <div className={styles.lineBox} />

            <div className={styles.highlightsBox}>
              <h2>Similar items</h2>
              <div className={styles.listings}>
                {similarListings.map((item) => (
                  <div key={item.id} className={styles.listing}>
                    <Listing item={item} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {category && (
          <div className={styles.backLinkBox}>
            <a href={category.url} className={styles.backLink}>
              Back to category
            </a>
          </div>
        )}
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
