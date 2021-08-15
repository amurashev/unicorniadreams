import Head from 'next/head'

import styles from './collections.module.css'

import META from '../data/meta.json'

import { getShop } from '../utils/etsy'
import { mapCategory } from '../utils/data'
import { getIsCategoryShown } from '../utils/helpers'

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

export default function Collections({ categories }) {
  return (
    <div>
      <Layout
        title={META.collections.title}
        description={META.collections.description}
      >
        <Head>
          <meta
            property="og:image"
            content={'/images/categories/32651447.jpg'}
          />
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
