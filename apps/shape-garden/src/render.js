import { NAMES, rounds } from './model.js';
import { icon, shape, plant } from '../../shared/garden-art.js';
export { icon, shape };
export function garden(results = [], seed = 0, preview = false) {
  const types = rounds(seed).map(q => q.target);
  const plants = preview ? types.map((t, i) => plant(t, 110 + i * 110, 317 + (i % 2) * 28, .72 + (i % 3) * .12, ['#efad85','#b7ade0','#e3c46b'][i%3])).join('') : results.map((r,i) => r === 'matched' ? plant(types[i],110+i*110,335,.7,['#efad85','#b7ade0','#e3c46b'][i%3]) : `<g transform="translate(${110+i*110} 330)"><path d="M0 0v-25m0 12q-25-24-27-7q10 15 27 7m0-3q22-28 27-12q-5 16-27 12" fill="#b6c99a" stroke="#365d46" stroke-width="3"/></g>`).join('');
  return `<svg class="garden-art" viewBox="0 0 700 410" fill="none" aria-hidden="true"><circle cx="554" cy="78" r="41" fill="#efce75"/><path d="M70 94q28-32 57-9q35-12 49 18H62q-8-5 8-9ZM344 46q16-22 36-12q24-8 38 15h-79Z" fill="#fff"/><path d="M0 307Q140 245 314 291T700 282V410H0Z" fill="#dfe8cf"/><path d="M0 350Q226 274 401 330T700 319V410H0Z" fill="#c4d6b3"/><ellipse cx="350" cy="355" rx="300" ry="25" fill="#b2c5a1"/>${plants}<path d="m48 313 3-15m-3 15-10-8m606 30 5-21m-5 21-9-9" stroke="#718474" stroke-width="3" stroke-linecap="round"/><g transform="translate(595 168) rotate(12)"><ellipse cx="0" cy="0" rx="13" ry="9" fill="#efce75" stroke="#365d46" stroke-width="2"/><path d="M-2-8v16M5-7v14" stroke="#365d46" stroke-width="2"/><ellipse cx="-3" cy="-13" rx="7" ry="9" fill="#fff" stroke="#365d46" stroke-width="2"/><circle cx="9" cy="-1" r="1.5" fill="#365d46"/></g></svg>`;
}
export function progress(results) {
  return `<div class="growth-track" aria-label="다섯 활동 중 ${results.length}개 마침">${Array.from({length:5},(_,i)=>`<span class="growth-dot ${i < results.length ? 'grown' : ''}" aria-hidden="true">${i < results.length ? icon('leaf') : '<span></span>'}</span>`).join('')}</div>`;
}
export function optionMarkup(option, hint = false) {
  return `<button type="button" class="shape-option ${hint ? 'hinted' : ''}" data-shape="${option.shape}" aria-label="${NAMES[option.shape]} 선택">${shape(option.shape, option.color)}<span>${NAMES[option.shape]}</span>${hint ? '<span class="hint-mark">'+icon('sparkle')+'같은 모양</span>' : ''}</button>`;
}
