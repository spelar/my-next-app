// @vitest-environment node
import { afterEach, describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { NextRequest } from "next/server";
import { server } from "@/test/msw/server";
import { GET } from "./route";

function makeReq(query = "리액트") {
  return new NextRequest(
    `http://localhost/api/kakao-proxy?query=${encodeURIComponent(query)}&page=1`
  );
}

describe("kakao-proxy route", () => {
  const original = process.env.KAKAO_API_KEY;
  afterEach(() => {
    if (original === undefined) delete process.env.KAKAO_API_KEY;
    else process.env.KAKAO_API_KEY = original;
  });

  it("KAKAO_API_KEY가 없으면 500을 반환한다", async () => {
    delete process.env.KAKAO_API_KEY;
    const res = await GET(makeReq());
    expect(res.status).toBe(500);
  });

  it("키가 있으면 카카오를 'KakaoAK <key>' 헤더로 호출하고 결과를 전달한다", async () => {
    process.env.KAKAO_API_KEY = "test-key-123";
    let sentAuth: string | null = null;
    server.use(
      http.get("https://dapi.kakao.com/v3/search/book", ({ request }) => {
        sentAuth = request.headers.get("Authorization");
        return HttpResponse.json({ documents: [], meta: { is_end: true } });
      })
    );
    const res = await GET(makeReq());
    expect(res.status).toBe(200);
    expect(sentAuth).toBe("KakaoAK test-key-123");
  });
});
