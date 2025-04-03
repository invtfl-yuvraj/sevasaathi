import prisma from "@/lib/prisma";
import { User } from "@/types/User";
import { generateVerifyCode, hashPassword } from "@/utils/auth";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    console.log(username, email, password);

    if (!username || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "Invalid request. Missing required fields.",
        },
        { status: 400 }
      );
    }

    const existingUser: User | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }
    
    const hashedPassword = await hashPassword(password);

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const verifyCode = generateVerifyCode();

    //   creating a new user
    const createUser = await prisma.user.create({
      data: {
        email: email || " ",
        password: hashedPassword || " ",
        username: username || " ",
        verifyCodeExpiry: expiryDate,
        verifyCode,
        isVerified: false,
      },
    });

    //   sending a verification email
    const emailResponse = await sendVerificationEmail(
      email,
      verifyCode,
      username,
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        user: createUser,
        success: true,
        message: "User Created Successfully. " + emailResponse.message,
      },
      { status: 201 }
    );
    //   console.log(createUser);
  } catch (err) {
    console.log("Error while registering user", err);

    return Response.json(
      { success: false, message: "Error occured while registering user" },
      { status: 500 }
    );
  }
}