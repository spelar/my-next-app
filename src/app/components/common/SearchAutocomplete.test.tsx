import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchAutocomplete from "./SearchAutocomplete";
import { sampleBooks } from "@/test/fixtures";

const suggestions = sampleBooks.documents; // 2권

function setup(overrides: Record<string, unknown> = {}) {
  const onChange = vi.fn();
  const onSearch = vi.fn();
  render(
    <SearchAutocomplete
      value="리액트"
      onChange={onChange}
      onSearch={onSearch}
      suggestions={suggestions}
      loading={false}
      {...overrides}
    />
  );
  return { onChange, onSearch };
}

describe("SearchAutocomplete", () => {
  it("입력에 포커스하면 자동완성 드롭다운(6개 이내)이 열린다", async () => {
    setup();
    await userEvent.click(screen.getByLabelText("검색어 입력"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(suggestions.length);
  });

  it("드롭다운 항목은 새 창으로 여는 링크다", async () => {
    setup();
    await userEvent.click(screen.getByLabelText("검색어 입력"));
    const firstAnchor = screen
      .getAllByRole("option")[0]
      .querySelector("a") as HTMLAnchorElement;
    expect(firstAnchor).toHaveAttribute("target", "_blank");
    expect(firstAnchor.getAttribute("rel")).toContain("noopener");
  });

  it("검색 버튼 클릭 시 onSearch(검색어)를 호출한다", async () => {
    const { onSearch } = setup();
    await userEvent.click(screen.getByRole("button", { name: "검색" }));
    expect(onSearch).toHaveBeenCalledWith("리액트");
  });

  it("ESC를 누르면 드롭다운이 닫힌다", async () => {
    setup();
    const input = screen.getByLabelText("검색어 입력");
    await userEvent.click(input);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
