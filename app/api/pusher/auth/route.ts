// app/api/pusher/auth/route.ts

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/app/libs/pusher";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let socketId: string | null = null;
  let channel: string | null = null;

  const contentType = req.headers.get("content-type");
  console.log(req)

  if (contentType === "application/json") {
    // Handle JSON data
    const body = await req.json();
    socketId = body.socket_id;
    channel = body.channel_name;
  } else if (contentType === "application/x-www-form-urlencoded") {
    // Handle URL-encoded data
    const formData = await req.formData();
    socketId = formData.get("socket_id") as string | null;
    channel = formData.get("channel_name") as string | null;
  }

  if (!socketId || !channel) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  const data = { user_id: session.user.email };
  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return NextResponse.json(authResponse);
}
