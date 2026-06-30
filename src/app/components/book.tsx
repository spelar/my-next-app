"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInView } from "react-intersection-observer";
import Header from "./common/header";
import List from "./common/list";
import SkeletonElement from "./common/skeletonElement";
import useFetchBooks from "@/hooks/useFetchBooks";
import { useDebounce } from "@/hooks/useDebounce";

export default function Book() {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(inputValue, 350);
  const { ref, inView } = useInView({ threshold: 0.7 });

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    error,
    isError,
  } = useFetchBooks(searchTerm);

  // 입력이 멈추면(디바운스) 자동 검색
  useEffect(() => {
    setSearchTerm(debouncedValue.trim());
  }, [debouncedValue]);

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 에러 토스트는 렌더가 아니라 effect에서
  useEffect(() => {
    if (isError && error) {
      toast.error(
        error?.response?.data?.message ??
          "검색 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요."
      );
    }
  }, [isError, error]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 버튼/Enter는 디바운스를 기다리지 않고 즉시 검색
  const onSearchClick = useCallback(() => {
    setSearchTerm(inputValue.trim());
  }, [inputValue]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(inputValue.trim());
    }
  };

  const onLogoReset = useCallback(() => {
    setInputValue("");
    setSearchTerm("");
  }, []);

  const showSkeleton = isFetching && !data;
  const showInitial = !isFetching && !data;

  return (
    <main className="min-h-screen bg-slate-50">
      <Header
        onInputChange={onInputChange}
        inputValue={inputValue}
        onSearchClick={onSearchClick}
        onInputKeyDown={onInputKeyDown}
        onLogoReset={onLogoReset}
      />

      {showSkeleton && <SkeletonElement />}
      {data && <List data={data} />}
      {showInitial && (
        <div className="flex flex-col items-center justify-center gap-2 py-24 text-center text-slate-400">
          <p className="text-base">검색어를 입력하면 자동으로 검색돼요</p>
        </div>
      )}
      {isFetchingNextPage && <SkeletonElement />}

      <span ref={ref} aria-hidden className="block h-1" />
      <ToastContainer position="top-right" autoClose={4000} theme="light" />
    </main>
  );
}
