import React from "react";
import BackButton from "@/components/BackButton";

interface Props {
  title: string;
}

function HeaderWithBackButton({ title }: Props) {
  return (
    <div className="w-full flex flex-col gap-6">
      <BackButton />
      <div className="h-10 w-full flex items-center gap-2">
        <div className="h-8 w-1 rounded-xl bg-[#CABDFF]"></div>
        <h2 className="font-semibold text-2xl">{title}</h2>
      </div>
    </div>
  );
}

export default HeaderWithBackButton;
