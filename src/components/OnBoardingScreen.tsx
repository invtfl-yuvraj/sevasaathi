import React from "react";
import Image from "next/image";

interface onBoardingProps {
  imgUrl: string;
  title: string;
  subtitle: string;
}

function OnBoardingScreen({ imgUrl, title, subtitle }: onBoardingProps) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-8">
        <Image
          className=""
          src={imgUrl}
          height={400}
          width={400}
          alt="Welcome page logo"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-black text-2xl font-bold">{title}</h2>
        <p className="text-slate-600">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default OnBoardingScreen;
