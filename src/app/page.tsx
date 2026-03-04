"use client"

import CustomButton from "@/components/customs/customButton";
import CustomCheckbox from "@/components/customs/customCheckbox";
import CustomCombobox, { Framework } from "@/components/customs/customCombobox";
import CustomGroupCheckBox from "@/components/customs/customGroupCheckbox";
import React, { useState } from "react";

const jobPreferences = [
  {
    id: "remote",
    label: "Work from Anywhere",
    description: "สามารถทำงานจากที่ไหนก็ได้",
    defaultChecked: true,
  },
  {
    id: "full-insurance",
    label: "ประกันสุขภาพเต็มรูปแบบ",
    description: "ครอบคลุมทั้ง OPD และ IPD รวมถึงทันตกรรม",
    defaultChecked: false,
  },
  {
    id: "bonus",
    label: "โบนัสประจำปี",
    description: "พิจารณาตามผลประกอบการและ",
    defaultChecked: false,
  },
  {
    id: "expired-offer",
    label: "สิทธิ์จองหุ้นบริษัท (ESOP)",
    description: "ข้อเสนอนี้หมดเขตการรับสิทธิ์แล้ว",
    disabled: true, // ทดสอบสถานะที่กดไม่ได้
    defaultChecked: false,
  }
];


export default function Home() {
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(["remote"]);

  const [value, setValue] = React.useState<Framework | null>(null)
  const [value2, setValue2] = React.useState<Framework[]>([])

  const [disabled, setDisabled] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        <CustomCheckbox label="ทดสอบ2" defaultChecked id="2" />
        <CustomGroupCheckBox name="benefits-group" dataSet={jobPreferences} value={selectedBenefits}           // ส่ง state ลงไป
          onChange={setSelectedBenefits} className="w-full" />

        <CustomCombobox
          placeholder="Select framework"
          value={value}
          setValue={setValue}
        />

        <CustomCombobox
          multiple
          placeholder="Select frameworks"
          value={value2}
          setValue={setValue2}
        />
        <div className="flex flex-row gap-2">
          <CustomButton label="ทดสอบ1" onClick={() => setDisabled(!disabled)} />
          <CustomButton label="ทดสอบ" loading={disabled} withIcon='inline-end' rounded='rounded-full' onClick={() => setDisabled(!disabled)} />
        </div>


      </main>
    </div>
  );
}
