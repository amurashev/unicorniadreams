import CONFIG from '../../../data/config.json'
import PAGES from '../../../data/pages'
import { ListingType } from '../../../types'

import ListingList from '../../ListingList'
import BackgroundBox from '../../BackgroundBox'
import TextAndBackground from '../../TextAndBackground'
import { IconChevronDown } from '../../Icons'

import styles from './styles.module.scss'

export default function Home({ listings }: { listings: ListingType[] }) {
  return (
    <div className={styles.box}>
      <BackgroundBox alt="todo" image="/images/main-bg.jpg" hasFader>
        <div className={styles.bgContent}>
          <div className={styles.headerSite}>
            <div className={styles.siteName}>{CONFIG.brandName}</div>
            <div className={styles.slogan}>Magic home decor & baby toys</div>
          </div>
          <div className={styles.arrowBox}>
            <IconChevronDown
              className={styles.arrow}
              onClick={() => {
                document.getElementById('firstContent').scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }}
            />
          </div>
        </div>
      </BackgroundBox>

      <div className={styles.content} id="firstContent">
        <div className={styles.section}>
          <TextAndBackground
            alt="Unicornia dreams collection"
            image="/images/about.jpg"
            title="Collections"
            linkLabel="See collection"
            linkHref={PAGES.collections.getUrl()}
            description={
              <>
                <p>
                  Here is our collection. I create plush sea animals and baby
                  mobiles. And I hope our toys and decor will delight you and
                  your baby
                </p>
              </>
            }
          />
        </div>

        <div className={styles.listing}>
          <div className={styles.section}>
            <section>
              <h2>Shop Our Favourites</h2>
              <div className={styles.listingsBox}>
                <ListingList listings={listings} />
              </div>
            </section>
          </div>
        </div>

        <div className={styles.section}>
          <TextAndBackground
            isRight
            alt="Unicornia Dreams"
            image="/images/about_2.jpg"
            title="My story"
            linkLabel="Read my story"
            linkHref={PAGES.about.getUrl()}
            description={
              <>
                <p>
                  My name is Alena! All my life I lived in a huge noisy
                  metropolis, but my soul always dreamed of the sea. And then my
                  family and I decided to move to the small sunny town of Anapa.
                  This city is located on the shores of the Black Sea and it is
                  the best place for creativity!
                </p>
              </>
            }
          />
        </div>
      </div>
    </div>
  )
}
