const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const fs = require('fs')
require('dotenv').config()

const LISTINGS = require('../data/listings.json')
const CATEGORIES = require('../data/categories.json')
const CONFIG = require('../data/config.json')

const listings = Object.keys(LISTINGS)
  .filter((key) => LISTINGS[key].isOn)
  .map((key) => LISTINGS[key].slug)
const categories = Object.keys(CATEGORIES)
  .filter((key) => CATEGORIES[key].isOn)
  .map((key) => CATEGORIES[key].slug)

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
      url: `/items/${item}`,
    }))
  )

const hostName = process.env.HOSTNAME || CONFIG.host

console.log(`Start creating of sitemap for: ${hostName}`)
console.log(`Output path: ${outputFilePath}`)
console.log(`List of required pages: `)
console.log(commonPages)
console.log(`\n`)

try {
  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: hostName,
  })

  // Return a promise that resolves with your XML string
  try {
    streamToPromise(Readable.from(commonPages).pipe(stream))
      .then((data) => {
        const result = data.toString()
        fs.writeFileSync(outputFilePath, result)

        console.log(`${outputFilePath} is created: `)
        console.log(result)
        process.exit(0)
      })
      .catch((err) => {
        console.log(
          `${outputFilePath} is not created (streamToPromise): ${err}`
        )
        process.exit(1)
      })
  } catch (err) {
    console.log(`${outputFilePath} is not created (streamToPromise): ${err}`)
    process.exit(1)
  }
} catch (err) {
  console.log(`${outputFilePath} is not created (SitemapStream): ${err}`)
  process.exit(1)
}
