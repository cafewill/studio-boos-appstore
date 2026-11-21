import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
const art=(mask)=>`<svg viewBox="0 0 100 100" class="tile-art" aria-hidden="true">${Array.from({length:4},(_,i)=>`<rect x="${i%2*44+6}" y="${Math.floor(i/2)*44+6}" width="40" height="40" rx="5" fill="${mask&(1<<i)?'#97bdaf':'#fff'}" stroke="#365d46" stroke-width="3"/>${mask&(1<<i)?`<circle cx="${i%2*44+26}" cy="${Math.floor(i/2)*44+26}" r="5" fill="#365d46"/>`:''}`).join('')}</svg>`;
return note('한 장만 놓인 칸은 무늬가 보여요. 두 장이 겹친 칸은 비워져요. 조각을 눌러 회전해요.')+`<div class="compare-panels"><div><h2>만들 무늬</h2>${art(s.target)}</div><div><h2>지금 무늬</h2>${art(M.combined(s.a,s.b))}</div></div>`+grid([action(art(M.mask(s.a))+'<span>첫 조각 회전</span>',0),action(art(M.mask((s.b+1)%4))+'<span>둘째 조각 회전</span>',1)],2);
}
