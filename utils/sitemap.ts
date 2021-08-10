const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const fs = require('fs')

const LISTINGS = require('../data/listings.json')
const CATEGORIES = require('../data/categories.json')
const CONFIG = require('../next.config')

const listings = Object.keys(LISTINGS).map((key) => LISTINGS[key].slug)
const categories = Object.keys(CATEGORIES).map((key) => CATEGORIES[key].slug)

const outputFile = './sitemap.xml'

let commonPages = [
  {
    url: '/',
    // changefreq: "daily",
    // priority: 0.3,
  },
  {
    url: '/contacts',
    // changefreq: "daily",
    // priority: 0.3,
  },
]

commonPages = commonPages
  .concat(
    categories.map((item) => ({
      url: `/${item}`,
      // changefreq: "daily",
      // priority: 0.3,
    }))
  )
  .concat(
    listings.map((item) => ({
      url: `/item/${item}`,
      // changefreq: "daily",
      // priority: 0.3,
    }))
  )

// Create a stream to write to
const stream = new SitemapStream({
  hostname: CONFIG.HOSTNAME,
})

// Return a promise that resolves with your XML string
try {
  streamToPromise(Readable.from(commonPages).pipe(stream))
    .then((data) => {
      const result = data.toString()
      fs.writeFileSync(outputFile, result)

      console.log(`${outputFile} is created`, commonPages)
      process.exit(0)
    })
    .catch((err) => {
      console.log(`${outputFile} is not created: ${err}`)
      process.exit(1)
    })
} catch (err) {
  console.log(`${outputFile} is not created: ${err}`)
  process.exit(1)
}
