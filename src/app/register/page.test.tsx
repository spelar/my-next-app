import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import RegisterPage from "./page";

describe("RegisterPage", () => {
  it("비밀번호가 6자 미만이면 오류를 표시한다", async () => {
    render(<RegisterPage />);
    await userEvent.type(screen.getByLabelText("이메일"), "test@example.com");
    await userEvent.type(screen.getByLabelText("이름"), "홍길동");
    await userEvent.type(screen.getByLabelText("비밀번호"), "123");
    await userEvent.click(screen.getByRole("button", { name: "회원가입" }));
    expect(
      await screen.findByText("비밀번호는 6자 이상이어야 합니다.")
    ).toBeInTheDocument();
  });

  it("유효한 입력이면 성공 메시지를 표시한다 (API는 MSW 목)", async () => {
    render(<RegisterPage />);
    await userEvent.type(screen.getByLabelText("이메일"), "test@example.com");
    await userEvent.type(screen.getByLabelText("이름"), "홍길동");
    await userEvent.type(screen.getByLabelText("비밀번호"), "abcdef");
    await userEvent.click(screen.getByRole("button", { name: "회원가입" }));
    expect(
      await screen.findByText("회원가입이 완료되었습니다! 로그인해 주세요.")
    ).toBeInTheDocument();
  });
});
