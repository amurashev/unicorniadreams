import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Image from 'next/image'

import { CATEGORIES_ID } from '../../../constants'
import CONFIG from '../../../data/config.json'
import PAGES from '../../../data/pages'
import { ListingType } from '../../../types'

import ListingList from '../../../components/ListingList'
import BackgroundBox from '../../../components/BackgroundBox'
import TextAndBackground from '../../../components/TextAndBackground'
import { IconChevronDown } from '../../../components/Icons'

import styles from './styles.module.scss'

export default function Home({ listings }: { listings: ListingType[] }) {
  return (
    <div className={styles.box}>
      <BackgroundBox
        alt={`todo`}
        image={'/images/categories/32651447.jpg'}
        hasFader
      >
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
            alt="Unicornia Dreams"
            image={'/images/categories/32651447.jpg'}
            title="My story"
            linkLabel="Read my story"
            linkHref={PAGES.about.getUrl()}
            description={
              <>
                <p>Welcome to Unicornia!</p>
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

        <div className={styles.listing}>
          <div className={styles.section}>
            <section>
              <h2>Shop Our Favourites</h2>
              <ListingList listings={listings} />
            </section>
          </div>
        </div>

        <div className={styles.section}>
          <TextAndBackground
            isRight
            alt="Unicornia dreams collection"
            image={'/images/about.jpg'}
            title="Collections"
            linkLabel="See collection"
            linkHref={PAGES.collections.getUrl()}
            description="Long before a cookbook is cracked—even before farmers sow their fields—plant breeders write recipes for our ingredients. The problem? Too often, they are asked to select for yield, shelf life and uniformity at the expense of good food, nutrition and our environment. What if, instead, we started with what’s delicious?"
          />
        </div>
      </div>
    </div>
  )
}
