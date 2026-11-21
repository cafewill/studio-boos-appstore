export function icon(name) {
  const paths = {
    leaf: '<path d="M6 18C3 9 10 3 21 3c0 12-6 17-15 15Z"/><path d="m5 21 10-11"/>',
    home: '<path d="m3 11 9-8 9 8M6 10v11h12V10M10 21v-7h4v7"/>',
    sound: '<path d="m11 4-6 5H2v6h3l6 5V4ZM16 8c3 2 3 6 0 8M19 4c6 5 6 11 0 16"/>',
    mute: '<path d="m11 4-6 5H2v6h3l6 5V4ZM16 9l6 6m0-6-6 6"/>',
    pause: '<path d="M8 4v16M16 4v16"/>',
    settings: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="16" cy="17" r="3"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    play: '<path d="m9 5 10 7-10 7V5Z"/>',
    sparkle: '<path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6L12 2Z"/>',
    help: '<path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5M12 17v.1"/><circle cx="12" cy="12" r="10"/>',
    check: '<path d="m5 12 4 4L20 5"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.leaf}</svg>`;
}
export function shape(type, fill = '#efad85', extra = '') {
  const path = type === 'circle' ? '<circle cx="50" cy="50" r="32"/>' : type === 'triangle' ? '<path d="m50 14 37 66H13Z" stroke-linejoin="round"/>' : '<rect x="20" y="20" width="60" height="60" rx="4"/>';
  return `<svg class="shape-art ${extra}" viewBox="0 0 100 100" fill="${fill}" stroke="#365d46" stroke-width="3" aria-hidden="true">${path}</svg>`;
}
export function plant(type, x, y, scale = 1, color = '#efad85') {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M0 0Q-9-55 0-105" fill="none" stroke="#365d46" stroke-width="5"/><path d="M-2-35Q-62-78-48-27Q-27-12-2-35Z" fill="#97bdaf" stroke="#365d46" stroke-width="2"/><path d="M-1-62Q48-110 47-63Q25-39-1-62Z" fill="#b6c99a" stroke="#365d46" stroke-width="2"/><g transform="translate(-46 -153)">${shape(type,color).replace('<svg','<svg width="92" height="92"')}</g></g>`;
}
export function garden(results = [], seed = 0, preview = false) {
  const types = ['circle','triangle','square','circle','triangle'];
  const plants = preview ? types.map((t, i) => plant(t, 110 + i * 110, 317 + (i % 2) * 28, .72 + (i % 3) * .12, ['#efad85','#b7ade0','#e3c46b'][i%3])).join('') : results.map((r,i) => r === 'matched' ? plant(types[i],110+i*110,335,.7,['#efad85','#b7ade0','#e3c46b'][i%3]) : `<g transform="translate(${110+i*110} 330)"><path d="M0 0v-25m0 12q-25-24-27-7q10 15 27 7m0-3q22-28 27-12q-5 16-27 12" fill="#b6c99a" stroke="#365d46" stroke-width="3"/></g>`).join('');
  return `<svg class="garden-art" viewBox="0 0 700 410" fill="none" aria-hidden="true"><circle cx="554" cy="78" r="41" fill="#efce75"/><path d="M70 94q28-32 57-9q35-12 49 18H62q-8-5 8-9ZM344 46q16-22 36-12q24-8 38 15h-79Z" fill="#fff"/><path d="M0 307Q140 245 314 291T700 282V410H0Z" fill="#dfe8cf"/><path d="M0 350Q226 274 401 330T700 319V410H0Z" fill="#c4d6b3"/><ellipse cx="350" cy="355" rx="300" ry="25" fill="#b2c5a1"/>${plants}<path d="m48 313 3-15m-3 15-10-8m606 30 5-21m-5 21-9-9" stroke="#718474" stroke-width="3" stroke-linecap="round"/><g transform="translate(595 168) rotate(12)"><ellipse cx="0" cy="0" rx="13" ry="9" fill="#efce75" stroke="#365d46" stroke-width="2"/><path d="M-2-8v16M5-7v14" stroke="#365d46" stroke-width="2"/><ellipse cx="-3" cy="-13" rx="7" ry="9" fill="#fff" stroke="#365d46" stroke-width="2"/><circle cx="9" cy="-1" r="1.5" fill="#365d46"/></g></svg>`;
}
