import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import serverAuth from "@/lib/serverAuth";

export async function PUT(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth();

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { confirmation } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found in database" }, { status: 404 });
    }
    
    if (!user.validOnsite || user.validOnsite !== "acceptList") {
      return NextResponse.json({ error: "ไม่ได้รับการคัดเลือก" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { confirmation },
    });

    return NextResponse.json(updatedUser);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}