# 🧠 Funny Todo — funnyhun's Idea-Flow Engine

> **아이디어를 구조화하고, 블로그 주제를 확장하며, 워크플로우를 관리하는 퍼니훈 전용 생산성 앱**

---

## 📌 프로젝트 개요

**Funny Todo**는 단순한 할 일 관리 앱이 아닙니다.  
개발자 **funnyhun**의 고유한 work-flow와 life-flow를 반영한 **아이디어 뱅크 + 노드 기반 지식 확장 도구**입니다.

기존의 TODO 앱이 "무엇을 해야 하는가"에 집중한다면,  
Funny Todo는 **"아이디어가 어떻게 연결되고, 어떤 순서로 실현되는가"**에 집중합니다.

---

## ✨ 핵심 기능

### 1. 🏦 Idea Bank — 구조화된 아이디어 체인

아이디어는 단독으로 존재하지 않습니다.  
Funny Todo에서 아이디어는 **상위-하위 체인**과 **순차적 단계**를 가집니다.

```
[A] ──┬── [B] (하위 · 선행 조건)
      └── [C] (하위 · 선행 조건)
      │
      ▼
     [D] (다음 단계 · A 완수 시 활성화)
```

- **선행 조건(Prerequisites)**: A를 완수하려면 B와 C가 먼저 완료되어야 함
- **자동 활성화(Auto-activation)**: A 완수 시 D가 자동으로 활성화
- **체인 시각화**: 아이디어 간의 관계를 직관적으로 파악

### 2. 🔗 Blog Node Graph — 게시글 주제 확장

블로거 funnyhun을 위한 **노드 기반 주제 확장 시스템**입니다.

- 게시글 A를 작성하는 과정에서 새로운 주제 B, C가 떠오를 때
- 별도의 **Node Canvas** 화면에서 주제 간 관계를 시각적으로 매핑
- 노드를 클릭하면 해당 주제의 상세 내용을 편집 가능
- 게시글 간의 연결고리를 통해 시리즈/연관 포스트 관리

### 3. 📅 Date & Period — 기간 설정

모든 아이디어와 작업에 날짜와 기간을 설정할 수 있습니다.

- **단일 날짜**: 마감일 또는 목표일
- **기간 범위**: 시작일 ~ 종료일
- **타임라인 뷰**: 설정된 기간 기반 시각화

---

## 🛠 기술 스택

| 영역 | 기술 |
|------|------|
| **Frontend** | Next.js (React) |
| **스타일링** | Vanilla CSS (Design Token 기반) |
| **상태관리** | React Context + useReducer |
| **Backend/DB** | Supabase (PostgreSQL + Auth + Realtime) |
| **배포** | Vercel |
| **디자인** | Stitch (Google AI 프로토타이핑) |

---

## 📐 데이터 모델 (핵심)

```
┌─────────────┐       ┌──────────────────┐
│    Idea      │──────▶│  IdeaRelation    │
│              │       │                  │
│ · id         │       │ · parent_id      │
│ · title      │       │ · child_id       │
│ · content    │       │ · relation_type  │
│ · status     │       │   (prerequisite  │
│ · start_date │       │    / sequential) │
│ · end_date   │       └──────────────────┘
│ · type       │
│   (idea/blog)│       ┌──────────────────┐
│ · created_at │──────▶│   BlogNode       │
│ · updated_at │       │                  │
└─────────────┘       │ · source_id      │
                       │ · target_id      │
                       │ · label          │
                       │ · position_x     │
                       │ · position_y     │
                       └──────────────────┘
```

---

## 📁 프로젝트 구조

```
funny-todo/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.js           # 메인 대시보드
│   │   ├── ideas/            # 아이디어 뱅크
│   │   ├── nodes/            # 블로그 노드 그래프
│   │   └── layout.js         # 공통 레이아웃
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── IdeaCard/
│   │   ├── IdeaChain/
│   │   ├── NodeCanvas/
│   │   ├── DatePicker/
│   │   └── common/
│   ├── contexts/             # 상태 관리
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # 유틸리티 & Supabase 클라이언트
│   └── styles/               # 글로벌 CSS & 디자인 토큰
├── public/                   # 정적 자산
├── supabase/                 # Supabase 마이그레이션
└── README.md
```

---

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 환경변수 설정 (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📊 MVP 로드맵

### Phase 1: Foundation
- [x] 프로젝트 초기 설정 및 리포지토리 구성
- [x] README 작성 및 프로토타입 디자인
- [ ] Supabase 데이터베이스 스키마 설계
- [ ] Next.js 프로젝트 초기화

### Phase 2: Idea Bank Core
- [ ] 아이디어 CRUD
- [ ] 상위-하위 체인 연결
- [ ] 순차적 단계 설정
- [ ] 자동 활성화 로직

### Phase 3: Blog Node Graph
- [ ] 노드 캔버스 UI
- [ ] 노드 간 연결 (Edge) 생성
- [ ] 노드 드래그 & 위치 저장

### Phase 4: Date & Polish
- [ ] 날짜/기간 설정 기능
- [ ] 타임라인 뷰
- [ ] UI/UX 폴리싱

---

## 👤 만든 사람

**funnyhun** — 개발자, 블로거, 아이디어 수집가

---

## 📄 License

MIT License
