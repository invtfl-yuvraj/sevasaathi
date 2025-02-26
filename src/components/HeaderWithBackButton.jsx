import React from "react";
import BackButton from "@/components/BackButton";

function HeaderWithBackButton() {
  return (
    <div className="w-full flex flex-col gap-6">
      <BackButton />
      <div className="h-10 w-full flex items-center gap-2">
        <div className="h-8 w-1 rounded-xl bg-[#FFA3A3]"></div>
        <h2 className="font-semibold text-xl">AC Repair</h2>
      </div>
    </div>
  );
}

export default HeaderWithBackButton;
