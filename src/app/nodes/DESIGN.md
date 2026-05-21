# Nodes Canvas Design Specification (DESIGN.md)

이 문서는 Funny Todo의 마인드맵 노드 캔버스 서비스 영역 (`/src/app/nodes/`)에만 적용되는 세부 디자인 명세서입니다.

---

## 1. 캔버스 배경 및 공간 사양 (Canvas Canvas & Space)

마인드맵 영역은 무한한 아이디어 연결 공간을 상징하기 위해 아래와 같이 미니멀 도트 패턴과 빛 굴절 레이아웃으로 설계되어야 합니다.

- **기본 배경색**: 투명 (`rgba(0,0,0,0)`). 외부 프레임에서 연한 블루 백그라운드 `#f0f9ff`를 제공합니다.
- **도트 그리드 패턴**:
  - 격자 간격 (`gap`): `40px`
  - 도트 크기 (`size`): `1.5px`
  - 도트 색상: `#0ea5e9`
  - 배경 투명도: `15%` (`opacity: 0.15`)로 은은하게 조정하여 카드 콘텐츠 가독성을 침범하지 않도록 유지합니다.
- **캔버스 헤더**:
  - 높이: `5rem` (`h-20`)
  - 배경색: 반투명 화이트 `rgba(255, 255, 255, 0.45)`
  - 블러 필터: `backdrop-blur-md`
  - 테두리: 하단에만 얇은 보더 적용 `border-b border-white/50`

---

## 2. 노드 시각 요건 및 상태 (Node Specs & States)

React Flow 커스텀 노드는 전역 [.agents/DESIGN.md](file:///z:/home/minhulee/Projects/funny-todo/.agents/DESIGN.md)의 글래스모피즘 표준을 강력히 계승하되, 상태에 따라 다른 텍스처를 부여합니다.

- **기본 노드 (Default Node)**:
  - 배경색: `rgba(255, 255, 255, 0.45)`
  - 테두리색: `rgba(255, 255, 255, 0.5)`
- **스페셜/엔지니어링 노드 (Special Node)**:
  - 배경색: `rgba(14, 165, 233, 0.2)`
  - 테두리색: `rgba(14, 165, 233, 0.4)`
- **조인트 핸들 (Handles)**:
  - 위치: 상단 중앙(타입 Target), 하단 중앙(타입 Source)
  - 지름: `12px` (`w-3 h-3`)
  - 배경색: `#0ea5e9` (시그니처 스카이블루)
  - 보더: `2px solid #ffffff`
