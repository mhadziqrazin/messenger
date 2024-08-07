import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return new NextResponse('Missing required field', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (err) {
    console.error(err, 'REGISTRATION ERROR')
    if (err instanceof PrismaClientKnownRequestError
      && err.code === 'P2002'
    ) {
      return new NextResponse('Email already registered', { status: 400 })
    }
    return new NextResponse('Internal server error', { status: 500 })
  }
}
