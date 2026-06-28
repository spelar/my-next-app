"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInView } from "react-intersection-observer";
import Header from "./common/header";
import List from "./common/list";
import SkeletonElement from "./common/skeletonElement";
import useFetchBooks from "@/hooks/useFetchBooks";
import { queryClient } from "../ReactQuery";
import { queryKeys } from "@/react-query/constants";

export default function Book() {
  const [inputValue, setInputValue] = useState("");
  const { ref, inView } = useInView({ threshold: 0.7 });
  const {
    data,
    refetch: getBooks,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    error,
    isError,
  } = useFetchBooks(inputValue);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // 부수효과는 렌더 중이 아니라 effect에서 — 리렌더마다 토스트 중복 방지
  useEffect(() => {
    if (isError && error) {
      const message =
        error?.response?.data?.message ??
        "검색 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.";
      toast.error(message);
    }
  }, [isError, error]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSearchClick = useCallback(() => {
    if (inputValue.trim() === "") {
      toast.info("검색어를 입력해 주세요.");
      return;
    }
    queryClient.resetQueries({ queryKey: [queryKeys.books] });
    getBooks();
  }, [inputValue, getBooks]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  // 로고 클릭 시 전체 새로고침 대신 클라이언트 상태만 리셋 (SPA 경험 유지)
  const onLogoReset = useCallback(() => {
    setInputValue("");
    queryClient.resetQueries({ queryKey: [queryKeys.books] });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header
        onInputChange={onInputChange}
        inputValue={inputValue}
        onSearchClick={onSearchClick}
        onInputKeyDown={onInputKeyDown}
        onLogoReset={onLogoReset}
      />

      {!data && isFetching && <SkeletonElement />}
      {data && <List data={data} />}
      {!data && !isFetching && (
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
