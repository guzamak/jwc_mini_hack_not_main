import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ secretkey: string }>} ) {
  const { secretkey } = await params;
  // console.log(params.secretkey)
  // secetkey = param 
  
  if (secretkey !== process.env.SECRETKEY) {
    return NextResponse.json({ error: 'secretkey not correct' }, { status: 401 })
  }
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        validOnsite: true,
        form: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
  
export async function PUT(req: NextRequest, context: { params: { secretkey: string } }) {
  const { secretkey } = context.params;

  if (secretkey !== process.env.SECRETKEY) {
    return NextResponse.json({ error: 'secretkey not correct' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, userData, formData } = body

    if (!id) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...userData,
        form: {
          upsert: {
            create: {
              ...formData,
            },
            update: {
              ...formData,
            },
          },
        },
      },
      include: {
        form: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}