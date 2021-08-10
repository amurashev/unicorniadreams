import Head from 'next/head'

import styles from './index.module.css'

import META from '../data/meta.json'

import { getShop } from '../utils/etsy'
import { mapListing, mapCategory } from '../utils/data'
import { getIsCategoryShown, getIsRawListingCorrect } from '../utils/helpers'

import Layout from '../components/Layout'
import Listing from '../components/Listing'
import BaseBackgroundSection from '../components/BaseBackgroundSection'

export async function getStaticProps() {
  const shop = await getShop()
  const listings = shop.Listings.filter(getIsRawListingCorrect)
    .map(mapListing)
    .filter((item) => item.isOnHome)
  const categories = shop.Sections.map(mapCategory)
    .filter(getIsCategoryShown)
    .sort((a, b) => a.order - b.order)

  return {
    props: {
      shop,
      listings,
      categories,
    },
  }
}

export default function Home({ shop, listings, categories }) {
  console.warn('props', shop, categories, listings)
  return (
    <div>
      <Layout>
        <Head>
          <title>{META.home.title}</title>
          <meta name="description" content={META.home.description} />
        </Head>

        <BaseBackgroundSection
          title="Collections"
          description={META.home.content.collections}
          image="/images/categories/32651447.jpg"
          url="/collections"
          buttonLabel="See collections"
        />

        <BaseBackgroundSection title="Popular Items">
          <div className={styles.listings}>
            {listings.map((item) => (
              <div key={item.id} className={styles.listing}>
                <Listing item={item} />
              </div>
            ))}
          </div>
        </BaseBackgroundSection>

        <BaseBackgroundSection
          title="My story"
          description={META.about.content.short}
          image="/images/about.jpg"
          url="/about"
          buttonLabel="Read story"
        />
      </Layout>
    </div>
  )
}
