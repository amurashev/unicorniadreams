import Head from 'next/head'
import Link from 'next/link'

import styles from './collections.module.css'

import { getShop } from '../utils/etsy'
import { mapListing, mapCategory } from '../utils/data'
import { getIsCategoryShown, getIsRawListingCorrect } from '../utils/helpers'

import Layout from '../components/Layout'
import Category from '../components/Category'

export async function getStaticProps() {
  const shop = await getShop()
  const categories = shop.Sections.map(mapCategory)
    .filter(getIsCategoryShown)
    .sort((a, b) => a.order - b.order)

  return {
    props: {
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

export default function Collections({ shop, listings, categories }) {
  console.warn('props', categories)
  return (
    <div>
      <Layout>
        <Head>
          <meta name="description" content={meta.description} />
        </Head>
        <div>
          <div className={styles.categories}>
            {categories.map((item) => (
              <div key={item.id} className={styles.category}>
                <Category item={item} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  )
}
