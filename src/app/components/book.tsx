"use client";

import React from "react";
import { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Header from "./common/header";
import useFetchBooks from "@/hooks/useFetchBooks";
import { queryClient } from "../ReactQuery";
import { queryKeys } from "@/react-query/constants";
import { ToastContainer, toast } from "react-toastify";
import { useInView } from "react-intersection-observer";
import SkeletonElement from "./common/skeletonElement";
import List from "./common/list";

export default function Book() {
  const [inputValue, setInputValue] = useState<string>("");
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
    if (typeof window === "undefined") return;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSearchClick = useCallback(() => {
    if (inputValue === "") {
      alert("검색어를 입력해주세요.");
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

  if (isError && error) {
    toast.error(error.response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <BookWrapper>
      <Header
        onInputChange={onInputChange}
        inputValue={inputValue}
        onSearchClick={onSearchClick}
        onInputKeyDown={onInputKeyDown}
      />
      {!data && isFetching && <SkeletonElement />}
      {data && <List data={data} />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <div>
          <span ref={ref}></span>
        </div>
        <div>
          {isFetchingNextPage && <SkeletonElement />}
        </div>
      </div>
    </BookWrapper>
  );
}

const BookWrapper = styled.div`
  margin: 0 auto;
  max-width: 768px;
`; 