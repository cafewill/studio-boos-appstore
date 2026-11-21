#!/usr/bin/env python3
"""공통 계약을 따르는 미등록 작업 초안을 만든다. 구현·등록·검증 완료로 간주하지 않는다."""
import argparse
from pathlib import Path
import re

parser = argparse.ArgumentParser()
parser.add_argument('slug')
parser.add_argument('--title', required=True)
parser.add_argument('--dry-run', action='store_true')
args = parser.parse_args()
if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', args.slug):
    parser.error('slug는 소문자·숫자·하이픈만 사용한다.')
if not args.title.strip() or len(args.title) > 40:
    parser.error('title은 1~40자로 작성한다.')
root = Path(__file__).resolve().parent.parent
folder = root / 'apps' / args.slug
if folder.exists():
    parser.error('기존 콘텐츠는 덮어쓰지 않는다.')
files = {
    'src/model.js': "export function createState(seed){throw new Error('활동 규칙 작성 전입니다.');}\nexport function reduce(state,action){return state;}\nexport function hint(state){return null;}\n",
    'src/view.js': "import {note} from '../../shared/board-ui.js';\nexport function render(state){return note('아직 제작 중인 활동입니다.');}\n",
    'src/activity.js': "import {createBoardActivity} from '../../shared/board-activity.js';\nimport * as model from './model.js';\nimport {render} from './view.js';\nexport const createActivity=context=>createBoardActivity(context,model,render);\n",
    'src/main.js': "import {boot} from '../../shared/host.js';\nimport {createActivity} from './activity.js';\nboot('" + args.slug + "',createActivity);\n",
    'index.html': (root / 'apps/counting-picnic/index.html').read_text().replace('하나둘 소풍', __import__('html').escape(args.title)),
    'README.md': '작성일: 확인 필요\n작성자: 확인 필요\n\n# 🌱 '+args.title+' — 작업 초안\n\n## 📖 개요\n\n아직 구현·등록하지 않은 작업 초안이다.\n\n## 🧩 주요 내용\n\n목표·연령·규칙·화면·권리·저장 검증을 작성하고 리뷰·계획·검증 문서를 연결한다. 모델을 작성한 뒤 registry에 추가한다.\n\n## 📌 요약 정보\n\n현 상태는 구현 완료가 아니다.\n\n---\n\n🙏 감사합니다!\n',
}
if args.dry_run:
    print('\n'.join(str(folder.relative_to(root) / name) for name in files))
else:
    for name, source in files.items():
        target = folder / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(source)
    print('작업 초안 생성 완료. 규칙·문서 작성과 registry 등록은 별도로 진행한다.')
