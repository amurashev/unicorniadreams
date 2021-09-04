import Link from 'next/link'

import styles from './styles.module.scss'

export default function Custom404() {
  return (
    <div className={styles.content}>
      <div className={styles.number}>404</div>
      <h1>Page not found</h1>
      <p className={styles.quote}>
        “The horizon defines the limits you cannot reach.”
      </p>
      <Link href="/">
        <a>Back to shop</a>
      </Link>
    </div>
  )
}
