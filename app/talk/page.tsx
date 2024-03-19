"use client";

import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { logState } from "../atoms";
import Message from "../components/message/Message";
import Date from "../components/date/Date";

const TalkPage = () => {
  const log = useRecoilValue(logState);
  return (
    <>
      <div className="">
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
