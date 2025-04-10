import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "Email and Code are required." },
        { status: 400 }
      );
    }

    const decodedEmail = decodeURIComponent(email);

    const user = await prisma.user.findUnique({
      where: {
        email: decodedEmail,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = user.verifyCodeExpiry && user.verifyCodeExpiry > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // ✅ Update user verification status
      await prisma.user.update({
        where: { email: decodedEmail },
        data: { isVerified: true, verifyCode: null, verifyCodeExpiry: null },
      });

      return NextResponse.json(
        { success: true, message: "User verified successfully." },
        { status: 200 }
      );
    }

    if (isCodeValid && !isCodeNotExpired) {
      return NextResponse.json(
        { success: false, message: "Verification code has expired." },
        { status: 400 }
      );
    }

    if (!isCodeValid && isCodeNotExpired) {
      return NextResponse.json(
        { success: false, message: "Verification code is invalid." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Verification failed." },
      { status: 400 }
    );

  } catch (error) {
    console.error("Error occurred while verifying the code", error);
    return NextResponse.json(
      { success: false, message: "Server error during verification." },
      { status: 500 }
    );
  }
}
