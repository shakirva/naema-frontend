import React from 'react'
import Wholesale from './components/Wholesale'
import Footer from '../../sections/Footer'

const page = () => {
  return (
    <section className='w-full overflow-clip'>
        <Wholesale/>
        <Footer/>
    </section>
  )
}

export default page