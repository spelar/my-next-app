import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Header from "./header";

describe("Header (셸)", () => {
  it("children(검색 영역)을 렌더한다", () => {
    render(
      <Header onLogoReset={() => {}}>
        <div>검색영역</div>
      </Header>
    );
    expect(screen.getByText("검색영역")).toBeInTheDocument();
  });

  it("로고 클릭 시 onLogoReset(상태 초기화)을 호출한다", async () => {
    const onLogoReset = vi.fn();
    render(
      <Header onLogoReset={onLogoReset}>
        <div />
      </Header>
    );
    await userEvent.click(screen.getByRole("button", { name: /Spelar/ }));
    expect(onLogoReset).toHaveBeenCalledTimes(1);
  });
});
