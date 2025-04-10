import CaptainButtonNavigation from '@/components/CaptainButtonNavigation'
import EditCaptainProfile from '@/components/EditCaptainProfile'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col gap-8'>
        <EditCaptainProfile/>
        <CaptainButtonNavigation/>
    </div>
  )
}

export default page