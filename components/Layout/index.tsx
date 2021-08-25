import Head from 'next/head'
import { useRouter } from 'next/router'

import CONFIG from '../../data/config.json'

import Header from '../Header'

import styles from './styles.module.scss'



type Props = {
  children: React.ReactChild | React.ReactChild[]
  title: string
  description: string
  keywords?: string
  isLight?: boolean
}

export default function Layout({
  children,
  title,
  description,
  keywords,
  isLight,
}: Props) {
  const { asPath } = useRouter()
  const context = {
    path: asPath,
    url: `${CONFIG.host}${asPath}`,
  }
  const finalTitle = `${title} - ${CONFIG.brandName}`

  return (
    <div>
      <Head>
        <title>{finalTitle}</title>
        <meta property="og:title" content={finalTitle} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description || ''} />

        {keywords && <meta name="keywords" content={keywords} />}

        <meta property="og:type" content="website" />
        <meta property="og:url" content={context.url} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={CONFIG.brandName} />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="google-site-verification"
          content="rJnAZHvqGCMOxwOWk5kL4SBbj3baUQu96DZ6-KujDKM"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalytics.key}`}
        />
      </Head>

      <Header isLight={isLight} />
     
      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          © 2019-2021 {CONFIG.brandName}
        </div>
      </footer>
    </div>
  )
}
