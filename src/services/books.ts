import { axiosInstance } from "@/axiosInstance";
import { BookResponse } from "@/types/books";

export const getBooks = async (
  query: string,
  page: number,
  signal?: AbortSignal
): Promise<BookResponse> => {
  const { data } = await axiosInstance.get("", {
    params: { query, page },
    signal,
  });
  return data;
}; 