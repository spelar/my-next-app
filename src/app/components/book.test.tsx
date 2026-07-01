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

describe("Book 검색 플로우", () => {
  it("처음에는 안내 문구를 보여준다", () => {
    renderBook();
    expect(
      screen.getByText("검색어를 입력해 책을 찾아보세요")
    ).toBeInTheDocument();
  });

  it("타이핑하면 자동완성 드롭다운이 뜨고, 검색 버튼을 누르면 전체 그리드가 나온다", async () => {
    renderBook();
    await userEvent.type(screen.getByLabelText("검색어 입력"), "리액트");

    // 디바운스 후 자동완성 드롭다운
    expect(
      await screen.findByRole("listbox", {}, { timeout: 3000 })
    ).toBeInTheDocument();

    // 검색 버튼 → 전체 그리드 (가격은 그리드에만 노출)
    await userEvent.click(screen.getByRole("button", { name: "검색" }));
    expect(
      await screen.findByText("12,500원", {}, { timeout: 3000 })
    ).toBeInTheDocument();
  });
});
