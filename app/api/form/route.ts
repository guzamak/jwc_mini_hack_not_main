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

    if (!Array.isArray(ans) || ans.length !== quizz.length) {
      return NextResponse.json(
        { error: `Answer must be exactly ${quizz.length} items.` },
        { status: 400 }
      );
    }
    const existingForm = await prisma.form.findUnique({
      where: { userId: currentUser.id },
    });

    let result;

    const fixedData = {
      ...data,
      date: toUTC7(data.date),
    };
    
    if (existingForm) {
      result = await prisma.form.update({
        where: { userId: currentUser.id },
        data: {
          ...fixedData,
        },
      });
    } else {
      result = await prisma.form.create({
        data: {
          ...fixedData,
          user: {
            connect: { id: currentUser.id },
          },
        },
      });
    }


    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error}, { status: 500 });
  }
}
