import Head from 'next/head'

import Layout from '../../components/Layout'
import Catalog from '../../components/pages/Catalog'

import CATEGORIES from '../../data/categories.json'

import { getShopSection, getShop } from '../../utils/etsy'
import { mapCategory } from '../../utils/data'
import { getCategoryIdBySlug, getIsCategoryShown } from '../../utils/helpers'
import { CategoryType, ListingType } from '../../types'

export async function getStaticPaths() {
  const categories = Object.keys(CATEGORIES)
    .filter((key) => CATEGORIES[key].isOn)
    .map((key) => CATEGORIES[key].slug)

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

  const listings = category.listings.sort((a, b) => +b.isBest - +a.isBest)

  const shop = await getShop()
  let similarCategories = shop.Sections.map(mapCategory)
    .filter(getIsCategoryShown)
    .sort((a, b) => a.order - b.order)

  let indexOfCurrentElement = 0
  similarCategories.forEach((item, i) => {
    if (item.id === categoryId) {
      indexOfCurrentElement = i
    }
  })

  const prevIndex =
    indexOfCurrentElement === 0
      ? similarCategories.length - 1
      : indexOfCurrentElement - 1
  const nextIndex =
    indexOfCurrentElement === similarCategories.length - 1
      ? 0
      : indexOfCurrentElement + 1

  similarCategories = [
    similarCategories[prevIndex],
    similarCategories[nextIndex],
  ]

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
  category: CategoryType
  listings: ListingType[]
  similarCategories: CategoryType[]
}) {
  return (
    <Layout
      title={`Buy ${category.meta.title} handmade`}
      description={category.meta.description}
    >
      <Head>
        {category.mainImage.large && (
          <meta property="og:image" content={category.mainImage.large} />
        )}
      </Head>

      <Catalog
        category={category}
        listings={listings}
        similarCategories={similarCategories}
      />
    </Layout>
  )
}
