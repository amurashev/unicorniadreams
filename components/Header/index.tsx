import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'

import CONFIG from '../../data/config.json'
import PAGES from '../../data/pages'

type Props = {
  isLight?: boolean
}

export default function Header({ isLight }: Props) {
  return (
    <header className={!isLight ? styles.header : styles.headerIsLight}>
      <div className={styles.headerInner}>
        <Link href={PAGES.index.getUrl()}>
          <a className={styles.headerImage}>
            <Image
              // className=""
              src="/images/unicornia_logo_70.jpg"
              // srcSet="/images/unicornia_logo_140.jpg 2x, /images/unicornia_logo_210.jpg 3x"
              alt={`${CONFIG.brandName} logo`}
              width={48}
              height={48}
            />
          </a>
        </Link>

        <Link href={PAGES.index.getUrl()}>
          <a className={styles.brandBox}>
            <div className={styles.siteName}>{CONFIG.brandName}</div>
          </a>
        </Link>

        <nav className={styles.menuBox}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href={CONFIG.etsyLink}>
                <a target="_blank" rel="noopener noreferrer">
                  Etsy shop
                </a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href={PAGES.collections.getUrl()}>
                <a>Collections</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href={PAGES.about.getUrl()}>
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
