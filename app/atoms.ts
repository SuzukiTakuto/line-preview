import { atom } from "recoil";
import { LogType, Dates } from "./types";

export const opponentState = atom<string>({
  key: "opponentState",
  default: "",
});

export const logState = atom<LogType[]>({
  key: "logState",
  default: [],
});

export const datesState = atom<Dates>({
  key: "datesState",
  default: {},
});

export const isCalenderOpenState = atom<boolean>({
  key: "isCalenderOpenState",
  default: false,
});
