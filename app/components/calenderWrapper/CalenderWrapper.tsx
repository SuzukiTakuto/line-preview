"use client";
import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { datesState } from "../../atoms";
import Calender from "../calender/Calender";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const CalenderWrapper = () => {
  const logDates = useRecoilValue(datesState);
  const [year, setYear] = useState<number>(2024);
  const [month, setMonth] = useState<number>(2);
  const [dates, setDates] = useState<number[]>([]);

  useEffect(() => {
    const dates = logDates[year] ? logDates[year][month] : []; // その年月の日付を取得、なければ空配列
    setDates(dates);
  }, [year, month, logDates]);

  const decrementMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const incrementMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="w-60">
      <div className="flex justify-center pt-3">
        <button
          className="px-2"
          onClick={() => {
            decrementMonth();
          }}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <p>
          {year}年{month}月
        </p>
        <button
          className="px-2"
          onClick={() => {
            incrementMonth();
          }}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
      <div className="flex justify-center px-3 pb-3">
        <Calender year={year} month={month} dates={dates} />
      </div>
    </div>
  );
};

export default CalenderWrapper;
