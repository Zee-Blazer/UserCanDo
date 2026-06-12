'use client';

import React from 'react'
import { Footer, Header } from '../../../components/layout'
import { InvestmentWebinars } from '../../../components/investment-webinars/investment-webinars'

const page = () => {
  return (
    <div>
          <Header />
          <InvestmentWebinars />
          <Footer />
    </div>
  )
}

export default page
