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
| Git / 원격 / 기본 브랜치 | Git 구성·초기 커밋 완료 / `https://github.com/cafewill/studio-boos-appstore.git` / `main` |
| 참고 프로젝트 | `../studio-game-appstore` (변경하지 않음) |
| 대상 | 게임·교육·창작·자유 놀이, 콘텐츠별 연령군 지정 |
| 구현 위치 | `apps/{slug}/`, 첫 콘텐츠 `shape-garden` |
| 목록 데이터 / 화면 | `apps/catalog.js` / `apps/index.html` |
| 루트 진입점 | `index.html` → `apps/` |
| 실행 | `start.command` 또는 `python3 tools/serve.py` (기본 Python 정적 서버 방식도 유지) |
| 접속 | `http://127.0.0.1:7902/apps/` 및 `/apps/shape-garden/` |
| 상태 | 기존 41개 + 다음 후보 30개 = 71개 implemented. 자동 규칙·구조 검사 통과, 브라우저 미실시 |

Git 초기화와 origin 연결은 사용자가 수행했다. 초기 구성은 `eef1f8d`로 main에 커밋·푸시 완료했다. 이전 구현·UI 개선은 PR #1, main 머지 `606b5be`까지 반영했다. 추가 10개는 PR #2·main 머지 `5212c1b`로 반영했다. 다음 30개는 PR #3·main 머지 `7b16224`로 반영했다. 현재 목록 상단 개수 개선은 `feature/20261121203131-chatgpt-boos-appstore-catalog-counts`에서 진행하며 이번 변경은 커밋·푸시하지 않았다.

포트 `7902`는 이 프로젝트의 기본값이며 참고 프로젝트 `7901`과 구분한다. 점유 시 `lsof -nP -iTCP:7902 -sTCP:LISTEN`으로 확인하고 다른 작업 프로세스를 종료하지 않는다. 서버 실행 자체를 오프라인 앱 지원으로 간주하지 않는다. 외부 인터넷 없이 같은 로컬 서버에서 실행하는 것이 기본이며 서버 없는 실행·PWA는 별도 범위다.

### 🔗 문서 색인

| 문서 | 내용 / 현행화 시점 |
|---|---|
| [AGENTS.md](AGENTS.md) | 협업·Git·문서 규칙 / 운영 변경 |
| [README.md](README.md) | 프로젝트 진입점 / 목적·실행 변경 |
| [장시간 작업 보고](docs/guide/guide-progress-report.md) | 5분 이상 작업의 매 5분 중간 보고 / 향후 작업 공통 |
| [가이드 목차](docs/guide/guide.md) | 상세 가이드 연결 / 가이드 증감 |
| [독립 제작·권리 검토](docs/guide/guide-originality-rights.md) | 저작권·라이선스·독립 표현·완료 검토 / 권리 기준 변경 |
| [구조와 유지보수](docs/guide/guide-content-architecture.md) | 공통 계층·의존 방향·실행 계약·호환성 / 전환 진행 중 |
| [로컬 실행·진단](docs/guide/guide-local-run.md) | start.command·Python 실행기·포트·health·권한 오류 |
| [콘텐츠 조사·리뷰](docs/guide/guide-content-review.md) | 출처·후보·리뷰 템플릿 / 조사 기준 변경 |
| [아이들용 설계](docs/guide/guide-child-design.md) | 연령·학습·정서·컬러·용어·네이밍·안전·접근성 / 설계 기준 변경 |
| [Fascinating 반응형 UI](docs/guide/guide-fascinating-ui.md) | 커스텀 UI·직관적 상호작용·반응형·HTML 의미 / UI 기준 변경 |
| [구현 가이드](docs/guide/guide-content-build.md) | 구조·기술·목록 데이터·계획 / 실행 및 구현 변경 |
| [검증 가이드](docs/guide/guide-content-verify.md) | 기능·학습·기기·저장 검증 / 완료 기준 변경 |
| [리뷰 목차](docs/review/review.md) | 참고 프로젝트 및 원작 분석 목록 / 리뷰 증감 |
| [참고 프로젝트 리뷰](docs/review/20261121-reference-project-review.md) | 검토 근거·계승·개선 / 참고 구조 재검토 |
| [계획 목차](docs/plan/plan.md) | 구현 계획 목록 / 계획 증감 |
| [초기 로드맵](docs/plan/20261121-bootstrap-plan.md) | 문서 구성과 첫 콘텐츠 제안 / 범위·진척 변경 |

