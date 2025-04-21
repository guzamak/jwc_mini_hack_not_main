import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

type Params = {
  params: {
    secretkey: string
    id: string
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { secretkey, id } = params

  if (secretkey !== process.env.SECRETKEY) {
    return NextResponse.json({ error: 'secretkey not correct' }, { status: 401 })
  }

  try {
    const { onsiteState } = await req.json()
    const validStates = ['acceptList', 'waitingList', 'deniedList', 'Didntcheck']
    
    if (!validStates.includes(onsiteState)) {
      return NextResponse.json({ error: 'Invalid onsiteState value' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        validOnsite: onsiteState as 'acceptList' | 'waitingList' | 'deniedList' | 'Didntcheck',
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
