// 목록·31개 놀이 화면에서 같은 자체 로고와 워드마크를 사용한다.
export function brandMarkup(base = '.') {
  return `<span class="brand-mark"><img src="${base}/shared/logo.svg" width="52" height="52" alt=""></span><span class="brand-wordmark"><span class="brand-name">작은 <span>발견</span></span><small>LITTLE WONDERS</small></span>`;
}
