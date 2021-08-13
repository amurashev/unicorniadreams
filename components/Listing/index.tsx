import { Listing } from '../../utils/types'

import styles from './styles.module.scss'

type Props = {
  item: Listing
}

export default function ListingComponent({ item }: Props) {
  return (
    <a href={item.url} className={styles.container}>
      <div
        // data-background-image={item.mainImage.large}
        className={`${styles.imageBox}`}
        style={{
          backgroundImage: `url(${item.mainImage.large})`,
        }}
      >
        <div className={styles.imageInnerBox}>
          {/* <div className={styles.fader} /> */}
        </div>
      </div>

      <div className={styles.textBox}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.price}>${item.price}</div>
      </div>
    </a>
  )
}
