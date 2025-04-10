import React from 'react'
import Image from 'next/image'

function PaymentGateway() {
  return (
    <div>
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              className=""
              src="/Icon/Page4.png"
              height={420}
              width={420}
              alt="Welcome page logo"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-black text-2xl font-bold">Payment Gateway</h2>
            <p className="text-slate-600">
            Choose the preferable options of payment
and get best service
            </p>
          </div>
        </div>
  )
}

export default PaymentGateway