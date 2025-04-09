// components/FindServicePage.jsx
import React from "react";
import Image from "next/image";

function FindServicePage() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8">
        <Image
          className=""
          src="/Icon/Page2.png"
          height={420}
          width={420}
          alt="Welcome page logo"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-black text-2xl font-bold">Find Your Service</h2>
        <p className="text-slate-600">
        Find your service as per your preferences
        </p>
      </div>
    </div>
  );
}

export default FindServicePage;
