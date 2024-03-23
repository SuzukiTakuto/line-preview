"use client";
import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { datesState } from "../../../atoms";

type Props = {
  year: number;
  month: number;
  date: number;
  isLogged: boolean;
};

const CalenderDate = (props: Props) => {
  const { year, month, date, isLogged } = props;
  const [monthString, setMonthString] = useState<string>("");
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    setMonthString(month < 10 ? `0${month}` : `${month}`);
    setDateString(date < 10 ? `0${date}` : `${date}`);
  }, [year, month, date, isLogged]);

  return (
    <div
      className={`px-2 py-2 w-8 h-8 text-center ${isLogged ? "text-[#fff]" : "text-[#777]"}`}
    >
      <a href={`#${year}-${monthString}-${dateString}`}>{date}</a>
    </div>
  );
};

export default CalenderDate;
