"use client";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ClipboardPen, FileUser, UserRoundPen } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { quizz } from "@/lib/data";
import { useState, useEffect } from "react";
import ImageUploader from "./imageUploader";
import { Textarea } from "@/components/ui/textarea";

type FormProps = {
  onLogout: () => void;
};
export default function Form({ onLogout }: FormProps) {
  const [imageData, setImageData] = useState<string | null>(null);
  const [prefix, setPrefix] = useState<"นาย" | "นาง" | "นางสาว">();
  const [firstname, setFirstname] = useState<string>();
  const [surname, setsurname] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [date, setDate] = useState<Date | null>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [province, setProvince] = useState<string>();
  const [grade, setGrade] = useState<"ม_4" | "ม_5" | "ม_6" | "ปวช">();
  const [school, setSchool] = useState<string>();
  const [etc, setEtc] = useState<string>();
  const [ans, setAns] = useState<Array<string>>(
    new Array(quizz.length).fill("")
  );
  const [checkbox, setCheckbox] = useState<boolean>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/form"); // ดึงข้อมูลจาก API
        const data = await res.json();
        if (data) {
          setImageData(data.imageData || null);
          setPrefix(data.prefix || undefined);
          setFirstname(data.firstname || "");
          setsurname(data.surname || "");
          setNickname(data.nickname || "");
          setDate(data.date || null);
          setEmail(data.email || "");
          setPhone(data.phone || "");
          setProvince(data.province || "");
          setGrade(data.grade || undefined);
          setSchool(data.school || "");
          setEtc(data.etc || "");
          setAns(data.ans || Array(6).fill("")); // กำหนด ans ให้มี 6 ช่องว่าง
          setCheckbox(data.checkbox || false);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };

    loadData();
  }, []);

  const saveData = async () => {
      await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData,
          prefix,
          firstname,
          surname,
          nickname,
          date,
          email,
          phone,
          province,
          grade,
          school,
          etc,
          ans,
          checkbox,
        }),
      });
  };
  const onCheckboxChange = (e: boolean) => {
    setCheckbox(e);
  };

  const onPrefixChange = (e: "นาย" | "นาง" | "นางสาว") => {
    setPrefix(e);
  };

  const onFirstnameChange = (e: string) => {
    setFirstname(e);
  };

  const onSurnameChange = (e: string) => {
    setsurname(e);
  };

  const onNicknameChange = (e: string) => {
    setNickname(e);
  };

  const onDateChange = (e: Date) => {
    setDate(e);
  };

  const onEmailChange = (e: string) => {
    setEmail(e);
  };

  const onPhoneChange = (e: string) => {
    setPhone(e);
  };

  const onProvinceChange = (e: string) => {
    setProvince(e);
  };

  const onGradeChange = (e: "ม_4" | "ม_5" | "ม_6" | "ปวช") => {
    setGrade(e);
  };

  const onSchoolChange = (e: string) => {
    setSchool(e);
  };

  const onEtcChange = (e: string) => {
    setEtc(e);
  };
  const onAnsChange = (index: number, e: string) => {
    setAns((prevAns) => {
      const updatedAns = [...prevAns];
      updatedAns[index] = e;
      return updatedAns;
    });
  };
  return (
    // form
    <div>
      <section
        id="form-art"
        className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden font-IBM-Plex "
      >
        <div className="container mx-auto px-6 relative ">
          <div className="flex justify-center items-center gap-4 mb-16">
            <UserRoundPen className="w-8 h-8 text-gray-300 my-2" />
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
              Complete Your Profile
            </h2>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 border-2 border-gray-100 rounded-2xl overflow-hidden text-gray-500 shadow-xs">
            {/* <!-- Left Column --> */}
            <div className="p-8 border-r border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white">
                  1
                </div> */}
                <div className="flex justify-start items-center gap-4 ">
                  <FileUser   className="w-8 h-8 text-gray-300 my-2" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display ">
                  Personal Information
                </h3>
                </div>
              </div>

              {/* <!-- Form Content --> */}
              <div className="space-y-6">
                <div className="flex justify-center md:justify-start items-center">
                  <ImageUploader
                    imageData={imageData}
                    setImageData={setImageData}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h2 className="block mb-2 font-medium">คำนำหน้า</h2>
                    <Select
                      onValueChange={(e) => {
                        onPrefixChange(e);
                      }}
                      value={prefix}
                    >
                      <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 ">
                        <SelectValue
                          placeholder="คำนำหน้า"
                          defaultValue={prefix}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-600 border-gray-300 ring-0 shadow-none font-IBM-Plex">
                        <SelectItem
                          value="นาย"
                          className=" focus:bg-gray-100 duration-200"
                        >
                          นาย
                        </SelectItem>
                        <SelectItem
                          value="นางสาว"
                          className="focus:bg-gray-100 duration-200"
                        >
                          นางสาว
                        </SelectItem>
                        <SelectItem
                          value="นาง"
                          className="focus:bg-gray-100 duration-200"
                        >
                          นาง
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h2 className="block mb-2 font-medium">ชื่อจริง</h2>
                    <Input
                      placeholder="ชื่อจริง"
                      defaultValue={firstname}
                      onChange={(e) => {
                        onFirstnameChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600"
                    />
                  </div>

                  <div>
                    <h2 className="block mb-2 font-medium">นามสกุล</h2>
                    <Input
                      placeholder="นามสกุล"
                      defaultValue={surname}
                      onChange={(e) => {
                        onSurnameChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="">
                    <h2 className="block mb-2 font-medium">ชื่อเล่น</h2>
                    <Input
                      placeholder="ชื่อเล่น"
                      defaultValue={nickname}
                      onChange={(e) => {
                        onNicknameChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600"
                    />
                  </div>
                  <div className="col-span-2 ">
                    <h2 className="block mb-2 font-medium">วันเกิด</h2>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 flex justify-start text-gray-600 font-normal hover:bg-white"
                        >
                          {date ? format(date, "PPP") : <span>วันเกิด</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white ">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(e) => {
                            onDateChange(e);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h2 className="block mb-2 font-medium">Email</h2>
                    <Input
                      placeholder="อีเมล"
                      defaultValue={email}
                      onChange={(e) => {
                        onEmailChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 "
                    />
                  </div>

                  <div>
                    <h2 className="block mb-2 font-medium">เบอร์โทรศัพท์</h2>
                    <Input
                      placeholder="เบอร์โทรศัพท์"
                      defaultValue={phone}
                      onChange={(e) => {
                        onPhoneChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 "
                    />
                  </div>

                  <div>
                    <h2 className="block mb-2 font-medium">จังหวัด</h2>
                    <Input
                      placeholder="จังหวัด"
                      defaultValue={province}
                      onChange={(e) => {
                        onProvinceChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 "
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="">
                    <h2 className="block mb-2 font-medium">
                      ระดับชั้นการศึกษา
                    </h2>

                    <Select
                      onValueChange={(e) => {
                        onGradeChange(e);
                      }}
                      value={grade}
                    >
                      <SelectTrigger className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 ">
                        <SelectValue
                          placeholder="ชั้นปี"
                          defaultValue={grade}
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-gray-600 border-gray-300 ring-0 shadow-none font-IBM-Plex">
                        <SelectItem
                          value="ม_4"
                          className="focus:bg-gray-100 duration-200"
                        >
                          มธัยมศึกษาปีที่ 4
                        </SelectItem>
                        <SelectItem
                          value="ม_5"
                          className="focus:bg-gray-100 duration-200"
                        >
                          มธัยมศึกษาปีที่ 5
                        </SelectItem>
                        <SelectItem
                          value="ม_6"
                          className="focus:bg-gray-100 duration-200"
                        >
                          มธัยมศึกษาปีที่ 6
                        </SelectItem>
                        <SelectItem
                          value="ปวช."
                          className="focus:bg-gray-100 duration-200"
                        >
                          ปวช.
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 ">
                    <h2 className="block mb-2 font-medium">โรงเรียน</h2>
                    <Input
                      placeholder="โรงเรียน"
                      defaultValue={school}
                      onChange={(e) => {
                        onSchoolChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 "
                    />
                  </div>
                </div>

                <div>
                  <h2 className="block mb-2 font-medium">ข้อมูลเพิ่มเติม</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ เช่น ค่าย งานแข่งขัน
                    การประกวด การแสดง ฯลฯ
                  </p>
                  <textarea
                    defaultValue={etc}
                    onChange={(e) => {
                      onEtcChange(e.target.value);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 "
                    rows={4}
                  ></textarea>
                </div>
                <Button
                  className="border-[1px] hover:bg-gray-100 border-gray-300 text-gray-600 rounded-lg cursor-pointer hover:scale-105"
                  onClick={onLogout}
                >
                  ออกจากระบบ
                </Button>
              </div>
            </div>

            {/* <!-- Right Column --> */}
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-center gap-4 mb-8">
                {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white">
                  2
                </div> */}
                <div className="flex justify-start items-center gap-4 ">
                  <ClipboardPen   className="w-8 h-8 text-gray-300 my-2" />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display ">
                  Questions
                </h3>
                </div>
          
              </div>

              {/* <!-- Questions Content --> */}
              <div className="space-y-6 px-6">
                <Carousel className="w-full">
                  <div className="flex justify-start gap-4 py-2 opacity-50">
                    <CarouselPrevious className="static text-gray-600 hover:bg-transparent" />
                    <CarouselNext className="static text-gray-600 hover:bg-transparent" />
                  </div>
                  <div className="pointer-events-none w-full">
                    <CarouselContent className="w-full">
                      {Array.from({ length: Math.ceil(quizz.length / 3) }).map(
                        (_, i) => (
                          <CarouselItem key={i}>
                            <div className="h-full">
                              <div className="border-0 shadow-none h-full">
                                <CardContent className="flex flex-col gap-5 p-0 h-full">
                                  {Array.from({ length: 3 }).map(
                                    (_, j) =>
                                      3 * i + j < quizz.length && (
                                        <div key={j} className={`space-y-6 ${3 * i + j == quizz.length-1 && "h-full" }`}>
                                          <h1 className="block mb-2 font-medium ">
                                            {quizz[3 * i + j]}
                                          </h1>

                                          <textarea
                                            className={`pointer-events-auto w-full px-4 py-3 rounded-xl border border-gray-200 focus-visible:ring-0 focus:outline-0 text-gray-600 ${3 * i + j == quizz.length-1 && "h-[75%]" }`} 
                                            defaultValue={ans[3 * i + j]}
                                            rows={4}
                                            onChange={(e) => {
                                              onAnsChange(
                                                3 * i + j,
                                                e.target.value
                                              );
                                            }}
                                          ></textarea>
                                        </div>
                                      )
                                  )}
                                </CardContent>
                              </div>
                            </div>
                          </CarouselItem>
                        )
                      )}
                    </CarouselContent>
                  </div>
                </Carousel>

                <div className="flex items-center">
                  <Checkbox
                    id="terms"
                    onCheckedChange={(e) => {
                      onCheckboxChange(e);
                    }}
                    checked={checkbox}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-IBM-Plex text-gray-600 ml-3"
                  >
                    ยอมรับใน ข้อกำหนดและเงื่อนไขการเข้าร่วมโครงการ และ
                    นโยบายข้อมูลส่วนบุคคล
                  </label>
                </div>
                <Button
                  onClick={saveData}
                  className="border-[1px] hover:bg-gray-100 border-gray-300 text-gray-600  rounded-lg cursor-pointer hover:scale-105"
                >
                  บันทึกข้อมูล
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
