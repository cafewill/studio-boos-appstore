// 자체 SVG·표현 도구. 사용자 입력을 HTML로 보간하지 않는다.
export const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const action = (label, id, options = {}) => `<button type="button" class="play-tile ${options.className || ''}" data-action="${options.type || 'tap'}" data-id="${id}" ${options.disabled ? 'disabled' : ''} ${options.pressed !== undefined ? `aria-pressed="${options.pressed}"` : ''} aria-label="${escape(options.name || label)}">${label}</button>`;
export const grid = (items, columns = 3, className = '') => `<div class="play-grid ${className}" style="--columns:${columns}">${items.join('')}</div>`;
export const note = text => `<p class="board-note">${escape(text)}</p>`;
export const chip = text => `<span class="play-chip">${escape(text)}</span>`;
export const shape = (kind, color = '#efad85', label = '') => {
 const paths={circle:'<circle cx="50" cy="50" r="31"/>',triangle:'<path d="m50 15 35 67H15Z"/>',square:'<rect x="21" y="21" width="58" height="58" rx="4"/>',leaf:'<path d="M20 76Q3 19 80 16Q93 87 20 76ZM20 76l43-42"/>',drop:'<path d="M50 10Q6 62 26 81Q50 103 75 80Q95 59 50 10Z"/>',star:'<path d="m50 10 12 26 28 4-20 21 5 29-25-14-25 14 5-29L10 40l28-4Z"/>',bowl:'<path d="M12 43h76q-3 43-38 43T12 43ZM20 30h60"/>',car:'<path d="m20 45 10-22h40l10 22v30H20ZM20 45h60M30 75v9m40-9v9"/>',bell:'<path d="M22 70h56L68 50V35a18 18 0 0 0-36 0v15ZM40 82q10 12 20 0"/>'};
 return `<svg class="tile-art" viewBox="0 0 100 100" fill="${color}" stroke="#365d46" stroke-width="3" stroke-linejoin="round" ${label ? `role="img" aria-label="${escape(label)}"` : 'aria-hidden="true"'}>${paths[kind] || paths.circle}</svg>`;
};
export const dots = (count, kind = 'circle', color) => `<span class="dot-group" aria-label="${count}개">${Array.from({length:count},()=>shape(kind,color)).join('')}</span>`;
export const palette = ['#efad85','#97bdaf','#b7ade0','#e3c46b'];
export function pathBoard(points, edges, extra = '') {
 return `<svg class="path-art" viewBox="0 0 400 260" aria-hidden="true">${edges.map(([a,b])=>`<path d="M${points[a][0]} ${points[a][1]}L${points[b][0]} ${points[b][1]}" fill="none" stroke="#365d46" stroke-width="9" stroke-linecap="round"/>`).join('')}${points.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="#f5f7ef" stroke="#365d46" stroke-width="3"/>`).join('')}${extra}</svg>`;
}
