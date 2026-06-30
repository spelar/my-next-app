import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("지정한 지연 후에 값을 갱신한다", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
      initialProps: { v: "a" },
    });
    expect(result.current).toBe("a");

    rerender({ v: "ab" });
    expect(result.current).toBe("a"); // 아직 지연 전

    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("ab");
  });

  it("지연 내 연속 입력은 마지막 값만 반영한다", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 300), {
      initialProps: { v: "" },
    });

    rerender({ v: "리" });
    act(() => vi.advanceTimersByTime(200));
    rerender({ v: "리액" }); // 타이머 리셋
    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe(""); // 두 번째 입력 기준 아직 300 미만

    act(() => vi.advanceTimersByTime(100));
    expect(result.current).toBe("리액");
  });
});
