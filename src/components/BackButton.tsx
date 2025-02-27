"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
    >
        <IoArrowBackOutline className="font-bold text-3xl" />
      
    </button>
  );
};

export default BackButton;
