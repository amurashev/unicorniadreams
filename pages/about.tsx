import Head from 'next/head'
import Link from 'next/link'

import styles from './about.module.css'

import Layout from '../components/Layout'

const meta = {
  title: 'UnicorniaDreams: Magic home decor & baby toys',
  description: `Hello! My name is Alena! 
    All my life I lived in a huge noisy metropolis, but my soul always dreamed of the sea. 
    And then my family and I decided to move to the small sunny town of Anapa. 
    This city is located on the shores of the Black Sea and it is the best place for creativity!`,
}

export default function About() {
  return (
    <div>
      <Layout>
        <Head>
          <meta name="description" content={meta.description} />
        </Head>

        <h1>My story</h1>
      </Layout>
    </div>
  )
}
