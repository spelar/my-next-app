import React from "react";
import { BookOpen, Search } from "lucide-react";

interface HeaderProps {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  inputValue: string;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onLogoReset?: () => void;
}

export default function Header({
  onInputChange,
  onSearchClick,
  inputValue,
  onInputKeyDown,
  onLogoReset,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
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

        <div className="relative flex-1">
          <label htmlFor="searchInput" className="sr-only">
            검색어 입력
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            id="searchInput"
            type="text"
            title="검색어 입력"
            placeholder="책을 검색해 보세요"
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-20 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
          <button
            type="button"
            onClick={onSearchClick}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
          >
            검색
          </button>
        </div>
      </div>
    </header>
  );
}
