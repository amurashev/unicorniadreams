import Head from 'next/head'

import META from '../data/meta.json'
import Layout from '../components/Layout'
import About from '../components/pages/About'

export default function AboutPage() {
  return (
    <div>
      <Layout title={META.about.title} description={META.about.description}>
        <Head>
          <meta property="og:image" content="/images/about.jpg" />
        </Head>

        <About />
      </Layout>
    </div>
  )
}
