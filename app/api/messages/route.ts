import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import { pusherServer } from "@/app/libs/pusher"

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const {
      message,
      image,
      conversationId
    } = body

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUser.id }
        },
        seen: {
          connect: { id: currentUser.id }
        }
      },
      include: {
        seen: true,
        sender: true
      }
    })

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: newMessage.createdAt,
        messages: {
          connect: { id: newMessage.id }
        },
      },
      include: {
        users: true,
        messages: {
          include: { seen: true }
        }
      }
    })

    await pusherServer.trigger(conversationId, 'messages:new', newMessage)

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
        lastMessageAt: lastMessage.createdAt
      })
    })

    return NextResponse.json(newMessage)
  } catch (err) {
    console.log(err)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
