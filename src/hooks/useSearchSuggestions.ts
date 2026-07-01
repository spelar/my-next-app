import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/constants";
import { getBooks } from "@/services/books";
import type { Book } from "@/types/books";

const MIN_QUERY_LENGTH = 2;
const SUGGESTION_LIMIT = 6;

/** 자동완성 드롭다운용 — 검색어 상위 6개 책을 반환한다. */
export default function useSearchSuggestions(query: string) {
  const trimmed = query.trim();

  return useQuery({
    queryKey: [queryKeys.books, "suggest", trimmed],
    queryFn: ({ signal }) => getBooks(trimmed, 1, signal),
    enabled: trimmed.length >= MIN_QUERY_LENGTH,
    select: (data): Book[] => data.documents.slice(0, SUGGESTION_LIMIT),
    staleTime: 60_000,
  });
}
