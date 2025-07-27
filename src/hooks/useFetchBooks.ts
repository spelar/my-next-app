import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/constants";
import { BookResponse } from "@/types/books";
import { BookResponseError } from "@/types/error";
import { getBooks } from "@/services/books";

function useFetchBooks(query: string): {
  data: InfiniteData<BookResponse, unknown> | undefined;
  refetch: ReturnType<typeof useInfiniteQuery>["refetch"];
  hasNextPage: boolean | undefined;
  fetchNextPage: ReturnType<typeof useInfiniteQuery>["fetchNextPage"];
  isFetchingNextPage: boolean;
  isFetching: boolean;
  isError: boolean;
  error: BookResponseError | null;
  isSuccess: boolean;
} {
  const {
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useInfiniteQuery<BookResponse, BookResponseError>(
    {
      queryKey: [queryKeys.books, query],
      queryFn: ({ pageParam }: { pageParam: unknown }) => getBooks(query ? query : null, typeof pageParam === "number" ? pageParam : 1),
      getNextPageParam: (lastPage: BookResponse, allPages: BookResponse[]) => {
        if (lastPage && lastPage.meta && lastPage.meta.total_count) {
          const maxPage = lastPage.meta.total_count / 10;
          const nextPage = allPages.length + 1;
          return nextPage <= maxPage ? nextPage : undefined;
        }
        return undefined;
      },
      initialPageParam: 1,
      retry: false,
      enabled: false,
    }
  );

  return {
    data,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    error,
    isSuccess,
  };
}

export default useFetchBooks; 