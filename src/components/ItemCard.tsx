import React from "react";

const SqaureCard = () => {
  return (
    <div className="h-full w-full flex flex-col justify-between gap-2">
      {/* Image for sqaure div */}
      <div className="w-20 aspect-square bg-gray-300 rounded-lg"></div>

      <div>
        {/* Service Title */}
        <h3 className="font-semibold ">Plumbing</h3>
        <p>₹200</p>
      </div>
    </div>
  );
};

export default SqaureCard;
