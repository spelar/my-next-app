import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 서버 전용 키 — 클라이언트 번들에 절대 노출되지 않는다.
  const apiKey = process.env.KAKAO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "서버에 KAKAO_API_KEY가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";

  const kakaoRes = await fetch(
    `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(
      query || ""
    )}&page=${page}`,
    {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
        KA: "sdk/1.0 os/javascript",
      },
    }
  );

  const data = await kakaoRes.json();
  return NextResponse.json(data, { status: kakaoRes.status });
} 