import Head from 'next/head'
import Link from 'next/link'

import styles from './index.module.css'

import { getShop } from '../utils/etsy'
import { mapListing, mapCategory } from '../utils/data'
import { getIsCategoryShown, getIsRawListingCorrect } from '../utils/helpers'

import Layout from '../components/Layout'
import Listing from '../components/Listing'
import Category from '../components/Category'
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

const meta = {
  title: 'UnicorniaDreams: Magic home decor & baby toys',
  description: `Hello! My name is Alena! 
    All my life I lived in a huge noisy metropolis, but my soul always dreamed of the sea. 
    And then my family and I decided to move to the small sunny town of Anapa. 
    This city is located on the shores of the Black Sea and it is the best place for creativity!`,
}

export default function Home({ shop, listings, categories }) {
  console.warn('props', shop, categories, listings)
  return (
    <div>
      <Layout>
        <Head>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Head>

        <BaseBackgroundSection
          title="Collections"
          description="Welcome to world of stuffed toys Welcome to world of stuffed toys Welcome to world of stuffed toys Welcome to world of stuffed toys"
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
          description="Hello! My name is Alena! All my life I lived in a huge noisy metropolis, but my soul always dreamed of the sea. And then my family and I decided to move to the small sunny town of Anapa. This city is located on the shores of the Black Sea and it is the best place for creativity!"
          image="/images/about.jpg"
          url="/about"
          buttonLabel="Read story"
        />
      </Layout>
    </div>
  )
}
