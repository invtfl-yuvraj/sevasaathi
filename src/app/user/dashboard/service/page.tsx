import React from "react";
import ServiceAddCard from "@/components/ServiceAddCard";
import HeaderWithBackButton from "@/components/HeaderWithBackButton";

const page = () => {
  return (
    <div className="h-full w-screen py-4 px-6 rounded-lg bg-white flex flex-col gap-4">
      <HeaderWithBackButton />
      <div className="h-full w-full flex flex-col justify-between gap-4">
        <hr />
        <ServiceAddCard />
        <hr />
        <ServiceAddCard />
      </div>
    </div>
  );
};

export default page;
