import Image from 'next/image'

import { ListingType } from '../../types'

import styles from './styles.module.scss'

type Props = {
  item: ListingType
}

export default function ListingComponent({ item }: Props) {
  return (
    <a href={item.url} className={styles.container}>
      <div className={styles.imageBox}>
        <Image
          src={item.mainImage.large}
          layout="fill"
          alt={`${item.title} image`}
        />
      </div>

      <div className={styles.textBox}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.price}>${item.price}</div>
      </div>
    </a>
  )
}