### 🔗 첫 콘텐츠와 조사 산출물

| 문서·파일 | 내용 |
|---|---|
| [후보 조사](docs/review/20261121121102-appstore-candidates-review.md) | 한국 교육·가족 무료/유료 최대 100개씩 요청, 총 396행·후보 9개 |
| [모양 정원 리뷰](docs/review/20261121121102-shape-garden-review.md) | 원작 공식 소개·자체 규칙·범위 |
| [모양 정원 계획](docs/plan/20261121121102-shape-garden-plan.md) | 연령·표현·상태·저장·검증 |
| [모양 정원 README](apps/shape-garden/README.md) | 조작·자체 제작·권리·제한 |
| [검증 기록](test/20261121121102-shape-garden-verify.md) | 통과·실패·미실시 구분 |
| `tools/verify-shape-garden.mjs` | 규칙·저장·대비 자동 검증 |
| `tools/verify-project.py` | 문서·모듈·정적 참조 검사 |

브라우저 검증 제한: 과거 서버 바인딩 권한 오류·시스템 Chrome SIGABRT가 있었고, 이번에도 Chrome이 실행 직후 종료됐다. 단일 HTTP 응답은 확인했으나 전체 묶음 HTTP 요청은 실패했다. 제한 없는 로컬 환경에서 실행·플레이 검증 후에만 verified로 변경한다. 운영체제 시스템 글꼴과 자체 SVG·Web Audio만 사용하며 외부 에셋·폰트·분석 요청은 없다.

### 🎨 공통 브랜드와 목록 화면

자체 컬러 SVG 로고는 `apps/shared/logo.svg`, 워드마크는 `apps/shared/brand.js`에서 관리한다. 목록과 71개 활동 헤더·파비콘에 적용한다. 목록 삽화는 그림만 잘라내고 캡션은 별도 흐름으로 둔다. 820px 이하에서는 데스크톱 소개를 숨기고 살펴보기·생각하기·표현하기 선택과 실제 링크가 바뀌는 발견 카드로 재구성한다. 목록은 그림/내용을 나란히 배치한 탐색 카드로 전환한다. 관련 원칙은 Fascinating UI 가이드, 검증은 선택적 verify-browser의 화면 폭별 캡션·넘침·로고 검사에 포함한다. 실제 브라우저 실행을 못 한 검사를 통과로 표시하지 않는다.

### 🔢 목록 상단의 플레이 가능 개수

전체·배우기·생각놀이·표현놀이의 개수를 apps/catalog-summary.js에서 집계한다. implemented·verified만 포함하며 상단과 하단 필터는 같은 기준을 쓴다. 상단은 검색 전 전체 수, 목록은 현재 결과 수를 안내한다. 넓은 화면은 네 카드, 960px 이하에서는 두 열로 재배치한다. 카드를 선택하면 연령·검색을 초기화해 해당 분야의 전체 목록을 보여 준다.

[검증 기록](test/20261121203131-catalog-counts-verify.md) · tools/verify-catalog-summary.mjs.

### 🌈 시각적 차별화 상태

코드 계약의 일관성과 놀이 화면의 다양성을 분리한다. 전체 71개의 핵심 규칙 MVP 구현을 고유 아트·장면·연출 완성으로 해석하지 않는다. 1차로 counting-picnic의 소풍 돗자리·사과·바구니, vegetable-pairs의 텃밭 부엌·도마·접시, toy-shelves의 장난감 방·수납 서랍을 개별 view/style로 분리했다. 다른 콘텐츠의 고유 장면과 시작/완료 표현은 추가 검토 대상이며 전체의 시각적 다양성이 검증됐다고 표시하지 않는다.

### 🗂 기존 30개 구현 기반과 유지보수

| 경로 | 역할 |
|---|---|
| [30개 일괄 계획](docs/plan/20261121143203-batch30-plan.md) | 콘텐츠별 이름·경험·범위 |
| [원작 대응표](docs/review/20261121143203-priority30-review.md) | 우선 후보 30개와 개별 리뷰 연결 |
| [묶음 검증](test/20261121143203-batch30-verify.md) | 자동 검사와 로컬 확인 절차 |
| `apps/content-registry.js` | 추가 70개 메타데이터 정본 |
| `apps/shared/` | 공통 호스트·표현·저장·오디오·수명주기 |
| `tools/check-all.mjs` | 전체 자동 검사 진입점 |
| `tools/create-content.py` | 미등록 작업 초안 생성, 기존 파일 덮어쓰기 금지 |

