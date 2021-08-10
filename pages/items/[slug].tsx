import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'

import styles from './[slug].module.css'

import LISTINGS from '../../data/listings.json'
import { mapListing } from '../../utils/data'
import { getListingIdBySlug } from '../../utils/helpers'
import { getListing } from '../../utils/etsy'
import { Listing } from '../../utils/types'

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
  const similarListings = []

  return {
    props: {
      listing,
      similarListings,
    },
  }
}

export default function Item({
  listing,
  similarListings,
}: {
  listing: Listing
  similarListings: Listing[]
}) {
  console.warn('listing', listing, similarListings)
  const h1 = listing.meta ? listing.meta.h1 : listing.title

  return (
    <Layout>
      <Head>
        <title>{listing.title}</title>
        {listing.meta && (
          <meta name="description" content={listing.meta.description} />
        )}
      </Head>

      <div className={styles.content}>
        <div>
          <img className="lozad" data-src={listing.mainImage.large} />
        </div>
        <h1>{h1}</h1>
        <div className={styles.price}>${listing.price}</div>
        <div>{listing.price && <div>This item ships free.</div>}</div>
        <div>
          <a href={listing.etsyUrl} rel="noopener noreferrer" className={styles.button}>
            Buy it now on Etsy.com
          </a>
        </div>
        <div>
          <h2>Highlights</h2>
          <div>
            <div>Handmade</div>
          </div>
          <div>
            <div>Materials: {listing.materials.join()}</div>
          </div>
        </div>
        <div>
          <h2>Shipping</h2>
          Estimated arrival: <span>Aug 20-Sep 14</span>
        </div>
        <div>
          <h2>Description</h2>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: listing.description }}
          ></p>
        </div>

        <div>
          <div>Tags: {listing.tags.join()}</div>
        </div>

        <div>
          <h2>Similar items</h2>
        </div>
        <div>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
