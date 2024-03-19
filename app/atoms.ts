import { atom } from "recoil";
import { LogType } from "./types";

export const opponentState = atom<string>({
  key: "opponentState",
  default: "",
});

export const logState = atom<LogType[]>({
  key: "logState",
  default: [],
});
