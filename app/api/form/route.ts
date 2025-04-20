import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { quizz } from "@/lib/data";
import  {toUTC7} from "@/lib/utils"

export async function GET() {
  try {
    const { currentUser } = await serverAuth(); 

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const form = await prisma.form.findUnique({
      where: {
        userId: currentUser.id,
      },
    });

    return NextResponse.json(form);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth(); 
    const data = await req.json();
    const { ans } = data;

    // ตรวจสอบว่า ans เป็น array และจำนวนคำตอบต้องเท่ากับ quizz
    if (!Array.isArray(ans) || ans.length !== quizz.length) {
      return NextResponse.json(
        { error: `Answer must be exactly ${quizz.length} items.` },
        { status: 400 }
      );
    }

    const existingForm = await prisma.form.findUnique({
      where: { userId: currentUser.id },
    });

    //  ถ้าส่งไปแล้ว ไม่ให้ส่งซ้ำ
    if (existingForm && existingForm.alreadySubmit === true) {
      return NextResponse.json(
        { error: "You have already submitted the form." },
        { status: 403 }
      );
    }

    const fixedData = {
      ...data,
      date: toUTC7(data.date),
    };

    const result = existingForm
      ? await prisma.form.update({
          where: { userId: currentUser.id },
          data: fixedData,
        })
      : await prisma.form.create({
          data: {
            ...fixedData,
            user: {
              connect: { id: currentUser.id },
            },
          },
        });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
