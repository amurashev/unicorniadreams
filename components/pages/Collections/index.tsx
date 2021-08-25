import TextAndBackground from '../../../components/TextAndBackground'

import { CategoryType } from '../../../types'
import PAGES from '../../../data/pages'

import styles from './styles.module.scss'

export default function Collections({
  categories,
}: {
  categories: CategoryType[]
}) {
  return (
    <div className={styles.content}>
      {categories.map((item, key) => (
        <div className={key % 2 === 1 ? styles.boxBg : null}>
          <div className={styles.section}>
            <TextAndBackground
              key={key}
              isRight={key % 2 === 1}
              alt={`todo`}
              image={item.mainImage.large}
              title={item.title}
              linkLabel="See collection"
              linkHref={PAGES.collection.getUrl({
                slug: item.slug,
              })}
              description={<p>{item.meta.description}</p>}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
