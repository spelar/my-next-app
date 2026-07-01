"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInView } from "react-intersection-observer";
import Header from "./common/header";
import SearchAutocomplete from "./common/SearchAutocomplete";
import List from "./common/list";
import SkeletonElement from "./common/skeletonElement";
import useFetchBooks from "@/hooks/useFetchBooks";
import useSearchSuggestions from "@/hooks/useSearchSuggestions";
import { useDebounce } from "@/hooks/useDebounce";

export default function Book() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(inputValue, 300);
  const { ref, inView } = useInView({ threshold: 0.7 });

  // 자동완성 드롭다운(상위 6개) — 타이핑 시
  const { data: suggestions = [], isFetching: suggestionsLoading } =
    useSearchSuggestions(debouncedValue);

  // 전체 그리드 — 검색 확정 시(검색 버튼/Enter)
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    error,
    isError,
  } = useFetchBooks(searchTerm);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isError && error) {
      toast.error(
        error?.response?.data?.message ??
          "검색 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
      );
    }
  }, [isError, error]);

  const onSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const onLogoReset = useCallback(() => {
    setInputValue("");
    setSearchTerm("");
  }, []);

  const showSkeleton = isFetching && !data;
  const showInitial = !isFetching && !data;

  return (
    <main className="min-h-screen bg-slate-50">
      <Header onLogoReset={onLogoReset}>
        <SearchAutocomplete
          value={inputValue}
          onChange={setInputValue}
          onSearch={onSearch}
          suggestions={suggestions}
          loading={suggestionsLoading}
        />
      </Header>

      {showSkeleton && <SkeletonElement />}
      {data && <List data={data} />}
      {showInitial && (
        <div className="flex flex-col items-center justify-center gap-2 py-24 text-center text-slate-400">
          <p className="text-base">검색어를 입력해 책을 찾아보세요</p>
        </div>
      )}
      {isFetchingNextPage && <SkeletonElement />}

      <span ref={ref} aria-hidden className="block h-1" />
      <ToastContainer position="top-right" autoClose={4000} theme="light" />
    </main>
  );
}
