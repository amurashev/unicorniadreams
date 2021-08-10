import Head from 'next/head'
import Link from 'next/link'

import styles from './[slug].module.css'

import Layout from '../../components/Layout'
import Listing from '../../components/Listing'
import CategoryHeader from '../../components/CategoryHeader'

import CATEGORIES from '../../data/categories.json'

import { getShopSection } from '../../utils/etsy'
import { mapCategory, mapListing } from '../../utils/data'
import {
  getCategoryIdBySlug,
  getIsRawListingCorrect,
} from '../../utils/helpers'

export async function getStaticPaths() {
  const categories = Object.keys(CATEGORIES).map((key) => CATEGORIES[key].slug)

  const paths = categories.map((item) => ({
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
  const categoryId = getCategoryIdBySlug(params.slug)
  const section = await getShopSection(categoryId)
  const category = mapCategory(section)

  // const listings = category.listings.filter(getIsRawListingCorrect)
  //   .map(mapListing)
  //   .filter((item) => item.isOnHome);

  const similarCategories = []

  // console.warn("getStaticProps", params, categoryId, section);

  return {
    props: {
      category,
      similarCategories,
    },
  }
}

export default function Item({ category, similarCategories }) {
  console.warn('cat page', category, similarCategories)

  return (
    <Layout>
      <Head>
        <title>{category.meta.title}</title>
        <meta name="description" content={category.meta.description} />
      </Head>
      <CategoryHeader item={category} />

      <div className={styles.content}>
        <div className={styles.listings}>
          {category.listings.map((item) => (
            <div key={item.id} className={styles.listing}>
              <Listing item={item} />
            </div>
          ))}
        </div>
        <div>
          <h2>Another collections</h2>
        </div>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>
    </Layout>
  )
}
