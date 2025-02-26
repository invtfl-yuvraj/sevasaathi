import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import "../login/page";
import { Inter } from "next/font/google";
import SearchBar from "@/components/SearchBar";
import "@/styles/hideScrollbar.css";
import ItemCard from "@/components/ItemCard";
import ServiceCategoryList from "@/components/ServiceCategoryList";
import ButtonNavigation from "@/components/ButtonNavigation";
import DashboardFooter from "@/components/DashboardFooter";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const page = () => {
  const searchPlaceholder = "Search what you need...";

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>

      <div className="bg-gray-100 w-full flex flex-col justify-between gap-2">
        <div className="bg-white px-6 flex flex-col justify-between py-4 gap-2 h-full w-full rounded-b-lg">
          <DashboardHeader />
          <header className="mt-4 flex flex-col justify-between gap-2">
            <h2 className="text-[#666C89] font-sans">HELLO 👋</h2>
            <h2 className="text-2xl font-bold text-dashboardfontcolor tracking-wide">
              What are you looking for today?
            </h2>
          </header>
          <SearchBar searchPlaceholder={searchPlaceholder} />
        </div>

        <ServiceCategoryList />

        <div className="h-full w-full py-4 px-6 rounded-lg bg-white">
          <div className="h-full w-full flex gap-2">
            <div className="h-6 w-1 rounded-xl bg-[#FFA3A3]"></div>
            <h2 className="">Most Booked Services</h2>
          </div>

          <div className="h-full w-full flex gap-4 py-4 overflow-scroll scroll-smooth scrollbar-hide">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>

        <div className="h-full w-full py-4 px-6 rounded-lg bg-white">
          <div className="h-full w-full flex gap-2">
            <div className="h-6 w-1 rounded-xl bg-[#A3B2FF]"></div>
            <h2 className="">Our Top Partners</h2>
          </div>

          <div className="h-full w-full flex gap-4 py-4 overflow-scroll scroll-smooth scrollbar-hide">
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </div>
        </div>

        <div className="bg-[#B6B6D6]">
          {/* logo */}
          <div>
            <img src="/Icon/download_logo.png" alt="" />
          </div>

          {/* description */}
          <div></div>

          {/* For Partners */}

          <div></div>

          {/* company */}
          <div></div>

          {/* legal */}

          <div></div>
        </div>

        <div className="fixed h-16 w-full bottom-0 left-0 right-0 z-10">
          <ButtonNavigation />
        </div>

        <div>
          <DashboardFooter />
        </div>
      </div>
    </>
  );
};

export default page;
