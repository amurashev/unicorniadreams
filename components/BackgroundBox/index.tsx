import React from 'react'
import Image from 'next/image'

import styles from './styles.module.scss'

type Props = {
  alt: string
  image: string
  hasFader?: boolean
  children?: React.ReactNode
}
export default function BackgroundBox({
  alt,
  image,
  hasFader,
  children,
}: Props) {
  return (
    <div className={styles.bgBox}>
      <Image src={image} layout="fill" alt={alt} />
      {hasFader && <div className={styles.fader}></div>}
      
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
