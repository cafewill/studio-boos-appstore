import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('먼저 걸린 고리가 빠져야 다음 고리가 나와요. 연결 안내를 보고 순서를 찾아요.')+grid(s.order.map(id=>action(`<svg class="tile-art" viewBox="0 0 100 100" aria-hidden="true"><path d="M18 20v47q0 20 22 20h25q20 0 20-20V48H65" fill="none" stroke="${s.removed.includes(id)?'#718474':'#365d46'}" stroke-width="9" stroke-linecap="round"/>${s.deps[id].map((v,i)=>`<circle cx="${32+i*28}" cy="32" r="11" fill="#efad85" stroke="#365d46" stroke-width="2"/><text x="${32+i*28}" y="37" text-anchor="middle" fill="#253e34" font-size="14">${v+1}</text>`).join('')}</svg><strong>${id+1}번 고리</strong><small>${s.removed.includes(id)?'풀었어요':s.deps[id].length?s.deps[id].map(v=>(v+1)+'번').join('·')+' 뒤에 풀기':'먼저 풀 수 있어요'}</small>`,id,{disabled:s.removed.includes(id),className:s.removed.includes(id)?'found':''})),3);
}
