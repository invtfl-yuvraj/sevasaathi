import React, { ReactNode } from "react";
import Header from "@/components/Header";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-cover bg-white bg-top xs:px-10 md:px-16">
      {/* <Header /> */}
      <div className="">
        <div className="">{children}</div>
      </div>
    </main>
  );
};

export default layout;
