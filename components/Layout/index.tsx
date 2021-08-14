import Head from 'next/head'
import Link from 'next/link'

import styles from './styles.module.scss'

const meta = {
  title: 'UnicorniaDreams: Magic home decor & baby toys',
}

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
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
        <meta name="google-site-verification" content="rJnAZHvqGCMOxwOWk5kL4SBbj3baUQu96DZ6-KujDKM" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BH4EFRY18K" />
      </Head>
      <header className={styles.header}>
        <a href="/" className={styles.headerLink}>
          <div className={styles.headerImage}>
            <img
              className=""
              src="https://i.etsystatic.com/isla/7739c0/47421985/isla_180x180.47421985_ap4d2bp2.jpg?version=0"
              srcSet="https://i.etsystatic.com/isla/7739c0/47421985/isla_500x500.47421985_ap4d2bp2.jpg?version=0 500w,
                    https://i.etsystatic.com/isla/7739c0/47421985/isla_280x280.47421985_ap4d2bp2.jpg?version=0 280w,
                    https://i.etsystatic.com/isla/7739c0/47421985/isla_180x180.47421985_ap4d2bp2.jpg?version=0 180w,
                    https://i.etsystatic.com/isla/7739c0/47421985/isla_75x75.47421985_ap4d2bp2.jpg?version=0 75w"
              sizes="(min-width: 900px) 18vw, 30vw"
              alt="UnicorniaDreams logo"
              width={70}
              height={70}
            />
          </div>

          <div className={styles.headerSite}>
            <div className={styles.siteName}>UnicorniaDreams</div>
            <div className={styles.slogan}>Magic home decor & baby toys</div>
          </div>
        </a>
      </header>
      <main className={styles.content}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>© 2019-2021 UnicorniaDreams</div>
      </footer>
    </div>
  )
}
