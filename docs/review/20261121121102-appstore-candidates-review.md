작성일: 2026년 11월 21일
작성자: ChatGPT (이메일 미제공)

# 🔍 한국 App Store 광역 후보 조사

## 📖 개요

사용자 요청에 따라 TOP 100까지 범위를 넓혔다. 2026년 11월 21일 KST에 Apple 공식 RSS의 대한민국 교육·가족 무료·유료 차트를 각각 최대 100개 요청하고, 공식 어린이 추천 및 관련 개발사 앱을 추가 검토했다. 네 차트 총 396개 행이며 중복 제거 앱 수가 아니다. 다운로드 수·시장 점유율을 뜻하지 않는다.

## 🧩 주요 내용

### 🗂 조사 범위와 근거

| 차트 | 요청/반환 | 스냅샷 |
|---|---|---|
| [교육 무료](https://itunes.apple.com/kr/rss/topfreeapplications/limit=100/genre=6017/json) | 100 / 100 | [JSON](../../test/20261121121102-kr-education-free-top100.json) |
| [교육 유료](https://itunes.apple.com/kr/rss/toppaidapplications/limit=100/genre=6017/json) | 100 / 96 | [JSON](../../test/20261121121102-kr-education-paid-top100.json) |
| [가족 무료](https://itunes.apple.com/kr/rss/topfreeapplications/limit=100/genre=7009/json) | 100 / 100 | [JSON](../../test/20261121121102-kr-family-free-top100.json) |
| [가족 유료](https://itunes.apple.com/kr/rss/toppaidapplications/limit=100/genre=7009/json) | 100 / 100 | [JSON](../../test/20261121121102-kr-family-paid-top100.json) |

원본 feed updated는 `2026-11-20T19:11:31-07:00`이며 수집 시각은 각 JSON의 fetchedAt이다. RSS는 application feed라 기기별 iPhone/iPad 순위를 따로 보장하지 않는다. 공개 iPhone 차트 HTML은 25개만 노출돼 [교육 차트](https://apps.apple.com/kr/iphone/charts/6017?chart=top-free)의 일부 결과와 교차 확인했으나 RSS와 순서 차이가 있다. 서로 다른 시각·노출 채널의 순위를 합치지 않는다.

[공식 어린이 추천](https://apps.apple.com/kr/iphone/grouping/136469)은 순위와 별개로 참고했다. 모든 행의 이름·분야를 1차 훑어본 뒤 성인 시험·행정·학습 관리·채팅/경쟁/라이선스 의존 후보를 이번 첫 MVP에서 제외하고, 소규모 학습·창작 활동을 우선 심화 검토했다. 396개 앱을 설치하거나 모든 연령 적합성을 개별 인증한 조사는 아니다. 이름·분야만으로 안전성이나 광고 유무를 판정하지 않았다.

### 🧩 심화 후보 9개

| 앱 | 발견 경로 | 핵심 경험 후보 | 판단 |
|---|---|---|---|
| [몬테소리 아이 수학 : MONTEMATH](https://apps.apple.com/kr/app/%EB%AA%AC%ED%85%8C%EC%86%8C%EB%A6%AC-%EC%95%84%EC%9D%B4-%EC%88%98%ED%95%99-montemath/id6759973478?uo=4) | 교육 유료 17위 | 수량·수 기호 대응 | 다음 콘텐츠 후보 · 도형 첫 MVP보다 교구 규칙 검증 범위 큼 |
| [우끼는 채소! 어린이와 유아에게 교육적인 게임.](https://apps.apple.com/kr/app/%EC%9A%B0%EB%81%BC%EB%8A%94-%EC%B1%84%EC%86%8C-%EC%96%B4%EB%A6%B0%EC%9D%B4%EC%99%80-%EC%9C%A0%EC%95%84%EC%97%90%EA%B2%8C-%EA%B5%90%EC%9C%A1%EC%A0%81%EC%9D%B8-%EA%B2%8C%EC%9E%84/id724786142?uo=4) | 교육 유료 85위 | 모양·짝·분류 | 후속 후보 · 여러 활동 중 하나로 축소 필요 |
| [Busy Shapes](https://apps.apple.com/kr/app/busy-shapes/id722784048?uo=4) | 이번 TOP 100 미포함; 관련 개발사 앱 | 도형과 빈자리 대응 | 주요 메커닉 참고 · 드래그·자동 난이도는 제외 |
| [Busy Shapes & Colors](https://apps.apple.com/kr/app/busy-shapes-colors/id1209114575?uo=4) | 이번 TOP 100 미포함; 관련 개발사 앱 | 도형·색 대응 | 첫 콘텐츠의 주요 분석 대상 · 모양 한 규칙으로 축소 |
| [Khan Academy Kids](https://apps.apple.com/kr/app/khan-academy-kids/id1378467217?uo=4) | 공식 어린이 추천; TOP 100 미포함 | 초기 수학·문해·모양 | 한국어 자체 안내와 작은 활동 단위 참고 |
| [Pok Pok | Montessori Preschool](https://apps.apple.com/kr/app/pok-pok-montessori-preschool/id1550204730?uo=4) | 공식 어린이 에디터 추천; TOP 100 미포함 | 열린 탐색·창작 | 저압박 경험 참고 · 직접 플레이 미검증 |
| [몬테소리 유치원](https://apps.apple.com/kr/app/%EB%AA%AC%ED%85%8C%EC%86%8C%EB%A6%AC-%EC%9C%A0%EC%B9%98%EC%9B%90/id1138436619?uo=4) | 공식 어린이 추천; TOP 100 미포함 | 수학·기하·예술 | 영역 구분 참고 · 구독·대시보드는 제외 |
| [Sago Mini School Toddler Games](https://apps.apple.com/kr/app/sago-mini-school-toddler-games/id1483068197?uo=4) | 공식 어린이 추천; TOP 100 미포함 | 도형·감정·초기 학습 | 자체 안내 설계 참고 · 캐릭터·학습 효과 주장 제외 |
| [Thinkrolls: 어린이 게임](https://apps.apple.com/kr/app/thinkrolls-%EC%96%B4%EB%A6%B0%EC%9D%B4-%EA%B2%8C%EC%9E%84/id1530907314?uo=4) | 공식 어린이 추천; TOP 100 미포함 | 논리·경로·퍼즐 | 고연령 후속 후보 · 공유·프로필 제외 |

### 📖 가격·평가·버전 메타데이터

아래는 같은 작업에서 Apple Lookup으로 직접 확인한 값이다. 무료는 초기 다운로드 가격이며 구독·앱 내 구입 무료를 뜻하지 않는다. 연령값은 API의 contentAdvisoryRating이며 공개 페이지의 한국 등급 ‘전체’와 표기가 다를 수 있다.

| 앱 | 개발자 | 초기 가격 | 버전 | API 등급 | 평점 / 평가 수 |
|---|---|---|---|---|---|
| 몬테소리 아이 수학 : MONTEMATH | Aneesh Pradeep | ￦1,100 | 3 | 4+ | 0.00 / 0 |
| 우끼는 채소! 어린이와 유아에게 교육적인 게임. | DOG&FROG Educational preschool kids games for girls and boys, toddlers and babies | ￦6,600 | 2.0 | 4+ | 3.83 / 6 |
| Busy Shapes | EDOKI ACADEMY | ￦4,400 | 1.9 | 4+ | 3.38 / 13 |
| Busy Shapes & Colors | EDOKI ACADEMY | 무료 | 2.1 | 4+ | 3.76 / 87 |
| Khan Academy Kids | Khan Academy | 무료 | 9.0.3 | 4+ | 4.88 / 2545 |
| Pok Pok | Montessori Preschool | Pok Pok | 무료 | 50.0.0 | 4+ | 4.75 / 68 |
| 몬테소리 유치원 | EDOKI ACADEMY | 무료 | 6.6.2 | 4+ | 4.19 / 1076 |
| Sago Mini School Toddler Games | Piknik | 무료 | 6.3.0 | 4+ | 4.53 / 222 |
| Thinkrolls: 어린이 게임 | AVOKIDDO | 무료 | 5.18 | 4+ | 4.49 / 226 |

원문 URL·언어·메타데이터 출처는 [후보 메타데이터 스냅샷](../../test/20261121121102-candidate-metadata.json)에 보존했다. 공개 페이지와 평가 수·순위가 다르면 같은 시점의 값으로 합성하지 않는다. 광고·권한·실제 온보딩은 직접 플레이 미실시로 미확인이다. 공개 설명의 광고 없음·학습 효과 등은 개발사 주장으로 구분한다.

### 🔑 첫 콘텐츠 선정

‘모양 정원’으로 확정한다. 도형 대응 메커닉은 Busy Shapes 계열을 주요 참고로 하되, 원작 화면·레벨·캐릭터는 복제하지 않는다. Pok Pok에서 소개하는 저압박 탐색 방향을 참고해 결과가 작은 꽃으로 이어지도록 자체 설계한다. 이유는 한 규칙·자체 문제 생성·그림 시범·비교 없는 힌트로 작은 완결 경험을 검증하기 좋기 때문이다. 차트 최상위 앱 또는 임상적으로 발달 효과가 입증된 앱을 선택했다는 뜻은 아니다.

후속 우선순위는 수량 대응 ‘하나둘 소풍’, 자유 창작 ‘소리 그림’, 논리 경로 활동 순으로 제안한다. 이번 구현은 첫 콘텐츠 하나와 목록까지다.

## 📌 요약 정보

396개 차트 행을 1차 검토하고 공식 추천·관련 앱을 더해 9개를 비교했다. 최종 선정은 자체 도형 대응 놀이 ‘모양 정원’이다. 원작 직접 플레이·결제·계정 생성은 하지 않았다.

---

🙏 감사합니다!
