import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { quizz } from "@/lib/data";
import { toUTC7 } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const data = await req.json();

    const requiredFields = [
      "imageData",
      "prefix",
      "firstname",
      "surname",
      "nickname",
      "date",
      "email",
      "phone",
      "province",
      "grade",
      "school",
      "etc",
      "ans",
      "checkbox",
    ];

    // ตรวจสอบว่าทุก field ที่จำเป็นมีค่า ไม่เป็น null หรือ undefined
    for (const field of requiredFields) {
      if (
        data[field] === null ||
        data[field] === undefined ||
        (field == "checkbox" && data[field] != true)
      ) {
        return NextResponse.json(
          { error: `ข้อมูลไม่ครบถ้วน` },
          { status: 400 }
        );
      }
    }

    const { ans, email, phone } = data;

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: `เบอร์โทรศัพท์ไม่ถูกต้อง` },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
      return NextResponse.json(
        { error: `อีเมลไม่ถูกต้อง` },
        { status: 400 }
      );
    }

    // ตรวจสอบว่า ans ต้องเป็น array และความยาวตรงกับ quizz
    if (!Array.isArray(ans) || ans.length !== quizz.length) {
      return NextResponse.json(
        { error: `จำนวนคำตอบไม่ตรงกับคำถาม` },
        { status: 400 }
      );
    }

    // ตรวจสอบว่าแต่ละข้อใน ans ต้องไม่เป็น null
    if (ans.some((item: string | null) => item === null)) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    const existingForm = await prisma.form.findUnique({
      where: { userId: currentUser.id },
    });

    // ถ้าผู้ใช้ส่งแบบฟอร์มไปแล้ว (alreadySubmit = true) ไม่ให้ส่งซ้ำ
    if (existingForm && existingForm.alreadySubmit === true) {
      return NextResponse.json(
        { error: "You have already submitted the form." },
        { status: 403 }
      );
    }

    const fixedData = {
      ...data,
      date: toUTC7(data.date),
      alreadySubmit: true,
      submitDate: toUTC7(new Date()),
    };

    const result = existingForm
      ? await prisma.form.update({
          where: { userId: currentUser.id },
          data: fixedData,
        })
      : await prisma.form.create({
          data: {
            ...fixedData,
            user: { connect: { id: currentUser.id } },
          },
        });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
