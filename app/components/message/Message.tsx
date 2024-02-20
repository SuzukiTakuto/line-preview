import React from "react";
import Image from "next/image";

import { MessageType } from "@/app/types";

const Message = (props: MessageType) => {
  const { content, user, timestamp } = props;
  return (
    <div className="py-2 px-2">
      {user == "すずきたくと" ? (
        <div className="flex items-center">
          <Image
            src="/images/takt_icon.jpeg"
            alt="profile"
            width={230}
            height={230}
            className="w-11 self-start rounded-full mr-2"
          />
          <div className="inline-block bg-[#555555] max-w-64 px-3 py-2 rounded-3xl break-words">
            <p className="text-[#DFDFDF]">{content}</p>
          </div>
          <p className="text-xs mx-2 self-end text-[#767778]">{timestamp}</p>
        </div>
      ) : (
        <div className="flex flex-row-reverse">
          <div className="inline-block bg-[#86D97B] max-w-64 px-3 py-2 rounded-3xl break-words">
            <p className="text-[#373737]">{content}</p>
          </div>
          <p className="text-xs mx-2 self-end text-[#767778]">{timestamp}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
