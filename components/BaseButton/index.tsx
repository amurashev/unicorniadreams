import styles from './styles.module.css'

type Props = {
  title?: string
}

export default function BaseButton({ title }: Props) {
  return <div className={styles.container}></div>
}
