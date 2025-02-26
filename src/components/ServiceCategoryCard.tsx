import React from "react";
import Image from "next/image";

interface Props {
  iconSrc: string;
  bgColor: string;
  imageAltText: string;
  text: string;
  height: number;
  width: number;
}

const ServiceCard: React.FC<Props> = ({
  iconSrc,
  bgColor,
  imageAltText,
  text,
  height = 24,
  width = 24,
}) => {
  return (
    <div className="h-full w-full flex flex-col items-center">
      <div
        style={{ backgroundColor: bgColor }}
        className="w-full aspect-square rounded-full flex justify-center items-center"
      >
        <Image src={iconSrc} height={height} width={width} alt={imageAltText} />
      </div>
      <p className="text-xs mt-2">{text}</p>
    </div>
  );
};

export default ServiceCard;
