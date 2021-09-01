import Head from 'next/head'
import META from '../data/meta.json'

import { getShopActiveListings } from '../utils/etsy'
import { mapListing, mapCategory } from '../utils/data'
import { getIsRawListingCorrect } from '../utils/helpers'

import Layout from '../components/Layout'
import Home from '../components/pages/Home'

const TOP_LISTINGS = [
  969814943, // Ocean Surfing Mobile / Surfer VW bus mobile / Boho nursery
  983175476, // Wisteria baby crib mobile / Floral Flower mobile
  1060388164, // Halloween Pumpkin Brooch
  1063515762, // Bat Decor Halloween / Realistic Bat Decoration
  969809095, // Adventures Baby Crib Mobile / VW Bus Mobile / Boho nursery
  1037428102, // Sloth Nursery Decor Garland / Animal Felt Decorations
  992823456, // Unicorn Baby Mobile / White Horse Crib
  1033701556, // Personalised Nursery Decor Name Garland
  1053972795, // Moth Felt Decoration / Butterfly Wall Decor
  947720516, // Seagull Mobile / Ocean Nursery
  992830432, // Crane baby crib mobile / Swan and Wizard mobile
]

export async function getStaticProps() {
  const listings = await getShopActiveListings()

  const listingsObject = {}

  listings.filter(getIsRawListingCorrect).forEach((item) => {
    listingsObject[item.listing_id] = item
  })

  const topListings = TOP_LISTINGS.map((id) =>
    listingsObject[id] ? mapListing(listingsObject[id]) : undefined
  ).filter((item) => item)

  return {
    props: {
      listings: topListings,
    },
  }
}

export default function HomePage({ listings }) {
  return (
    <div>
      <Layout
        title={META.home.title}
        description={META.home.description}
        isLight
      >
        <Head>
          <meta
            property="og:image"
            content={'/images/categories/32651447.jpg'}
          />
        </Head>

        <Home listings={listings} />
      </Layout>
    </div>
  )
}
