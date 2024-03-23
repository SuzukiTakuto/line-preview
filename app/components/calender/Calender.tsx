import React from "react";
import CalenderDate from "./date/CalenderDate";
import dayjs from "dayjs";
import { weekdaysShort as weekdays } from "dayjs/locale/ja";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { datesState } from "../../atoms";
import { Dates } from "@/app/types";

type Props = {
  year: number;
  month: number;
  dates: number[];
};

const Calender = (props: Props) => {
  const { year, month, dates } = props;
  const firstOfTheMonth = dayjs(`${year}-${month}-01`).locale("ja"); // その月の最初の日を取得
  const lastOfTheMonth = firstOfTheMonth.endOf("month"); // その月の最後の日を取得
  const lastDate = lastOfTheMonth.date(); // 最後の日の日にちを取得

  return (
    <div className="w-[224px]">
      <div className="flex justify-center">
        {weekdays?.map((day) => (
          <div key={day} className="px-2 py-3">
            {day}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        {
          // その月の最初の日の曜日まで空白を入れる
          Array.from({ length: firstOfTheMonth.day() }, (_, i) => (
            <div key={i} className="px-2 py-2 w-8 h-8"></div>
          ))
        }
        {
          // その月の日にちを入れる
          Array.from({ length: lastDate }, (_, i) => (
            <CalenderDate
              key={i}
              year={year}
              month={month}
              date={i + 1}
              isLogged={dates?.includes(i + 1)}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Calender;
