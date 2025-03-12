import React from 'react'
import Image from 'next/image'
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { GrBook } from "react-icons/gr";

function CaptainHeader() {
  return (
    <div className=''>

        <div className='flex justify-between items-center'>
            <div className='bg-[#FFFFFF] flex justify-center items-center px-4 py-1 rounded-xl gap-1'>Offline <div className='h-3 w-3 rounded-full bg-gray-500'></div></div>
            <div className='flex justify-center items-center gap-4'>
                <div className='bg-[#FFFFFF] flex justify-center items-center px-4 py-1 rounded-xl gap-1'><div><GrBook /></div>English</div>
                <div>
                <MdOutlineKeyboardVoice className='text-2xl'/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default CaptainHeader