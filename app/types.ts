export type MessageType = {
  content?: string;
  user?: string;
  timestamp?: string;
};

export type DateType = {
  date?: string;
};

export type LogType = {
  type: "message" | "date";
  message?: MessageType;
  date?: DateType;
};

export type HeaderType = {
  dates: string[];
};
