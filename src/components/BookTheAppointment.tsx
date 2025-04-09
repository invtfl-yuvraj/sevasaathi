import React from "react";
import Image from "next/image";

function BookTheAppointment() {
  return (
    <div>
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              className=""
              src="/Icon/Page3.png"
              height={420}
              width={420}
              alt="Welcome page logo"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-black text-2xl font-bold">Book The Appointment</h2>
            <p className="text-slate-600">
            Book your services on your own time 
            </p>
          </div>
        </div>
  );
}

export default BookTheAppointment;
