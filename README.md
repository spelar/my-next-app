# My Next.js Blue/Green Deployment Project

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