현재 상단 플레이 가능 개수 개선은 별도 feature 브랜치의 미커밋 변경이다. 이번 변경의 외부 배포·커밋·푸시는 하지 않았다. 문서와 로그는 제작 범위의 근거이며 브라우저·교육 효과·법률 검토의 보증이 아니다.

### 🗂 산출물과 상태 규칙

- 리뷰: `docs/review/{TS}-{slug}-review.md`.
- 계획: `docs/plan/{TS}-{slug}-plan.md`.
- 검증: `test/{TS}-{slug}-verify.md`와 같은 접두사의 스크린샷·로그. 첫 검증 때 디렉터리를 만든다.
- 이슈·프롬프트 문서는 필요할 때 `docs/issue/issue.md`·`docs/prompt/prompt.md` 목차와 함께 만든다.
- TS는 KST `YYYYMMDDHHMMSS`. 이번 초기 구성 문서는 고정 날짜 `20261121`을 사용했다.
- 콘텐츠 상태: `proposed` → `reviewed` → `planned` → `implemented` → `verified`. `verified`는 해당 검증 기록이 있어야 한다.
- 등록 71개 모두 implemented. counting-picnic·sound-paint를 포함한 신규 30개 독립 폴더가 있다. verified는 0개이며 실제 로컬 플레이 확인을 기다린다.

### 📖 문서 표준

Markdown을 정본으로 관리한다. HTML 변환기와 HTML 짝은 아직 없다. 각 문서는 개요·주요 내용·요약 정보 및 작성일·작성자·마침 문구를 유지한다. 가이드 내용은 해당 문서에만 상세히 두고 나머지는 링크한다. 연령 등급·순위·정책 등 변동 정보는 조사 시점에 원문을 확인하고 URL과 확인일을 기록한다.

### 🌍 가능성 탐색용 추가 10개

- [10개 분야 확장 계획](docs/plan/20261121165150-expand10-plan.md), [개별 조사 연결](docs/review/20261121165150-expand10-review.md), [묶음 검증](test/20261121165150-expand10-verify.md).
- 식물·물의 순환·우주·몸·톱니·분배·코딩·발굴·분수·균형을 포함한다. 각각 자체 cover.svg·장면·scoped CSS를 가진다.
- 정확한 스토어 ID 10개를 공식 Lookup KR에서 확인했다. TOP 100 전체 최신화나 원작 설치 플레이를 수행한 것은 아니다.
- `tools/verify-expand10.mjs`가 불변 조건·혼합 탐색 후 복구·힌트의 활성 버튼 연결을 검사한다. 자동 검증으로 브라우저 검증을 대신하지 않는다.

### 🌈 다음 후보 30개와 누적 71개

[후보 대응표](docs/review/20261121194717-next30-review.md) · [계획](docs/plan/20261121194717-next30-plan.md) · [검증](test/20261121194717-next30-verify.md).

기존 스냅샷 396개에서 미사용 ID 30개를 공식 Lookup KR로 재확인했다. 각 콘텐츠는 자체 규칙·뷰·아트·scoped CSS를 가진다. 순수 탐색 알고리즘은 shared/search.js, 표현 도구는 shared/exploration-ui.js·exploration.css에 둔다.

HTTP로 새 페이지 제공은 확인했으나 브라우저 자동화는 실행 직후 종료돼 플레이 검증을 완료하지 못했다. 기존 서버 health의 개수는 시작 시 스냅샷이므로 현재 등록 개수와 다를 수 있다. 새 규칙 검증은 tools/verify-next30.mjs, HTTP 제공 검사는 tools/verify-http.mjs다.

## 📌 요약 정보

진행 순서: 후보 조사 → 원작 리뷰 → 연령·학습 목표와 MVP 계획 → 구현 → 검증 → 로컬 리뷰. 누적 71개 핵심 MVP를 공통 계약으로 구현했다. 다음 단계는 분야별 가능성을 로컬에서 비교하고 유망한 콘텐츠의 깊이를 확장하는 것이다.

---

🙏 감사합니다!
