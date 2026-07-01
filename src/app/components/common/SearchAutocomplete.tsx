"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { Book } from "@/types/books";

const PLACEHOLDER =
  "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg";

interface Props {
  value: string;
  onChange: (value: string) => void;
  /** 검색 확정(버튼/Enter) → 전체 그리드 */
  onSearch: (term: string) => void;
  suggestions: Book[];
  loading: boolean;
}

export default function SearchAutocomplete({
  value,
  onChange,
  onSearch,
  suggestions,
  loading,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const canShow = value.trim().length >= 2;
  const showDropdown = open && canShow && (loading || suggestions.length > 0);

  const commit = (term: string) => {
    onSearch(term.trim());
    setOpen(false);
    setActiveIndex(-1);
  };

  const openBook = (book: Book) => {
    window.open(book.url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (e.key === "Enter") commit(value);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        openBook(suggestions[activeIndex]);
      } else {
        commit(value);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={rootRef} className="relative flex-1">
      <label htmlFor="searchInput" className="sr-only">
        검색어 입력
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
      <input
        id="searchInput"
        type="text"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="search-suggestions"
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
        }
        title="검색어 입력"
        placeholder="책을 검색해 보세요"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-20 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      />
      <button
        type="button"
        onClick={() => commit(value)}
        className="absolute right-1.5 top-1/2 z-10 -translate-y-1/2 rounded-md bg-blue-600 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
      >
        검색
      </button>

      {showDropdown && (
        <ul
          id="search-suggestions"
          role="listbox"
          // 모바일: 로고 포함 헤더 전체 폭 / 데스크톱: 입력창 폭. 6개는 잘림 없이 전부 노출.
          className="absolute right-0 top-full z-20 mt-2 w-[calc(100vw-2rem)] rounded-lg border border-slate-200 bg-white py-1 shadow-lg sm:w-full"
        >
          {loading && suggestions.length === 0 && (
            <li className="px-4 py-3 text-sm text-slate-400">불러오는 중…</li>
          )}
          {suggestions.map((book, i) => (
            <li
              key={book.isbn + i}
              id={`suggestion-${i}`}
              role="option"
              aria-selected={i === activeIndex}
            >
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 transition ${
                  i === activeIndex ? "bg-slate-100" : "hover:bg-slate-50"
                }`}
              >
                <Image
                  src={book.thumbnail !== "" ? book.thumbnail : PLACEHOLDER}
                  alt=""
                  width={36}
                  height={52}
                  unoptimized
                  className="h-[52px] w-9 shrink-0 rounded object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-slate-900">
                    {book.title}
                  </span>
                  <span className="block truncate text-xs text-slate-500">
                    {book.authors.length > 0
                      ? book.authors.join(", ")
                      : "저자 미상"}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
