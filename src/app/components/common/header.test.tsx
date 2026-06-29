import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Header from "./header";

function setup() {
  const props = {
    onInputChange: vi.fn(),
    onSearchClick: vi.fn(),
    inputValue: "",
    onInputKeyDown: vi.fn(),
    onLogoReset: vi.fn(),
  };
  render(<Header {...props} />);
  return props;
}

describe("Header", () => {
  it("검색어 입력 시 onInputChange를 호출한다", async () => {
    const props = setup();
    await userEvent.type(screen.getByLabelText("검색어 입력"), "리");
    expect(props.onInputChange).toHaveBeenCalled();
  });

  it("검색 버튼 클릭 시 onSearchClick을 호출한다", async () => {
    const props = setup();
    await userEvent.click(screen.getByRole("button", { name: "검색" }));
    expect(props.onSearchClick).toHaveBeenCalledTimes(1);
  });

  it("로고 클릭 시 onLogoReset(상태 초기화)을 호출한다", async () => {
    const props = setup();
    await userEvent.click(screen.getByRole("button", { name: /Spelar/ }));
    expect(props.onLogoReset).toHaveBeenCalledTimes(1);
  });
});
