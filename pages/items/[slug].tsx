import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Listing from '../../components/Listing'

import styles from './[slug].module.css'

import LISTINGS from '../../data/listings.json'
import { mapListing, mapCategory } from '../../utils/data'
import { getListingIdBySlug } from '../../utils/helpers'
import { getListing, getShopSection } from '../../utils/etsy'
import { Category, Listing as ListingType } from '../../utils/types'

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

export async function getStaticProps({ params }) {
  const id = getListingIdBySlug(params.slug)
  const data = await getListing(id)
  const listing = mapListing(data)

  const section = await getShopSection(listing.categoryId)
  const category = mapCategory(section)
  const listings = category.listings

  let indexOfCurrentElement = 0
  listings.forEach((item, i) => {
    if (item.id === id) {
      indexOfCurrentElement = i
    }
  })

  const similarListings = [
    ...category.listings.slice(indexOfCurrentElement),
    ...category.listings.slice(0, indexOfCurrentElement),
  ].slice(1, 4)

  return {
    props: {
      listing,
      category,
      similarListings,
    },
  }
}

export default function Item({
  listing,
  category,
  similarListings,
}: {
  listing: ListingType
  category: Category
  similarListings: ListingType[]
}) {
  const h1 = listing.meta ? listing.meta.h1 : listing.title
  const arrival = 'Aug 20-Sep 14' // TODO

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
        <div>
          <img
            src={listing.mainImage.large}
            alt={`${h1} image`}
            className={`lozad`}
          />
        </div>
        <h1>{h1}</h1>
        <div className={styles.price}>${listing.price}</div>
        <div>{listing.price && <div>This item ships free.</div>}</div>
        <div>
          <a
            href={listing.etsyUrl}
            rel="noopener noreferrer"
            className={styles.button}
          >
            Buy it now on Etsy.com
          </a>
        </div>
        <div>
          <h2>Highlights</h2>
          <div>
            <div>Handmade</div>
          </div>
          <div>
            <div>Materials: {listing.materials.join(', ')}</div>
          </div>
        </div>
        <div>
          <h2>Shipping</h2>
          Estimated arrival: <span>{arrival}</span>
        </div>
        <div>
          <h2>Description</h2>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: `<!--googleoff: all--> <!--noindex-->${listing.description} <!--/noindex--> <!--googleon: all-->'`,
            }}
          ></p>
        </div>

        <div>
          <div>Tags: {listing.tags.join(', ')}</div>
        </div>

        <div>
          <h2>Similar items</h2>
          <div className={styles.listings}>
            {similarListings.map((item) => (
              <div key={item.id} className={styles.listing}>
                <Listing item={item} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Link href={category.url}>
            <a>Back to collection</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
