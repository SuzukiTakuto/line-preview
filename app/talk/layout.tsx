"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { opponentState, isCalenderOpenState } from "../atoms";
import CalenderWrapper from "../components/calenderWrapper/CalenderWrapper";

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
      <div className="w-full max-w-[430px] bg-[#111] fixed z-10 px-3 py-3 flex justify-between">
        {opponentName}
        <button onClick={handleOpenCalender}>
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>
      {isCalenderOpen && (
        <div className="flex flex-row-reverse">
          <div className="fixed top-11 bg-[#222] z-20">
            <CalenderWrapper />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
