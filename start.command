#!/bin/zsh
# Finder에서 열거나 터미널에서 실행한다. 실행 위치와 무관하게 이 프로젝트만 제공한다.
project_root="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)" || exit 1
if ! command -v python3 >/dev/null 2>&1; then
  print -u2 'python3를 찾지 못했습니다. Python 3 설치 상태를 확인해 주세요.'
  read '?엔터를 누르면 창을 닫습니다.'
  exit 1
fi
python3 "$project_root/tools/serve.py"
server_result=$?
if (( server_result != 0 )); then
  read '?오류를 확인한 뒤 엔터를 누르면 창을 닫습니다.'
fi
exit "$server_result"
