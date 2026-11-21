작성일: 2026년 11월 21일
작성자: ChatGPT (이메일 미제공)

# 🔍 참고 프로젝트 구조 리뷰

## 📖 개요

검토 대상은 `../studio-game-appstore`다. 루트 문서·가이드·목록 데이터·대표 구현 코드를 읽어 문서 및 구조를 검토했다. 서버 실행·전체 게임 플레이·정답 및 성능 검증은 수행하지 않았다.

## 🧩 주요 내용

### 🔗 확인 근거

| 대상 파일 | 확인한 구조 |
|---|---|
| `../studio-game-appstore/AGENTS.md` | 한국어 협업·Git·산출물·문서 관리 규칙 |
| `../studio-game-appstore/README.md`, `../studio-game-appstore/GLANCE.md` | 정적 서버 7901, 게임 13종 현황, 실행·문서 색인 |
| `../studio-game-appstore/docs/guide/guide.md` | 리뷰·계획·구현·로컬 검증 흐름 |
| `../studio-game-appstore/docs/guide/guide-game-review.md` | 원작 출처·메커닉·자체 표현 기준 |
| `../studio-game-appstore/docs/guide/guide-game-build.md` | Canvas·ES Modules·독립 폴더·Safari·저장소 예외 처리 |
| `../studio-game-appstore/games/catalog.js` | 목록 데이터를 한곳에서 관리, playable/planned 상태 |
| `../studio-game-appstore/games/metro-sketch/src/game.js` | 규칙을 DOM에서 분리, 시드 난수·난이도·시간 흐름 정의 |
| `../studio-game-appstore/games/metro-sketch/README.md` | 조작·기술·검증·제약 기록 |
| `../studio-game-appstore/docs/tools/md_to_html.py` | 표준 라이브러리 기반 MD 변환, 문서 테마 설정 |

### 🧩 계승과 변경

| 항목 | 판단과 현재 적용 |
|---|---|
| 단계별 기록·독립 구현 | 계승. 리뷰·계획·검증의 연결을 유지 |
| 단일 목록 데이터 | 계승하되 games 대신 apps, 연령·목표·분야·검증 상태 추가 |
| Canvas 기본 | 변경. 교육·접근성 UI에는 DOM 우선, 필요할 때 Canvas |
| 점수·타임 어택 중심 | 변경. 작은 성공·힌트·재시도·활동 종료 중심 |
| 게임만 분류 | 확장. 게임·교육·창작을 같은 콘텐츠 계약으로 관리 |
| 단계마다 사용자 확인 | 승인된 작업은 연속 수행하도록 변경, 범위 변경만 확인 |
| 원작 표현 제외 | 계승하고 자체 학습 문제·그림·설명 검토 추가 |
| 문서 HTML 생성 | 이번에는 보류. Markdown 정본만 두며 변환기 없는 재생성 명령을 넣지 않음 |
| 저장 및 검증 | 계승하고 데이터 최소화·초기화 범위·정답 및 오답 대응 추가 |

### ⚠️ 이식 시 주의점

참고 프로젝트의 실제 폴더명은 `studio-game-appstore`지만 내부 문서에는 `studio-game-apple` 명칭이 남아 있다. 기존 REPO·원격 URL·포트·브랜드·게임 13종·진행 상태·작성자 정보를 현재 프로젝트 사실로 복사하지 않았다. 초기 확인 때 Git이 없었으나 최종 확인에서 초기 커밋 없는 로컬 `main`과 origin 설정을 발견했다. 초기화와 원격 연결은 이 작업에서 실행하지 않았으며 커밋·푸시도 하지 않았다.

## 📌 요약 정보

참고 프로젝트의 강점은 단순한 실행과 산출물 추적이다. 현재 프로젝트에는 연령·학습·조작·개인정보 기준을 더하고, 구현 완료와 검증 완료를 구분한다. 참고 프로젝트 변경은 없다.

---

🙏 감사합니다!
