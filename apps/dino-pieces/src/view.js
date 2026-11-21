import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
const fragment=(i)=>`<svg viewBox="${(i%3)*100} ${Math.floor(i/3)*100} 100 100" class="piece-art" aria-hidden="true"><path d="M25 150Q18 95 70 95H160Q155 35 202 31Q250 23 258 60L277 83L250 100L240 155L220 163V185H201V164H108V185H89V163L64 150Z" fill="#97bdaf" stroke="#365d46" stroke-width="5"/><circle cx="231" cy="56" r="4" fill="#365d46"/><path d="m82 95 14-22 13 22m15 0 14-22 13 22m-2 39h30" stroke="#365d46" stroke-width="4" fill="none"/></svg>`;
return note('아래 조각을 고르고, 그림 속 제자리를 눌러요. 옅은 그림이 길잡이예요.')+grid(s.placed.map((v,i)=>action(`<span class="piece ${v===null?'ghost':''}">${fragment(i)}</span>`,i,{className:'puzzle-cell',name:(i+1)+'번 그림 자리'})),3,'jigsaw-board')+grid(s.order.map(i=>action(fragment(i),i,{type:'select',pressed:s.selected===i,disabled:s.placed.includes(i),name:(i+1)+'번 조각 선택'})),3,'piece-tray');
}
