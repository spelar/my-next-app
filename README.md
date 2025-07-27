# My Next.js Blue/Green Deployment Project

## 소개

이 프로젝트는 KaKao Open API를 활용하여 책 검색 웹 애플리케이션을 구현한 예시입니다. 사용자가 입력한 검색어로 책 정보를 불러오고, 무한 스크롤 기능을 통해 결과를 편리하게 탐색할 수 있습니다.

## 프로젝트 개요

이 프로젝트는 **Next.js** 기반의 웹 서비스를
- **Docker** 컨테이너로 빌드하고,
- **Nginx**로 Reverse Proxy를 구성하여,
- **Linux 서버**(예: Ubuntu)에
- **Blue/Green 무중단 배포** 방식으로 운영하도록 자동화된 인프라/배포 환경을 구축합니다.

CI/CD 자동화에는 **GitHub Actions**를 사용하며,
최종적으로 **DNS 설정 및 TLS(HTTPS) 인증서 적용**까지 아우릅니다.

---

## 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org/)
- **웹 서버/Proxy**: [Nginx](https://nginx.org/)
- **OS**: Linux (예: Ubuntu 22.04)
- **컨테이너**: Docker
- **CI/CD**: GitHub Actions
- **배포 전략**: Blue/Green Deployment
- **도메인/DNS**:  
  - [https://spelar.shop](https://spelar.shop)
  - [https://www.spelar.shop](https://www.spelar.shop)
- **TLS 인증서**: Let's Encrypt (무료 SSL)

---