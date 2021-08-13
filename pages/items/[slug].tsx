import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Listing from '../../components/Listing'

import styles from './[slug].module.scss'

import LISTINGS from '../../data/listings.json'
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

export async function getStaticProps({ params }) {
  console.info('\n---------------------------------')

  const id = getListingIdBySlug(params.slug)
  const data = await getListing(id)
  const listing = mapListing(data)

  console.info('\nListing is fetched: ', params.slug)
  console.info('\n---------------------------------')
  await sleep(2000)

  const shippingInfoList = await getListingShippingInfo(id)
  console.info('\nListing shipping info is fetched: ', params.slug)
  console.info('\n---------------------------------')
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
    console.info('\nSection is fetched: ', listing.categoryId)
    console.info('\n---------------------------------')
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
  const h1 = listing.meta ? listing.meta.h1 : listing.title
  const arrival = 'Aug 27-Sep 14' // TODO

  return (
    <Layout>
      <Head>
        <title>Buy handmade {listing.title} - Unicornia Dreams</title>
        {listing.meta && (
          <>
            <meta name="description" content={listing.meta.description} />
            <meta name="keywords" content={listing.tags.join()} />
          </>
        )}
      </Head>

      <div className={styles.content}>
        <div className={styles.imageBox}>
          <img
            src={listing.mainImage.large}
            alt={`${h1} image`}
            className={`lozad`}
          />
        </div>
        <div className={styles.firstLine}>
          <div className={styles.titleBox}>
            <h1 className={styles.title}>{h1}</h1>
            <div className={styles.price}>${listing.price}</div>
          </div>
          <div>
            <a
              href={listing.etsyUrl}
              rel="noopener noreferrer"
              className={styles.button}
            >
              Buy it now on Etsy.com
            </a>
          </div>
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
              __html: `<!--googleoff: all--> <!--noindex-->${listing.description} <!--/noindex--> <!--googleon: all-->'`,
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
      </div>
    </Layout>
  )
}
