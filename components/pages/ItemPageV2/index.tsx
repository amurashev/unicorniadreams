import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Image from 'next/image'

import Listing from '../../../components/Listing'
import {
  IconChevronLeft,
  IconChevronDown,
  IconGift,
  IconShipping,
} from '../../../components/Icons'
import { Category, Listing as ListingType } from '../../../types'

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
  children: React.ReactChild
  topContent?: React.ReactChild
  icon?: React.ReactChild
}) => {
  const [_isShown, toggle] = useState(isShown)

  return (
    <section className={styles.sectionBox}>
      <div className={styles.sectionTitleBox} onClick={() => toggle(!_isShown)}>
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

export default function ItemPageV1({
  listing,
  category,
  h1,
  dateFrom,
  dateTo,
  shippingCost,
  similarListings,
}: {
  listing: ListingType
  category: Category
  similarListings: ListingType[]
  h1: string
  shippingCost: string
  dateFrom: string
  dateTo: string
}) {
  const mainImage = listing.images[0].full

  return (
    <div className={styles.container}>
      <div
        className={styles.bgBox}
        style={{
          backgroundImage: `url(${mainImage})`,
        }}
      >
        <div className={styles.imageInnerBox}>
          <div className={styles.titleBox}>
            <h1 className={styles.title}>{h1}</h1>

            {/* <div className={styles.price}>
              <span>$</span>
              <span>{listing.price}</span>
            </div> */}

            <p className={styles.descriptionShort}>
              {listing.meta.description}
            </p>
            <a
              href={listing.etsyUrl}
              rel="noopener noreferrer"
              className={styles.button}
            >
              Buy on Etsy.com
            </a>
          </div>
        </div>
      </div>

      <div className={styles.secondLine}>
        <div className={styles.leftSide}>
          <div className={styles.imagesMobile}>
            <SwipeableViews>
              {listing.images.map((item, key) => (
                <div key={key} className={styles.imageBoxMobile}>
                  <div key={key} className={styles.imageBoxMobileInner}>
                    <div
                      // className="lozad"
                      // TODO srcSet
                      style={{
                        backgroundImage: `url(${item.large})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </SwipeableViews>
          </div>
          <div className={styles.imagesDesktop}>
            {listing.images.map((item, key) => (
              <div key={key} className={styles.imageItemFull}>
                <div className={styles.imageBox}>
                  <img
                    className="lozad"
                    // layout="fill"
                    // width="100%"
                    // height="100%"
                    src={item.large}
                    // TODO srcSet
                    // style={{
                    //   backgroundImage: `url(${listing.images[0].full})`,
                    // }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.rightSide}>
          <section className={styles.sectionBox}>
            <div className={styles.price}>
              <span>$</span>
              <span>{listing.price}</span>
            </div>

            {listing.categoryId === CATEGORIES_ID.MOBILE && (
              <div className={styles.sectionText}>
                The price of the mobile includes 1 base with wooden hoop + toys.
                The crib holder and music box is not included to the mobile.
              </div>
            )}
          </section>

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
            Delivery usually takes 10 to 20 business days, but keep in mind that
            delivery time may be extended for some countries due to customs
            (especially holidays time). I’ll give you tracking information once
            your package is shipped, so you can track your package.
          </Section>

          {listing.categoryId === CATEGORIES_ID.MOBILE ? (
            <Section title="Gift Wrapping" isShown icon={<IconGift />}>
              You don't have to pay for gift wrapping. It’s free! Every mobile
              is carefully packed in a beautiful craft box, inside there is a
              tissue paper and a post card with a stunning illustration
            </Section>
          ) : (
            <Section title="Gift" isShown icon={<IconGift />}>
              We can ship our products directly to your gift recipient and would
              be happy to include a gift note. Please send us the text you would
              like us to use in the notes to seller field.
            </Section>
          )}

          {listing.measurements && (
            <Section title="Measurements">
              <>
                {listing.measurements.map((item) => (
                  <div>
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

          <Section title="Details">
            Each detail is handmade from eco-friendly and safe materials with
            care of you and your health. Every toy is sewn with great love and
            care. Made in a smoke-free and pet-free space.
          </Section>

          <Section title="Care instructions">
            Dry cleaning. Steam cleaning.
          </Section>

          <a
            href={listing.etsyUrl}
            rel="noopener noreferrer"
            className={styles.button}
          >
            Buy on Etsy.com
          </a>
        </div>
      </div>

      <div className={styles.bottomContent}>
        {similarListings && similarListings.length > 0 && (
          <>
            <div className={styles.highlightsBox}>
              <div className={styles.bottomContentHeaderBox}>
                <h2 className={styles.bottomContentHeader}>
                  You might also like
                </h2>
                <a href={category.url}>All {category.title}</a>
              </div>
              <div className={styles.listings}>
                {similarListings.map((item) => (
                  <div key={item.id} className={styles.listing}>
                    <Listing item={item} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
