"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";

const ButtonNavigation = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const navRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    if (typeof window !== "undefined") {
      lastScrollY.current = window.scrollY;
    }

    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="flex justify-around items-center"
      style={{ display: isVisible ? "flex" : "none" }}
    >
      {/* Home Icon */}
      <button>
        <Image
          src="/Icon/Home.png"
          alt="Home Icon"
          height={24}
          width={24}
        />
      </button>

      {/* Bookings */}
      <button>
        <Image
          src="/Icon/bookings_icon.png"
          alt="Bookings Icon"
          height={24}
          width={24}
        />
      </button>

      {/* Notifications Icon */}
      <button>
        <Image
          src="/Icon/notification_icon.png"
          alt="Notifications Icon"
          height={24}
          width={24}
        />
      </button>

      {/* Menu Icon */}
      <button>
        <Image
          src="/Icon/component_icon.png"
          alt="Menu Icon"
          height={24}
          width={24}
        />
      </button>
    </div>
  );
};

export default ButtonNavigation;


