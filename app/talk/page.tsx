"use client";

import React, { use, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { logState, opponentState, isCalenderOpenState } from "../atoms";
import { useRouter } from "next/navigation";
import Message from "../components/message/Message";
import Date from "../components/date/Date";
import CalenderWrapper from "../components/calenderWrapper/CalenderWrapper";

const TalkPage = () => {
  const router = useRouter();
  const log = useRecoilValue(logState);
  const opponentName = useRecoilValue(opponentState);
  const isCalenderOpen = useRecoilValue(isCalenderOpenState);

  useEffect(() => {
    if (opponentName === "" || log.length === 0) {
      router.push("/");
    }
  }, [log.length, opponentName, router]);

  return (
    <>
      <div className="mt-16">
        {isCalenderOpen && (
          <div className="fixed top-11 right-0 flex justify-center bg-[#222] z-20">
            <CalenderWrapper />
          </div>
        )}
        {log.map((log, index) => {
          if (log.type === "message") {
            return (
              <Message
                key={index}
                content={log.message?.content}
                user={log.message?.user}
                timestamp={log.message?.timestamp}
              />
            );
          } else if (log.type === "date") {
            return <Date key={index} date={log.date?.date} />;
          }
        })}
      </div>
    </>
  );
};

export default TalkPage;
