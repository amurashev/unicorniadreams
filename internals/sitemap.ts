const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const fs = require('fs')
require('dotenv').config()

const LISTINGS = require('../data/listings.json')
const CATEGORIES = require('../data/categories.json')

const listings = Object.keys(LISTINGS).map((key) => LISTINGS[key].slug)
const categories = Object.keys(CATEGORIES).map((key) => CATEGORIES[key].slug)

const outputFilePath = './public/sitemap.xml'

let commonPages = [
  {
    url: '/',
  },
  {
    url: '/about',
  },
  {
    url: '/collections',
  },
]

commonPages = commonPages
  .concat(
    categories.map((item) => ({
      url: `/collections/${item}`,
    }))
  )
  .concat(
    listings.map((item) => ({
      url: `/item/${item}`,
    }))
  )

// Create a stream to write to
const stream = new SitemapStream({
  hostname: process.env.HOSTNAME,
})

// Return a promise that resolves with your XML string
try {
  streamToPromise(Readable.from(commonPages).pipe(stream))
    .then((data) => {
      const result = data.toString()
      fs.writeFileSync(outputFilePath, result)

      console.log(`${outputFilePath} is created`)
      console.log(commonPages)
      process.exit(0)
    })
    .catch((err) => {
      console.log(`${outputFilePath} is not created: ${err}`)
      process.exit(1)
    })
} catch (err) {
  console.log(`${outputFilePath} is not created: ${err}`)
  process.exit(1)
}
