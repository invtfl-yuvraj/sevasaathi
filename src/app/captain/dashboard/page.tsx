import ButtonNavigation from '@/components/ButtonNavigation'
import DashboardFooter from '@/components/DashboardFooter'
import React from 'react'

function page() {
  return (
    <div>
        <div className='fixed h-16 w-full bottom-0 left-0 right-0 z-10'>
            <ButtonNavigation/> 
        </div>
    </div>
  )
}

export default page