import React, { ReactNode } from "react";
import Header from "@/components/Header";
import 'remixicon/fonts/remixicon.css'




const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-cover bg-green-100 bg-top px-5 xs:px-10 md:px-16">
      <div className="mx-auto max-w-full">
        <Header/>
        <div className="mt-20 mb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;

