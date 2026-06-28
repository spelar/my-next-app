import Image from "next/image";
import { SearchX } from "lucide-react";
import { BookResponse } from "@/types/books";
import { InfiniteData } from "@tanstack/react-query";

const PLACEHOLDER =
  "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg";

interface ListProps {
  data: InfiniteData<BookResponse, unknown>;
}

export default function List({ data }: ListProps) {
  const books = data.pages.flatMap((page) => page.documents);

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center text-slate-400">
        <SearchX className="h-12 w-12" aria-hidden />
        <p className="text-base">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-6">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {books.map((book, i) => (
          <li key={book.isbn + i}>
            <a
              href={book.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={book.thumbnail !== "" ? book.thumbnail : PLACEHOLDER}
                  alt={`${book.title} 표지`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
                {book.title}
              </h3>
              <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                {book.authors.length > 0 ? book.authors.join(", ") : "저자 미상"}
              </p>
              <p
                className="mt-auto pt-2 text-sm font-bold text-slate-900"
                aria-label={`가격 ${book.price.toLocaleString()}원`}
              >
                {book.price.toLocaleString()}원
              </p>
              <span className="sr-only">(새 창에서 열림)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
