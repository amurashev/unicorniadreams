import Image from 'next/image'

import Listing from '../../../components/Listing'

import { Listing as ListingType } from '../../../types'

import styles from './styles.module.scss'

export default function ItemPageV1({
  listing,
  h1,
  dateFrom,
  dateTo,
  similarListings,
}: {
  listing: ListingType
  similarListings: ListingType[]
  h1: string
  dateFrom: string
  dateTo: string
}) {
  return (
    <div className={styles.content}>
      <div className={styles.leftSide}>
        <div className={styles.imageItemFull}>
          <div className={styles.imageBox}>
            <Image
              layout="fill"
              src={listing.images[0].full}
              // style={{
              //   backgroundImage: `url(${listing.images[0].full})`,
              // }}
            />
          </div>
        </div>
      </div>
      <div className={styles.rightSide}>
        <section className={styles.titleBox}>
          <h1 className={styles.title}>{h1}</h1>
          <div className={styles.price}>
            <span>$</span>
            <span>{listing.price}</span>
          </div>
          <div>
            The price of the mobile includes 1 base with wooden hoop + toys. The
            crib holder and music box is not included to the mobile.
          </div>
          <p className={styles.descriptionShort}>{listing.meta.description}</p>
        </section>
        <section className={styles.highlightsBox}>
          <a
            href={listing.etsyUrl}
            rel="noopener noreferrer"
            className={styles.button}
          >
            Buy
          </a>
        </section>

        <section className={styles.highlightsBox}>
          <h2>Shipping</h2>
          <ul>
            <li>
              Estimated arrival:{' '}
              <span>
                {dateFrom} - {dateTo}
              </span>
            </li>

            <li>
              Delivery usually takes 10 to 20 business days, but keep in mind
              that delivery time may be extended for some countries due to
              customs (especially holidays time). I’ll give you tracking
              information once your package is shipped, so you can track your
              package.
            </li>
          </ul>
        </section>

        <section className={styles.highlightsBox}>
          <h2>Measurements</h2>
          <div>
            <div>The diameter of the ring is 18 cm/7 inches</div>
            <div>Full length ~ 40 cm/15,7 inches</div>
            <div>Dino size - 15 cm/5,9 inches</div>
          </div>
        </section>

        <section className={styles.highlightsBox}>
          <h2>Materials</h2>
          <div>{listing.materials.join(', ')}</div>
        </section>

        <section className={styles.highlightsBox}>
          <h2>Gift Wrapping</h2>
          <div>
            You don't have to pay for gift wrapping. It’s free! Every mobile is
            carefully packed in a beautiful craft box, inside there is a tissue
            paper and a post card with a stunning illustration
          </div>
        </section>

        <section className={styles.highlightsBox}>
          <h2>Details</h2>
          <div>
            Each detail is handmade from eco-friendly and safe materials with
            care of you and your health. Every toy is sewn with great love and
            care. Made in a smoke-free and pet-free space.
          </div>
        </section>

        <section className={styles.highlightsBox}>
          <h2>Care instructions</h2>
          <div>Dry cleaning. Steam cleaning.</div>
        </section>

        <section className={styles.highlightsBox}>
          <h2>Tags</h2>
          {listing.meta.keywords && (
            <div>{listing.meta.keywords.join(', ')}</div>
          )}
        </section>
      </div>

      <div className={styles.bottomContent}>
        {similarListings && similarListings.length > 0 && (
          <>
            <div className={styles.highlightsBox}>
              <h2>YOU MIGHT ALSO LIKE</h2>
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
