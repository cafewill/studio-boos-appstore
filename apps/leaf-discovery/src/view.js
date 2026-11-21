import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
const kinds=['leaf','circle','triangle'];return `<div class="target-strip">${shape(kinds[s.target-1])}<p>이 모양을 모두 찾아볼까?<br>${s.found.length}개 발견했어요.</p></div>`+grid(s.items.map((v,i)=>action(shape(kinds[v],palette[(i+v)%4])+`<span>${s.found.includes(i)?'찾았어요':'살펴보기'}</span>`,i,{className:s.found.includes(i)?'found':'',disabled:s.found.includes(i),name:['나뭇잎','둥근 열매','삼각 씨앗'][v]+' '+(i+1)})),3,'nature-board');
}
