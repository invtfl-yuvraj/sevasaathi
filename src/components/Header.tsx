import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="">

      <Image
        src="/logo.png"
        alt="Header Image"
        width={150}
        height={300}
      />
      
    </header>
  );
};

export default Header;
