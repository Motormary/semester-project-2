import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from "@/app/actions/user/get"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: NextRequest) {
  const { data: userData, success } = await getCurrentUser()
  if (!success) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.text()
  const [socketId, channelName] = body.split('&').map(pair => pair.split('=')[1])

  if (!socketId || !channelName) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const presenceData = {
    user_id: userData.data.name,
    user_info: { name: userData.data.name },
  }

  try {
    const authResponse = pusherServer.authorizeChannel(socketId, channelName, presenceData)
    return NextResponse.json(authResponse)
  } catch (error) {
    console.error('Pusher auth error:', error)
    return NextResponse.json({ error: 'Pusher authentication failed' }, { status: 500 })
  }
}

