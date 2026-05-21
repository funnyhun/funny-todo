---
trigger: glob
globs: src/*
---

# Next.js App Router 특화 금지 규칙 (next-expert-rule)

본 규칙은 Next.js App Router 생태계에서 에이전트가 절대로 저질러서는 안 되는 치명적 금지 조항이며, 1글자의 위반도 허용하지 않는다.

## 1. [금지] 페이지 전체의 Client Component 무단 도배 금지
- `"use client"` 지시어를 최상단 `page.tsx` 또는 `layout.tsx` 등에 남용하여 서버 사이드 렌더링(SSR) 및 정적 최적화 이점을 완전히 파괴하는 행위를 금지한다.
- 무거운 클라이언트 상태 관리 및 이벤트 인터랙션이 요구되는 가장 말단 영역만 Client Component로 정밀하게 쪼개어 추출해야 한다.

## 2. [금지] 클라이언트 컴포넌트 내에서의 보안 데이터 직접 패칭 금지
- `"use client"` 지시어가 명시된 클라이언트 컴포넌트 내부에서 백엔드 다이렉트 데이터베이스 쿼리를 날리거나 보안 민감 API를 직접 호출하는 행위를 엄금한다.
- 모든 보안 데이터 패칭은 반드시 Server Component에서 `async/await` fetch로 수행한 후, 직렬화된 Props 형태로 하향 주입받아 사용하는 흐름을 준수한다.

## 3. [금지] app/ 폴더 내 보조 파일 무단 방치 금지
- `app/` 라우팅 폴더 내에 Next.js 공식 표준 파일 명명 규칙(`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` 등)이 아닌 일반 보조 UI 컴포넌트 파일을 함께 방치하는 것을 절대 금지한다.
- 모든 보조 컴포넌트는 오직 `src/ui/` 또는 `components/` 등 정의된 컴포넌트 격리 경로 하위에만 둔다.
