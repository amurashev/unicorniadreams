import Head from 'next/head'

import META from '../data/meta.json'

import { getShop } from '../utils/etsy'
import { mapCategory } from '../utils/data'
import { getIsCategoryShown } from '../utils/helpers'

import Layout from '../components/Layout'
import Collections from '../components/pages/Collections'

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

export default function CollectionsPage({ categories }) {
  return (
    <div>
      <Layout
        title={META.collections.title}
        description={META.collections.description}
      >
        <Head>
          <meta property="og:image" content="/images/categories/32651447.jpg" />
        </Head>
        <Collections categories={categories} />
      </Layout>
    </div>
  )
}
