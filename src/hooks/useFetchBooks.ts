import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/constants";
import { BookResponse } from "@/types/books";
import { BookResponseError } from "@/types/error";
import { getBooks } from "@/services/books";

const MIN_QUERY_LENGTH = 2;

/**
 * 검색어(query)가 바뀌면 자동으로 페칭한다.
 * - queryKey에 검색어를 넣어 키 변경 시 React Query가 자동 재조회
 * - 2글자 이상일 때만 활성화(enabled)
 * - queryFn의 signal을 전달해 입력이 바뀌면 이전 요청 취소
 */
function useFetchBooks(query: string) {
  const trimmed = query.trim();

  return useInfiniteQuery<BookResponse, BookResponseError>({
    queryKey: [queryKeys.books, trimmed],
    queryFn: ({ pageParam, signal }) =>
      getBooks(trimmed, typeof pageParam === "number" ? pageParam : 1, signal),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.meta.is_end ? undefined : allPages.length + 1,
    initialPageParam: 1,
    retry: false,
    enabled: trimmed.length >= MIN_QUERY_LENGTH,
  });
}

export default useFetchBooks;
