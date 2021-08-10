import { Category } from '../../utils/types'
import BaseBackgroundSection from '../BaseBackgroundSection'
import styles from './styles.module.css'

type Props = {
  item: Category
}

export default function CategoryComponent({ item }: Props) {
  return (
    <BaseBackgroundSection
      title={item.title}
      description={item.meta.description}
      image={item.mainImage.large}
      url={item.url}
      buttonLabel="Explore the collection"
    />
  )
}
