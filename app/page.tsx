"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, use, useState } from "react";
import { LogType, Dates } from "./types";
import { opponentState, logState, datesState } from "./atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

export default function Home() {
  const router = useRouter();

  const setOpponentName = useSetRecoilState(opponentState);
  const opponentName = useRecoilValue(opponentState);
  const setLog = useSetRecoilState(logState);
  const log = useRecoilValue(logState);
  const setDates = useSetRecoilState(datesState);

  // dateを2023-08-20の形式に変換する
  const parseDate = (date: string) => {
    const dateArray = date.split("/");
    dateArray[1] =
      dateArray[1].length === 1 ? "0" + dateArray[1] : dateArray[1];
    dateArray[2] = dateArray[2].split("(")[0];
    dateArray[2] =
      dateArray[2].length === 1 ? "0" + dateArray[2] : dateArray[2];
    return dateArray.join("-");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      let i = 1;
      reader.onload = (e) => {
        const text = e.target?.result as string;
        processFileContent(text);
      };
      reader.readAsText(file);
    }
  };

  const processFileContent = (content: string) => {
    const dateStrings = []; // 日付の文字列を格納する配列("2023/08/20(日)"の形式)
    setLog([]); // ログをリセット
    setDates({}); // 日付をリセット
    // テキストを改行で分割して配列にする
    const lines = content.split(/\r?\n/);
    for (let i = 3; i < lines.length; i++) {
      // lines[i]が"2023/08/20(日)"の形式かどうかを判定する, 空白行は無視
      if (lines[i].match(/^\d{4}\/\d{2}\/\d{2}\(.+\)$/)) {
        const date = parseDate(lines[i]);
        dateStrings.push(date);
        setLog((prev) => [
          ...prev,
          {
            type: "date",
            date: { date },
          },
        ]);
      } else if (lines[i].match(/^\d{2}:\d{2}\t[^\t]+\t[^\t]+$/)) {
        const match = lines[i].match(/^(\d{2}:\d{2})\t([^\t]+)\t([^\t]+)$/);
        const timestamp = match ? match[1] : "";
        const user = match ? match[2] : "";
        let content = match ? match[3] : "";

        if (content.split('"').length == 2) {
          content = content.split('"')[1];
          while (true) {
            if (lines[i + 1].split('"').length == 2) {
              // 改行してcontentに追加
              content += "\n" + lines[i + 1].split('"')[0];
              i++;
              break;
            } else {
              content += "\n" + lines[i + 1];
              i++;
            }
          }
        }

        const reshapedContent = content;
        setLog((prev) => [
          ...prev,
          {
            type: "message",
            message: { content: reshapedContent, user, timestamp },
          },
        ]);
      }
    }

    // 年のグループを作成、さらにその中で月のグループを作成、日付を格納(カレンダーで使うため)
    setDates(
      dateStrings.reduce((acc: Dates, date) => {
        const [yearString, monthString, dayString] = date.split("-");
        const year = Number(yearString);
        const month = Number(monthString);
        const day = Number(dayString);
        if (!acc[year]) {
          acc[year] = {};
        }
        if (!acc[year][month]) {
          acc[year][month] = [];
        }
        acc[year][month].push(day);
        return acc;
      }, {})
    );
  };

  const upLoad = () => {
    if (opponentName === "") {
      alert("相手の名前を入力してください");
      return;
    }
    if (log.length === 0) {
      alert("ログファイルを選択してください");
      return;
    }
    router.push("/talk");
  };

  return (
    <div className="mx-2 my-2">
      <input
        className="my-2"
        type="file"
        onChange={handleFileChange}
        accept=".txt"
      />
      <input
        className="text-[#111] px-1 py-1"
        type="text"
        placeholder="相手の名前(正確に)"
        onChange={(e) => setOpponentName(e.target.value)}
      />
      <button
        type="button"
        onClick={() => upLoad()}
        className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-1 ml-2"
      >
        生成
      </button>
      <p className="mt-3">※スマホでの利用推奨</p>
    </div>
  );
}
