import { Listing } from '../../utils/types'

import styles from './styles.module.css'

type Props = {
  item: Listing
}

export default function ListingComponent({ item }: Props) {
  return (
    <a href={item.url} className={styles.container}>
      <div
        data-background-image={item.mainImage.large}
        className={`${styles.imageBox} lozad`}
      >
        <div className={styles.imageInnerBox}>
          <div className={styles.fader} />
          <div className={styles.title}>{item.title}</div>
        </div>
      </div>
    </a>
  )
}
