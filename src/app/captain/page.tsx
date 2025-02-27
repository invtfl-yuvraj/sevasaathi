import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'

const page = () => {
  return (
    <>
    <div className='mt-6'></div>
    <Header/>
    <div className='flex flex-col items-center justify-center h-[60vh]'>
      <p className='text-3xl text-green-500 font-bold'>Coming Soon....</p>
      <Link href="/">
        <Button variant="outline" className="mt-4 bg-lightpurple text-white font-semibold">
          Go Back Home
        </Button>
      </Link>
    </div>
    </>
  )
}

export default page
