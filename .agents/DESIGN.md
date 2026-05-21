# Global Design Specification (DESIGN.md)

본 문서는 Funny Todo 프로젝트의 시각적 정체성, 색상 팔레트, 타이포그래피, 그리고 아토믹 컴포넌트 사양을 규정한 전역 디자인 바이블입니다.
Evolus Pencil 에디터로 구축된 최신 디자인 프로젝트 사양 파일인 `.agents/funny-todo.pen` 규격과 1:1로 완전 동기화되어 관리됩니다.

---

## 1. 디자인 정체성: 모던 글래스모피즘 (Modern Glassmorphism)

본 프로젝트는 불필요한 장식과 강렬한 원색을 배제하고, 프리미엄 투명 서페이스와 세련된 연한 블루 테마를 결합한 프리미엄 모던 글래스모피즘을 지향합니다.

### 핵심 시각적 원칙
* **다중 레이어 블러**: `backdrop-filter: blur(...)` 효과를 활용하여 깊이감을 시각화합니다.
* **섬세한 빛 굴절 테두리**: 50%의 투명도를 가진 흰색 경계선(`rgba(255, 255, 255, 0.5)`)을 부여하여 유리 질감을 완성합니다.
* **절제된 미니멀 타이포그래피**: Inter 서체를 표준 폰트로 채택하고, 담백하고 명확한 굵기 대비로 가독성을 확보합니다.
* **절제된 무채색 소프트 섀도우**: 원색 조가 가미되지 않은 투명한 어두운 그림자(`rgba(0, 0, 0, 0.04)`)로 고급스럽고 가벼운 깊이를 구현합니다.

---

## 2. 디자인 토큰 및 변수 (Variables)

모든 스타일 시트와 인라인 스타일은 아래의 토큰 목록을 기반으로 구현되어야 합니다.

### 색상 체계 (Color System)
* **Signature Sky Blue (primary)**: `#0284C7` (스카이 블루 메인 테마 색상)
* **Signature Light (primary-light)**: `#38BDF8` (하이라이트 및 보완용 연한 블루)
* **Glass Surface (glass-bg)**: `#FFFFFF66` (60% 불투명도의 반투명 화이트 배경)
* **Glass Border (glass-border)**: `#FFFFFF80` (50% 불투명도의 반투명 화이트 테두리)
* **Main Background (bg-main)**: 
  * 라이트 테마: `#F8FAFC`
  * 다크 테마: `#0F172A`
* **Primary Text (font-primary)**:
  * 라이트 테마: `#0F172A`
  * 다크 테마: `#F8FAFC`
* **Secondary Text (font-secondary)**: `#64748B` (서브 정보 및 본문용 회색조)
* **Functional Colors**:
  * Success: `#10B981` (실행 완료 및 긍정 상태)
  * Warning: `#F59E0B` (선행조건 잠금 상태 경고 등)

### 블러 사양 (Blur Specs)
* **Badge Blur**: `8px` (`backdropFilter: 'blur(8px)'`)
* **Button Blur**: `12px` (`backdropFilter: 'blur(12px)'`)
* **Node Blur**: `16px` (`backdropFilter: 'blur(16px)'`)
* **Card Blur**: `20px` (`backdropFilter: 'blur(20px)'`)

---

## 3. 아토믹 컴포넌트 규격 명세

개별 독립 UI 컴포넌트는 `.pen` 프레임에 정의된 구조와 완벽히 동일하게 일치시켜 리팩토링합니다.

### 1) StatusBadge 컴포넌트
* **컴포넌트명**: `Component/StatusBadge`
* **모양 사양**: 캡슐 형태 (`borderRadius: '999px'`)
* **내부 여백**: `4px 12px` (`padding: '4px 12px'`)
* **글래스 블러**: `8px` (`backdropFilter: 'blur(8px)'`)
* **테두리 스펙**: 1px 두께, `#38bdf84d` 색상
* **배경 채우기**: `#0284c71f` (라이트 테마 기준)
* **텍스트 사양**: 폰트 Inter, 크기 `10px`, 두께 `800` (Ultra-Bold)

### 2) NeoButton 컴포넌트
* **컴포넌트명**: `Component/NeoButton`
* **모양 사양**: 둥근 모서리 사각형 (`borderRadius: '16px'`)
* **내부 여백**: `12px 24px` (`padding: '12px 24px'`)
* **글래스 블러**: `12px` (`backdropFilter: 'blur(12px)'`)
* **테두리 스펙**: 1px 두께, `$glass-border` (`rgba(255, 255, 255, 0.5)`)
* **배경 채우기**: `$glass-bg` (`rgba(255, 255, 255, 0.4)`)
* **텍스트 사양**: 폰트 Inter, 크기 `14px`, 두께 `600` (Semi-Bold)

### 3) IdeaCard 컴포넌트
* **컴포넌트명**: `Component/IdeaCard`
* **모양 사양**: 가로 고정 폭 `320px`, 모서리 반경 `24px` (`borderRadius: '24px'`)
* **내부 여백**: `32px` (`padding: '32px'`)
* **글래스 블러**: `20px` (`backdropFilter: 'blur(20px)'`)
* **그림자 스펙**: `0 4px 24px 0 rgba(0, 0, 0, 0.04)` (무채색 소프트 섀도우)
* **테두리 스펙**: 1px 두께, `$glass-border`
* **요소 간 간격**: `16px` (`gap: '16px'`, Vertical)
* **타이틀 텍스트**: 폰트 Inter, 크기 `20px`, 두께 `700`, 색상 `$font-primary` (정돈된 노멀 폰트 스타일)
* **본문 텍스트**: 폰트 Inter, 크기 `14px`, 두께 `normal`, 색상 `$font-secondary`

### 4) NeoNode 컴포넌트
* **컴포넌트명**: `Component/NeoNode`
* **모양 사양**: 가로 고정 폭 `200px`, 모서리 반경 `16px` (`borderRadius: '16px'`)
* **내부 여백**: `20px` (`padding: '20px'`)
* **글래스 블러**: `16px` (`backdropFilter: 'blur(16px)'`)
* **테두리 스펙**: 1px 두께, `$glass-border`
* **텍스트 사양**: 폰트 Inter, 크기 `16px`, 두께 `600`, 색상 `#000000`
* **연결 핸들 (Handles)**:
  * 형태: 지름 `12px` 원형 (Top: x=94, y=-6 / Bottom: x=94, y=44)
  * 색상: 채우기 `#000000`, 2px 흰색 테두리
