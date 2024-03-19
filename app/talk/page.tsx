"use client";

import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { logState, opponentState } from "../atoms";
import { useRouter } from "next/navigation";
import Message from "../components/message/Message";
import Date from "../components/date/Date";

const TalkPage = () => {
  const router = useRouter();
  const log = useRecoilValue(logState);
  const opponentName = useRecoilValue(opponentState);

  if (opponentName === "" || log.length === 0) {
    router.push("/");
  }
  return (
    <>
      <div className="mt-16">
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
