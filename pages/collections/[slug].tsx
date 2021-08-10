import Head from 'next/head'
import Link from 'next/link'

import styles from './[slug].module.css'

import Layout from '../../components/Layout'
import Listing from '../../components/Listing'
import CategoryHeader from '../../components/CategoryHeader'

import CATEGORIES from '../../data/categories.json'

import { getShopSection, getShop } from '../../utils/etsy'
import { mapCategory } from '../../utils/data'
import {
  getCategoryIdBySlug,
  getIsCategoryShown,
} from '../../utils/helpers'
import { Category, Listing as ListingType } from '../../utils/types'

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

  const listings = category.listings

  const shop = await getShop()
  const similarCategories = shop.Sections.map(mapCategory)
    .filter((item) => item.id !== categoryId)
    .filter(getIsCategoryShown)
    .sort((a, b) => a.order - b.order)

  return {
    props: {
      category,
      listings,
      similarCategories,
    },
  }
}

export default function Item({
  category,
  listings,
  similarCategories,
}: {
  category: Category
  listings: ListingType[]
  similarCategories: Category[]
}) {
  return (
    <Layout>
      <Head>
        <title>Buy handmade {category.meta.title} - Unicornia Dreams</title>
        <meta name="description" content={category.meta.description} />
      </Head>
      <CategoryHeader item={category} />

      <div className={styles.content}>
        <div className={styles.listings}>
          {listings.map((item) => (
            <div key={item.id} className={styles.listing}>
              <Listing item={item} />
            </div>
          ))}
        </div>
        <div>
          <h2>Another collections</h2>
          <div>
            {similarCategories.map((item) => (
              <div key={item.id}>
                <Link href={item.url}>{item.title}</Link>
              </div>
            ))}
          </div>
        </div>
        <Link href="/collections">
          <a>Back to collections</a>
        </Link>
      </div>
    </Layout>
  )
}
