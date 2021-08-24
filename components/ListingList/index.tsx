import Listing from '../Listing'
import { ListingType } from '../../types'

import styles from './styles.module.scss'

type Props = {
  listings: ListingType[]
}

export default function ListingList({ listings }: Props) {
  return (
    <div className={styles.list}>
      {listings.map((item) => (
        <div key={item.id} className={styles.item}>
          <Listing item={item} />
        </div>
      ))}
    </div>
  )
}
