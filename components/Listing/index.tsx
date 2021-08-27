import Image from 'next/image'

import { ListingType } from '../../types'
import { IconBest } from '../Icons'

import styles from './styles.module.scss'

type Props = {
  item: ListingType
}

export default function ListingComponent({ item }: Props) {
  return (
    <a href={item.url} className={styles.container} data-id={item.id}>
      <div className={styles.imageBox}>
        {item.isBest && (
          <div className={styles.best}>
            <IconBest />
            Best Seller
            </div>
        )}
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
