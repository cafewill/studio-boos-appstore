#!/usr/bin/env python3
"""로컬 문서·정적 진입점·ES module 참조 및 출처 범위 검증. 브라우저 검증을 대체하지 않는다."""
from pathlib import Path
import re
import subprocess
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parent.parent
errors = []
references = 0


def reference(source, target):
    global references
    if not target or target.startswith(('#', 'data:', 'mailto:')) or '://' in target:
        return
    if '{' in target or '${' in target:
        return
    clean = target.split('#')[0].split('?')[0]
    candidate = (source.parent / clean).resolve()
    references += 1
    if not candidate.exists():
        errors.append(f'{source.relative_to(ROOT)}: missing {target}')


class Links(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.source = source
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                errors.append(f'{self.source.name}: duplicate id {attrs["id"]}')
            self.ids.add(attrs['id'])
        for attr in ('href', 'src'):
            if attr in attrs:
                reference(self.source, attrs[attr])
                if attrs[attr].startswith(('https://', 'http://')):
                    errors.append(f'{self.source}: external runtime link {attrs[attr]}')


md = sorted(ROOT.glob('*.md')) + sorted((ROOT / 'docs').rglob('*.md')) + sorted((ROOT / 'apps').rglob('*.md')) + sorted((ROOT / 'test').glob('*.md'))
for p in md:
    text = p.read_text()
    for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', text):
        reference(p, target)
    if text.count('```') % 2:
        errors.append(f'{p}: unclosed code fence')
    if p.name != 'AGENTS.md':
        for section in ('작성일:', '작성자:', '## 📖 개요', '## 🧩 주요 내용', '## 📌 요약 정보', '🙏 감사합니다!'):
            if section not in text:
                errors.append(f'{p}: missing {section}')
html = [ROOT / 'index.html'] + sorted((ROOT / 'apps').rglob('*.html'))
for p in html:
    Links(p).feed(p.read_text())
js = sorted((ROOT / 'apps').rglob('*.js'))
for p in js:
    result = subprocess.run(['node', '--check', str(p)], text=True, capture_output=True)
    if result.returncode:
        errors.append(result.stderr)
    for target in re.findall(r"from\s+['\"]([^'\"]+)['\"]", p.read_text()):
        reference(p, target)
for p in (ROOT / 'apps').rglob('*'):
    if p.suffix not in ('.js', '.html', '.css'):
        continue
    text = p.read_text()
    if re.search(r'https?://|@import|XMLHttpRequest|sendBeacon', text):
        errors.append(f'{p}: review external runtime reference')
    if re.search(r'Busy Shapes|Pok Pok|Khan Academy|Sago Mini|EDOKI', text, re.I):
        errors.append(f'{p}: original brand in implementation')
print(f'Markdown {len(md)}, HTML {len(html)}, JS syntax {len(js)}, local references {references}, errors {len(errors)}')
for error in errors:
    print(error)
raise SystemExit(bool(errors))
