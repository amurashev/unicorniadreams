import Image from 'next/image'
import Link from 'next/link'

import ListingList from '../../ListingList'
import { IconChevronLeft } from '../../Icons'
import { CATEGORIES_ID } from '../../../constants'
import pages from '../../../data/pages'
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
  const isHalloWeen = category.id === CATEGORIES_ID.HALLOWEEN

  return (
    <div className={styles.container}>
      <div className={styles.bgBox}>
        <Image
          src={category.mainImage.large}
          layout="fill"
          alt={`${category.title} image`}
        />
        <div className={styles.fader} />
        <div className={styles.imageInnerBox}>
          <div className={styles.titleBox}>
            <h1
              className={isHalloWeen ? styles.titleIsHalloWeen : styles.title}
            >
              {category.title}
            </h1>

            <p className={styles.descriptionShort}>
              {category.meta.description}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <ListingList listings={listings} />
      </div>

      <div className={styles.another}>
        <div className={styles.content}>
          <h2>Browse another collection</h2>
          <div className={styles.categories}>
            {similarCategories.slice(0, 2).map((item, key) => {
              return (
                <Link
                  key={item.id}
                  href={pages.collection.getUrl({
                    slug: item.slug,
                  })}
                >
                  <a
                    key={item.id}
                    className={
                      key === 1 ? styles.categoryIsRight : styles.category
                    }
                  >
                    <div className={styles.categoryInner}>
                      <div className={styles.arrow}>
                        <IconChevronLeft />
                      </div>
                      <div className={styles.imageBox}>
                        <Image
                          src={item.mainImage.large}
                          layout="fill"
                          alt={`${item.title} category`}
                        />
                      </div>

                      <div className={styles.textBox}>
                        <div className={styles.categoryTitle}>{item.title}</div>
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
