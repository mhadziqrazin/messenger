import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser";

export default async function getConversations() {
  const currentUser = await getCurrentUser()

  if (!currentUser?.id) return []

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      orderBy: {
        lastMessageAt: 'desc'
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    })

    return conversations
  } catch (err) {
    return []
  }
}
