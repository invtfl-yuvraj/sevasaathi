// import prisma from "@/lib/prisma";
// import { User } from "@/types/User";
// import { comparePassword, hashPassword } from "@/utils/auth";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();
//     // check whether the email or password already exists
//     if (!email || !password) {
//       return Response.json({ sucess: false, message: "User doesn't exists" });
//     }

//     // find the user using email
//     const existingUser: User | null = await prisma.user.findUnique({
//       where: { email },
//     });


//     // if the user doesnt exist give the response as User not found
//     if (!existingUser) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 400 }
//       );
//     }

//     // If password doesn't match
//     const isPasswordValid = await comparePassword(
//       password,
//       existingUser.password
//     );
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, message: "Incorrect password" },
//         { status: 401 }
//       );
//     }

//     if (!existingUser.isVerified) {
//       return Response.json(
//         { success: false, message: "Email not verified. Please verify first." },
//         { status: 403 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Login Successful",
//         user: {
//           id: existingUser.id,
//           username: existingUser.username,
//           email: existingUser.email,
//         },
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Error during Login", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error occurred during Login",
//       },
//       { status: 500 }
//     );
//   }
// }
