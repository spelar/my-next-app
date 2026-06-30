import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import Book from "./book";

function renderBook() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <Book />
    </QueryClientProvider>
  );
}

describe("Book 실시간 검색", () => {
  it("처음에는 안내 문구를 보여준다", () => {
    renderBook();
    expect(
      screen.getByText("검색어를 입력하면 자동으로 검색돼요")
    ).toBeInTheDocument();
  });

  it("검색어를 입력하면 버튼 클릭 없이 결과가 나타난다 (디바운스 자동 검색)", async () => {
    renderBook();
    await userEvent.type(screen.getByLabelText("검색어 입력"), "리액트");
    // 디바운스(350ms) → MSW 응답 → 결과 가격이 렌더됨
    expect(
      await screen.findByText("12,500원", {}, { timeout: 3000 })
    ).toBeInTheDocument();
  });
});
