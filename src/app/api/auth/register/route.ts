import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken } from "@/utils/auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {

    const reqBody = await req.json();
    const { name, email, password } = reqBody;

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(newUser.id);

  return NextResponse.json({ user: newUser, token }, { status: 201 });
    
  } catch (error : any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
    
  }
}

