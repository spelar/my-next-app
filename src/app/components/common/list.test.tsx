import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { InfiniteData } from "@tanstack/react-query";
import type { BookResponse } from "@/types/books";
import { emptyBooks, sampleBooks } from "@/test/fixtures";
import List from "./list";

function makeData(pages: BookResponse[]): InfiniteData<BookResponse, unknown> {
  return { pages, pageParams: pages.map((_, i) => i + 1) };
}

describe("List", () => {
  it("책 제목·저자·가격(원)을 렌더한다", () => {
    render(<List data={makeData([sampleBooks])} />);
    expect(screen.getByText("리액트")).toBeInTheDocument();
    expect(screen.getByText("네빌 고다드")).toBeInTheDocument();
    expect(screen.getByText("12,500원")).toBeInTheDocument();
  });

  it("가격에 접근성 라벨을 부여한다", () => {
    render(<List data={makeData([sampleBooks])} />);
    expect(screen.getByLabelText("가격 12,500원")).toBeInTheDocument();
  });

  it("저자가 없으면 '저자 미상'을 표시한다", () => {
    render(<List data={makeData([sampleBooks])} />);
    expect(screen.getByText("저자 미상")).toBeInTheDocument();
  });

  it("외부 링크는 새 창 + rel=noopener로 연다", () => {
    render(<List data={makeData([sampleBooks])} />);
    const firstLink = screen.getAllByRole("link")[0];
    expect(firstLink).toHaveAttribute("target", "_blank");
    expect(firstLink.getAttribute("rel")).toContain("noopener");
  });

  it("결과가 없으면 빈 상태 메시지를 보여준다", () => {
    render(<List data={makeData([emptyBooks])} />);
    expect(screen.getByText("검색 결과가 없습니다")).toBeInTheDocument();
  });
});
