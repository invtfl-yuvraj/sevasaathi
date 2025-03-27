"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import { generateVerifyCode } from "@/utils/auth";
import VerificationEmailTemplate from "../../../emails/VerificationEmailTemplate";

function page() {
    function clickHandler() {
        // console.log(generateVerifyCode());
        console.log()
    }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Button onClick={clickHandler}>Hello</Button>
    </div>
  );
}

export default page;
