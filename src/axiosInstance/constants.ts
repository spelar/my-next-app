// 카카오 API를 직접 호출하지 않고, 서버 라우트(/api/kakao-proxy)를 경유한다.
// 이렇게 하면 REST API 키가 클라이언트 번들에 노출되지 않는다.
export const baseUrl = "/api/kakao-proxy";
