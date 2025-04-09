
import React from "react";
import Image from "next/image";
import CaptainMobile from "@/components/CaptainMobile";
import Link from "next/link";

function page() {
  return (
    <div className="h-screen w-full">
      <div className="flex justify-center items-center py-8">
      <Image src="/Icon/logo.png" alt="Logo" width={150} height={150} />

      </div>

      <div className="gap-2 px-6">
        <h3 className="font-semibold text-xl">Login Here</h3>
        <div className="h-full w-full text-xl flex flex-col gap-4 py-8 ">
        <p className="text-sm font-semibold">Phone Number</p>
          <CaptainMobile />
        </div>
        <Link href="/captain/dashboard">
            <button className="w-full h-full bg-[#6759FF] text-white border-none rounded-lg placeholder:text-base flex flex-col justify-center items-center text-base py-2 mb-5">
              Send OTP
            </button>
        </Link>
      </div>
    </div>
  );
}

export default page;



// "use client"

// import React from "react";
// import Image from "next/image";
// import CaptainMobile from "@/components/CaptainMobile";
// import Link from "next/link";

// const Page = () => {
//   return (
//     <>
//       {/* <div className="mt-6"></div> */}

//       {/* Fixed gradient background */}
//       <div className="h-full w-full bg-gradient-to-b from-[#906BFF] via-[#B484FC] to-[#FFE8D6] p-10 flex justify-center flex-col ">
//         <Image
//           src="/Icon/captain_home.png"
//           alt="captain-homepage"
//           height={380}
//           width={380}
//           className="object-cover"
//         />

//         <div className="flex justify-between flex-col gap-2">
//           <h3 className="font-semibold text-lg">Be a SevaSaathi Partner</h3>
//           <p className="font-bold text-xl">
//             We will contact you through WhatsApp
//           </p>
//         </div>
//       </div>

//       <div className="h-full w-full flex justify-center flex-col gap-2 px-6 py-4">
//         <h4>Enter a Mobile Number</h4>
//         <CaptainMobile/>
//         <Link href='/captain/signup'>
//           <button className="w-full h-full bg-[#6759FF] text-white mt-12 border-none rounded-lg placeholder:text-base flex flex-col justify-center items-center text-base py-2 ">
//             Send Request
//           </button>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Page;
