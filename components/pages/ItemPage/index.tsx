import { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Image from 'next/image'

import CONFIG from '../../../data/config.json'
import ListingList from '../../ListingList'
import {
  IconChevronLeft,
  IconChevronDown,
  IconGift,
  IconShipping,
} from '../../Icons'
import { CategoryType, ListingType } from '../../../types'

import styles from './styles.module.scss'
import { CATEGORIES_ID } from '../../../constants'

const Section = ({
  title,
  isShown = false,
  children,
  topContent,
  icon,
}: {
  title: string
  isShown?: boolean
  children: React.ReactNode
  topContent?: React.ReactNode
  icon?: React.ReactNode
}) => {
  const [_isShown, toggle] = useState(isShown)

  return (
    <section className={styles.sectionBox}>
      <div
        className={styles.sectionTitleBox}
        onClick={() => toggle(!_isShown)}
        role="button"
        tabIndex={0}
      >
        <div
          className={
            _isShown ? styles.sectionArrow : styles.sectionArrowRotated
          }
        >
          {_isShown ? <IconChevronDown /> : <IconChevronLeft />}
        </div>

        <h3 className={styles.sectionHeader}>{title}</h3>

        {icon && <div className={styles.sectionIcon}>{icon}</div>}
      </div>

      {_isShown && (
        <div>
          <div>{topContent}</div>
          <div className={styles.sectionText}>{children}</div>
        </div>
      )}
    </section>
  )
}

export default function ItemPage({
  listing,
  category,
  h1,
  dateFrom,
  dateTo,
  shippingCost,
  similarListings,
}: {
  listing: ListingType
  category: CategoryType
  similarListings: ListingType[]
  h1: string
  shippingCost: string
  dateFrom: string
  dateTo: string
}) {
  const handleBuyClick = () => {
    window.dataLayer.push({ event: 'item.buy', itemId: listing.id })
  }

  useEffect(() => {
    window.dataLayer.push({ event: 'item.open', itemId: listing.id })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.imagesMobile}>
        <SwipeableViews>
          {listing.images.map((item) => (
            <div key={item.id} className={styles.imageBoxMobile}>
              <div className={styles.imageBoxMobileInner}>
                <Image src={item.large} layout="fill" alt={`${h1} image`} />
              </div>
            </div>
          ))}
        </SwipeableViews>
      </div>

      <div className={styles.secondLine}>
        <div className={styles.leftSide}>
          <div className={styles.imagesDesktop}>
            {listing.images.map((item) => (
              <div key={item.id} className={styles.imageItemFull}>
                <div className={styles.imageBox}>
                  <Image
                    alt={`${h1} image`}
                    layout="intrinsic"
                    width={item.sizes.large.width}
                    height={item.sizes.large.height}
                    src={item.large}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightSideContent}>
            <section className={styles.sectionBox}>
              <h1 className={styles.title}>{h1}</h1>

              <div className={styles.price}>
                <span>$</span>
                <span>{listing.price}</span>
              </div>

              <p className={styles.descriptionShort}>
                {listing.meta.description}
              </p>
            </section>

            <a
              href={listing.etsyUrl}
              rel="noopener noreferrer"
              className={styles.button}
              onClick={() => handleBuyClick()}
            >
              Buy on Etsy.com
            </a>

            {listing.categoryId === CATEGORIES_ID.MOBILE && (
              <Section title="Details" isShown>
                <>
                  <p>
                    The price of the mobile includes 1 base with wooden hoop +
                    toys. The crib holder and music box is not included to the
                    mobile.
                  </p>
                  <p>
                    Mobile should be used only for decoration. It&apos;s not a
                    contact toy.
                  </p>
                  <p>
                    Each detail is handmade from eco-friendly and safe materials
                    with care of you and your health. Every toy is sewn with
                    great love and care. Made in a smoke-free and pet-free
                    space.
                  </p>
                </>
              </Section>
            )}

            <Section
              title="Shipping"
              topContent={
                <div>
                  <div>
                    Estimated arrival{' '}
                    <b>
                      {dateFrom} - {dateTo}
                    </b>
                  </div>
                  <div>
                    Cost to ship:{' '}
                    <b className={styles.free}>
                      {shippingCost === '0.00' ? 'Free' : `$${shippingCost}`}
                    </b>
                  </div>
                </div>
              }
              icon={<IconShipping />}
              isShown
            >
              Delivery usually takes {CONFIG.shippingDetails.transitTime.min} to{' '}
              {CONFIG.shippingDetails.transitTime.max} business days, but keep
              in mind that delivery time may be extended for some countries due
              to customs (especially holidays time). I&apos;ll give you tracking
              information once your package is shipped, so you can track your
              package.
            </Section>

            {listing.categoryId === CATEGORIES_ID.MOBILE ? (
              <Section title="Gift Wrapping" icon={<IconGift />}>
                You don&apos;t have to pay for gift wrapping. It&apos;s free!
                Every mobile is carefully packed in a beautiful craft box,
                inside there is a tissue paper and a post card with a stunning
                illustration
              </Section>
            ) : (
              <Section title="Gift" icon={<IconGift />}>
                We can ship our products directly to your gift recipient and
                would be happy to include a gift note. Please send us the text
                you would like us to use in the notes to seller field.
              </Section>
            )}

            {listing.measurements && (
              <Section title="Measurements">
                <>
                  {listing.measurements.map((item) => (
                    <div key={item.value}>
                      {item.label}:{' '}
                      <span className={styles.value2}>{item.value}</span>
                    </div>
                  ))}
                </>
              </Section>
            )}

            <Section title="Materials">
              <>{listing.materials.join(', ')}</>
            </Section>

            <Section title="Care instructions">
              Dry cleaning. Steam cleaning.
            </Section>
          </div>
        </div>
      </div>

      {similarListings && similarListings.length > 0 && (
        <div className={styles.bottomContent}>
          <div className={styles.bottomContentInner}>
            <div className={styles.bottomContentHeaderBox}>
              <h2 className={styles.bottomContentHeader}>
                You might also like
              </h2>
              <a href={category.url}>All {category.title}</a>
            </div>
            <ListingList listings={similarListings} />
          </div>
        </div>
      )}
    </div>
  )
}
