import React from "react";
import { BookOpen } from "lucide-react";

interface HeaderProps {
  /** 로고 클릭 시 검색 상태 초기화(전체 새로고침 대신) */
  onLogoReset?: () => void;
  children: React.ReactNode;
}

export default function Header({ onLogoReset, children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-3 px-4 sm:gap-6">
        <button
          type="button"
          onClick={onLogoReset}
          aria-label="Spelar 홈 — 검색 초기화"
          className="flex shrink-0 items-center gap-2 text-lg font-bold text-slate-900"
        >
          <BookOpen className="h-5 w-5 text-blue-600" aria-hidden />
          <span>Spelar</span>
        </button>
        {children}
      </div>
    </header>
  );
}
