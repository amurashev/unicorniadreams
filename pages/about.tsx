import Head from 'next/head'

import styles from './about.module.css'

import META from '../data/meta.json'
import Layout from '../components/Layout'

export default function About() {
  return (
    <div>
      <Layout>
        <Head>
          <title>{META.about.title}</title>
          <meta name="description" content={META.about.description} />
        </Head>

        <div className={styles.content}>
          <h1>My story</h1>

          <p>{META.about.content.full}</p>
        </div>
      </Layout>
    </div>
  )
}
