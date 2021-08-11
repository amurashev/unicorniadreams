import Link from 'next/link'
import styles from './styles.module.css'

type Props = {
  title?: string
  description?: string
  url?: string
  image?: string
  buttonLabel?: string
  children?: React.ReactChild
}
export default function BaseBackgroundSection({
  title,
  description,
  url,
  image,
  children,
  buttonLabel,
}: Props) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.imageBox}`}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {image && <div className={styles.fader} />}
        <div className={styles.imageInnerBox}>
          <div className={image ? styles.title : styles.titleBlack}>
            {title}
          </div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
          {url && buttonLabel && (
            <Link href={url}>
              <span className={styles.button}>{buttonLabel}</span>
            </Link>
          )}
          {children && <div className={styles.children}>{children}</div>}
        </div>
      </div>
    </div>
  )
}
