import Head from 'next/head'

import styles from './about.module.scss'

import META from '../data/meta.json'
import Layout from '../components/Layout'

export default function About() {
  return (
    <div>
      <Layout
        title={META.about.title}
        description={META.about.description}
      >
        <Head>
          <meta
            property="og:image"
            content={'/images/about.jpg'}
          />
        </Head>

        <div className={styles.content}>
          <h1>My story</h1>

          <p>{META.about.content.full}</p>
        </div>
      </Layout>
    </div>
  )
}
