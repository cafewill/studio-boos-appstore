import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('그림 주문을 왼쪽부터 살펴보고, 한 층씩 담아요. 색과 모양을 함께 보세요.')+`<div class="order-strip">${s.order.map((v,i)=>`<div>${chip((i+1)+'층')}${shape(['circle','triangle','star'][v],palette[v])}</div>`).join('')}</div><div class="ice-stack">${[...s.scoops].reverse().map(v=>shape(['circle','triangle','star'][v],palette[v])).join('')}${shape('bowl','#e3c46b')}</div>`+grid(M.names.map((t,i)=>action(shape(['circle','triangle','star'][i],palette[i])+`<span>${t}</span>`,i)),3);
}
