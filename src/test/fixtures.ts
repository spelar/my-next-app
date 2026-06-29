import type { BookResponse } from "@/types/books";

export const sampleBooks: BookResponse = {
  documents: [
    {
      authors: ["네빌 고다드"],
      contents: "리액트 입문서",
      datetime: "2020-01-01T00:00:00.000+09:00",
      isbn: "111 1111111111",
      price: 12500,
      publisher: "테스트출판사",
      sale_price: 11000,
      status: "정상판매",
      thumbnail: "https://example.com/cover-a.jpg",
      title: "리액트",
      translators: [],
      url: "https://book.example.com/1",
    },
    {
      authors: [],
      contents: "리액트 심화서",
      datetime: "2021-01-01T00:00:00.000+09:00",
      isbn: "222 2222222222",
      price: 28000,
      publisher: "테스트출판사2",
      sale_price: 28000,
      status: "정상판매",
      thumbnail: "",
      title: "리액트 인 액션",
      translators: [],
      url: "https://book.example.com/2",
    },
  ],
  meta: { is_end: false, pageable_count: 100, total_count: 100 },
};

export const emptyBooks: BookResponse = {
  documents: [],
  meta: { is_end: true, pageable_count: 0, total_count: 0 },
};
