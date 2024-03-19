"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { opponentState } from "../atoms";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const opponentName = useRecoilValue(opponentState);
  return (
    <>
      <div className="w-full bg-[#111] fixed z-10 px-3 py-3">
        {opponentName}
      </div>
      {children}
    </>
  );
}
