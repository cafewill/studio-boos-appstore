#!/usr/bin/env python3
"""참고 프로젝트와 같은 Python 정적 서버. 작업 디렉터리와 실행 상태를 명확히 한다."""
import argparse
import errno
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import sys
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent.parent
HOST = '127.0.0.1'
PORT = 7902
PROJECT = 'studio-boos-appstore'
URL = f'http://{HOST}:{PORT}'


def check_files():
    registry = (ROOT / 'apps/content-registry.js').read_text()
    records = json.loads(registry.removeprefix('export const NEW_CONTENTS = ').strip().removesuffix(';'))
    slugs = ['shape-garden', *(item['slug'] for item in records)]
    for relative in ['index.html', 'apps/index.html', 'apps/catalog.js', 'apps/shared/host.js', *(f'apps/{s}/index.html' for s in slugs)]:
        if not (ROOT / relative).is_file():
            raise ValueError(f'실행 파일이 없습니다: {relative}')
    return len(slugs)


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.mjs': 'text/javascript'}

    def health(self, body=True):
        payload = json.dumps({'project': PROJECT, 'port': PORT, 'contents': self.server.content_count}).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(payload)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        if body:
            self.wfile.write(payload)

    def do_GET(self):
        if self.path.split('?')[0] == '/_local/health':
            return self.health()
        return super().do_GET()

    def do_HEAD(self):
        if self.path.split('?')[0] == '/_local/health':
            return self.health(False)
        return super().do_HEAD()


def main():
    parser = argparse.ArgumentParser(description='작은 발견 로컬 서버')
    parser.add_argument('--check', action='store_true', help='포트를 열지 않고 진입 파일만 검사')
    args = parser.parse_args()
    count = check_files()
    if args.check:
        print(f'실행 준비 검사 통과: 콘텐츠 {count}개, 진입 파일 정상')
        return 0
    try:
        server = ThreadingHTTPServer((HOST, PORT), partial(Handler, directory=str(ROOT)))
    except OSError as error:
        if error.errno == errno.EADDRINUSE:
            try:
                with urlopen(URL + '/_local/health', timeout=2) as response:
                    state = json.load(response)
                if state.get('project') == PROJECT:
                    print(f'이 프로젝트 서버가 이미 실행 중입니다: {URL}/apps/')
                    return 0
            except Exception:
                pass
            print(f'{PORT} 포트를 다른 프로세스가 사용합니다. 해당 프로세스를 자동 종료하지 않습니다.', file=sys.stderr)
        elif error.errno in (errno.EPERM, errno.EACCES):
            print('현재 실행 환경이 로컬 포트 열기를 차단했습니다. 맥 터미널 또는 start.command에서 실행해 주세요.', file=sys.stderr)
        else:
            print(f'서버 시작 실패: {error}', file=sys.stderr)
        return 1
    server.content_count = count
    print(f'작은 발견 서버 실행 완료 · 콘텐츠 {count}개', flush=True)
    print(f'놀이 목록: {URL}/apps/', flush=True)
    print(f'상태 확인: {URL}/_local/health', flush=True)
    print('이 창을 유지하세요. 종료는 Control+C입니다.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n서버를 종료했습니다.')
    finally:
        server.server_close()
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
