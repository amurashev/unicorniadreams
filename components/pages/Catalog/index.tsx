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

export default function Catalog({
  listing,
  category,
}: {
  listing: ListingType
  category: Category
}) {

  return (
    <div className={styles.container}>
    

    </div>
  )
}
