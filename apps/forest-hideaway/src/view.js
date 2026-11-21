import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return `<div class="target-strip">${shape(M.kinds[s.target],palette[s.target])}<p>${M.names[s.target]}을 찾아요.<br>덮개를 열고, 찾은 그림을 한 번 더 눌러요.</p></div>`+grid(s.items.map((v,i)=>action(s.opened.includes(i)?shape(M.kinds[v],palette[v])+`<span>${M.names[v]}</span>`:shape(i%2?'leaf':'square','#97bdaf')+`<span>${i%2?'덤불':'작은 문'} 열기</span>`,i,{name:s.opened.includes(i)?M.names[v]+' 살펴보기':(i+1)+'번 덮개 열기',className:s.opened.includes(i)?'opened':'covered'})),4,'forest-board');
}
