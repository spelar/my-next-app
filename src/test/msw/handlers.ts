import { http, HttpResponse } from "msw";
import { sampleBooks } from "../fixtures";

export const handlers = [
  // 클라이언트 → 서버 프록시 (검색 통합 테스트)
  http.get("*/api/kakao-proxy", () => HttpResponse.json(sampleBooks)),
  // 서버 프록시 → 카카오 (라우트 핸들러 테스트)
  http.get("https://dapi.kakao.com/v3/search/book", () =>
    HttpResponse.json(sampleBooks)
  ),
  // 회원가입
  http.post("*/user/register", () =>
    HttpResponse.json({ message: "회원가입 성공", userId: 1 }, { status: 201 })
  ),
];
