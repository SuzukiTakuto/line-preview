"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Message from "./components/message/Message";
import { ChangeEvent, use, useState } from "react";
import Date from "./components/date/Date";
import { LogType } from "./types";
import { opponentState, logState } from "./atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

export default function Home() {
  const router = useRouter();

  const [isUploaded, setIsUploaded] = useState(false);
  const setOpponentName = useSetRecoilState(opponentState);
  const opponentName = useRecoilValue(opponentState);
  const setLog = useSetRecoilState(logState);
  const log = useRecoilValue(logState);
  const [dates, setDates] = useState<string[]>([]);

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
    // テキストを改行で分割して配列にする
    const lines = content.split(/\r?\n/);
    for (let i = 3; i < lines.length; i++) {
      // lines[i]が"2023/08/20(日)"の形式かどうかを判定する, 空白行は無視
      if (lines[i].match(/^\d{4}\/\d{2}\/\d{2}\(.+\)$/)) {
        const date = lines[i];
        setDates((prev) => [...prev, date]);
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
      <button onClick={() => upLoad()}>生成</button>
    </div>
  );
}
