import Image from 'next/image'

import ListingList from '../../../components/ListingList'
import { CategoryType, ListingType } from '../../../types'

import styles from './styles.module.scss'

export default function Catalog({
  category,
  listings,
  similarCategories,
}: {
  category: CategoryType
  listings: ListingType[]
  similarCategories: CategoryType[]
}) {
  return (
    <div className={styles.container}>
      <div className={styles.bgBox}>
        <Image
          src={category.mainImage.large}
          layout="fill"
          alt={`${category.title} image`}
        />
        <div className={styles.fader}></div>
        <div className={styles.imageInnerBox}>
          <div className={styles.titleBox}>
            <h1 className={styles.title}>{category.title}</h1>

            <p className={styles.descriptionShort}>
              {category.meta.description}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <ListingList listings={listings} />
      </div>
    </div>
  )
}
