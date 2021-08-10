import { Category } from '../../utils/types'
import styles from './styles.module.css'
import BaseBackgroundSection from '../BaseBackgroundSection'

type Props = {
  item: Category
}

export default function CategoryComponent({ item }: Props) {
  return (
    <BaseBackgroundSection
      title={item.title}
      description={item.meta.description}
      image={item.mainImage.large}
    />
  )
}
