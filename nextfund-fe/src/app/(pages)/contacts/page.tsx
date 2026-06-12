'use client';

import React from 'react'
import { Footer, Header } from '../../../components/layout'
import { GetInTouch } from '../../../components/contacts/get-in-touch'

const page = () => {
  return (
    <div>
          <Header />
          <GetInTouch />
          <Footer />
    </div>
  )
}

export default page
