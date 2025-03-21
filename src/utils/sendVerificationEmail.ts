import { ApiResponse } from "@/types/ApiResponse";

import VerificationEmailTemplate from "../../emails/VerificationEmailTemplate";

import { resend } from "@/lib/verifyEmail";

export async function sendVerificationEmail(
  email: string,
  verifyCode: string,
  username: string
): Promise<ApiResponse> {
  try {
     await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Sevasaathi | Verification Code",
      react : VerificationEmailTemplate({username, otp: verifyCode}),
      

    });
    return {
      success: true,
      message: "Verification Code Sent, Check your Email",
    };
  } catch (err) {
    console.log("Error sending verification Email", err);
    return {
      success: false,
      message: "Failed to send Verification Code, Try Again",
    };
  }


}




