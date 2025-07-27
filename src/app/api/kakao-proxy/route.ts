import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") || "1";

  const kakaoRes = await fetch(
    `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query || "")}&page=${page}`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_KAKAO_API_KEY || "",
        KA: "sdk/1.0 os/javascript",
      },
    }
  );

  const data = await kakaoRes.json();
  return NextResponse.json(data, { status: kakaoRes.status });
} 