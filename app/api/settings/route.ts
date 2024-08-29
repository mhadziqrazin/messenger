import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body  = await req.json()
    const { name, image } = body

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        image,
        name
      }
    })

    return NextResponse.json(updatedUser)
  } catch (err) {
    console.log(err, 'ERROR_SETTINGS')
    return new NextResponse('Internal server error', { status: 500 })
  }
}
