import React, { ReactNode } from "react";
import Header from "@/components/Header";
import "remixicon/fonts/remixicon.css";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-cover bg-white bg-top p-5 xs:px-10 md:px-16">
      <Header />
      <div className="mx-auto max-w-full">
        <div className="mt-20 mb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
