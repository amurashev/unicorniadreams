import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

type Props = {
  alt: string
  image: string
  title?: string
  isRight?: boolean
  linkLabel?: string
  linkHref?: string
  description: React.ReactNode
}
export default function TextAndBackground({
  alt,
  image,
  title,
  description,
  linkLabel,
  linkHref,
  isRight,
}: Props) {
  return (
    <section className={isRight ? styles.boxIsRight : styles.box}>
      <div className={isRight ? styles.imageBoxIsRight : styles.imageBox}>
        <div className={styles.imageInnerBox}>
          {linkLabel ? (
            <Link href={linkHref}>
              <a>
                <Image src={image} layout="fill" alt={alt} />
              </a>
            </Link>
          ) : (
            <Image src={image} layout="fill" alt={alt} />
          )}
        </div>
      </div>
      <div className={styles.textBox}>
        <div className={isRight ? styles.titleBoxIsRight : styles.titleBox}>
          {title && (
            <h2 className={isRight ? styles.titleIsRight : styles.title}>
              {title}
            </h2>
          )}

          <div className={styles.text}>{description}</div>

          {linkLabel && (
            <Link href={linkHref}>
              <a className={styles.link}>{linkLabel}</a>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
