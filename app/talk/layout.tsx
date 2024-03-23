"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { opponentState, isCalenderOpenState } from "../atoms";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const opponentName = useRecoilValue(opponentState);
  const setIsCalenderOpen = useSetRecoilState(isCalenderOpenState);
  const isCalenderOpen = useRecoilValue(isCalenderOpenState);

  const handleOpenCalender = () => {
    setIsCalenderOpen(!isCalenderOpen);
  };

  return (
    <>
      <div className="w-full bg-[#111] fixed z-10 px-3 py-3 flex justify-between">
        {opponentName}
        <button onClick={handleOpenCalender}>
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>
      {children}
    </>
  );
}
