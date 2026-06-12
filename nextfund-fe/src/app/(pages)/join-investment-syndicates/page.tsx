'use client';

import React from 'react'
import { Footer, Header } from '../../../components/layout'
import { JoinInvestmentSyndicates } from '../../../components/join-investment-syndicates/join-investment-syndicates'

const page = () => {
  return (
    <div>
          <Header />
          <JoinInvestmentSyndicates />
          <Footer />
    </div>
  )
}

export default page
