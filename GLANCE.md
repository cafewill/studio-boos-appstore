작성일: 2026년 11월 21일
작성자: ChatGPT (이메일 미제공)

# 👀 프로젝트 현황과 문서 색인

## 📖 개요

`studio-boos-appstore`는 아이들용 App Store 콘텐츠를 분석해 독립 웹 콘텐츠로 재구현한다. 기존 게임 프로젝트의 리뷰·계획·구현·검증 구조를 계승한다.

## 🧩 주요 내용

### 🗂 현재 상태와 기본값

| 항목 | 기준 |
|---|---|
| 프로젝트 / TOOL | `studio-boos-appstore` / `boos-appstore` |
| Git / 원격 / 기본 브랜치 | 작업 중 Git 초기화 확인 / `https://github.com/cafewill/studio-boos-appstore.git` / 로컬 초기 브랜치 `main`, 원격 기본값 미확인 |
| 참고 프로젝트 | `../studio-game-appstore` (변경하지 않음) |
| 대상 | 게임·교육·창작·자유 놀이, 콘텐츠별 연령군 지정 |
| 구현 위치 | `apps/{slug}/` (첫 구현 시 생성) |
| 목록 데이터 / 화면 | `apps/catalog.js` / `apps/index.html` (예정) |
| 루트 진입점 | `index.html` → `apps/` (예정) |
| 실행 | `python3 -m http.server 7902 --bind 127.0.0.1` |
| 접속 | `http://127.0.0.1:7902/apps/` (구현 후) |
| 상태 | 문서 기반 구성, 구현 콘텐츠 0개, 브라우저 검증 미실시 |

Git 초기화와 origin 연결은 사용자가 수행했다. 이전 작업의 Git 쓰기 권한 제한은 해소되었으며, 사용자의 명시적 지시에 따라 전체 초기 구성을 `main`에 직접 최초 커밋·푸시한다. 이후 일반 작업은 AGENTS의 작업 브랜치 규칙을 따른다.

포트 `7902`는 이 프로젝트의 기본값이며 참고 프로젝트 `7901`과 구분한다. 점유 시 `lsof -nP -iTCP:7902 -sTCP:LISTEN`으로 확인하고 다른 작업 프로세스를 종료하지 않는다. 서버 실행 자체를 오프라인 앱 지원으로 간주하지 않는다. 외부 인터넷 없이 같은 로컬 서버에서 실행하는 것이 기본이며 서버 없는 실행·PWA는 별도 범위다.

### 🔗 문서 색인

| 문서 | 내용 / 현행화 시점 |
|---|---|
| [AGENTS.md](AGENTS.md) | 협업·Git·문서 규칙 / 운영 변경 |
| [README.md](README.md) | 프로젝트 진입점 / 목적·실행 변경 |
| [가이드 목차](docs/guide/guide.md) | 상세 가이드 연결 / 가이드 증감 |
| [콘텐츠 조사·리뷰](docs/guide/guide-content-review.md) | 출처·후보·리뷰 템플릿 / 조사 기준 변경 |
| [아이들용 설계](docs/guide/guide-child-design.md) | 연령·학습·정서·컬러·용어·네이밍·안전·접근성 / 설계 기준 변경 |
| [Fascinating 반응형 UI](docs/guide/guide-fascinating-ui.md) | 커스텀 UI·직관적 상호작용·반응형·HTML 의미 / UI 기준 변경 |
| [구현 가이드](docs/guide/guide-content-build.md) | 구조·기술·목록 데이터·계획 / 실행 및 구현 변경 |
| [검증 가이드](docs/guide/guide-content-verify.md) | 기능·학습·기기·저장 검증 / 완료 기준 변경 |
| [리뷰 목차](docs/review/review.md) | 참고 프로젝트 및 원작 분석 목록 / 리뷰 증감 |
| [참고 프로젝트 리뷰](docs/review/20261121-reference-project-review.md) | 검토 근거·계승·개선 / 참고 구조 재검토 |
| [계획 목차](docs/plan/plan.md) | 구현 계획 목록 / 계획 증감 |
| [초기 로드맵](docs/plan/20261121-bootstrap-plan.md) | 문서 구성과 첫 콘텐츠 제안 / 범위·진척 변경 |

### 🗂 산출물과 상태 규칙

- 리뷰: `docs/review/{TS}-{slug}-review.md`.
- 계획: `docs/plan/{TS}-{slug}-plan.md`.
- 검증: `test/{TS}-{slug}-verify.md`와 같은 접두사의 스크린샷·로그. 첫 검증 때 디렉터리를 만든다.
- 이슈·프롬프트 문서는 필요할 때 `docs/issue/issue.md`·`docs/prompt/prompt.md` 목차와 함께 만든다.
- TS는 KST `YYYYMMDDHHMMSS`. 이번 초기 구성 문서는 고정 날짜 `20261121`을 사용했다.
- 콘텐츠 상태: `proposed` → `reviewed` → `planned` → `implemented` → `verified`. `verified`는 해당 검증 기록이 있어야 한다.
- 현재 콘텐츠 없음. 초기 로드맵의 예시는 원작 조사나 구현 완료를 뜻하지 않는다.

### 📖 문서 표준

Markdown을 정본으로 관리한다. HTML 변환기와 HTML 짝은 아직 없다. 각 문서는 개요·주요 내용·요약 정보 및 작성일·작성자·마침 문구를 유지한다. 가이드 내용은 해당 문서에만 상세히 두고 나머지는 링크한다. 연령 등급·순위·정책 등 변동 정보는 조사 시점에 원문을 확인하고 URL과 확인일을 기록한다.

## 📌 요약 정보

진행 순서: 후보 조사 → 원작 리뷰 → 연령·학습 목표와 MVP 계획 → 구현 → 검증 → 로컬 리뷰. 이번 요청은 문서 구성까지이며 첫 콘텐츠는 별도 구현 작업이다.

---

🙏 감사합니다!
