import React from "react";
import type { DateType } from "@/app/types";

const Date = (props: DateType) => {
  const { date } = props;
  return (
    <div className="text-center" id={date}>
      <div className="bg-[#262729] inline-block px-2 py-1 rounded-xl text-xs opacity-90">
        <p className="text-[#949494]">{date}</p>
      </div>
    </div>
  );
};

export default Date;
