import { route } from '../utils/routing'

const pages = {
  index: route('/'),
  about: route('/about'),
  collections: route('/collections'),
  collection: route('/collections/[slug]'),
  items: route('/items/[slug]'),
}

export default pages