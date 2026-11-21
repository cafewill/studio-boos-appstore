import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('가로는 네 박자, 세로는 네 가지 음색이에요. 그림 칸을 켜고 한 번 들어봐요.')+`<div class="beat-labels">${[1,2,3,4].map(v=>chip(v+'박')).join('')}</div>`+grid(s.beats.map((on,i)=>action(shape(['circle','triangle','square','star'][Math.floor(i/4)],on?palette[Math.floor(i/4)]:'#fff')+`<span>${on?'켜짐':'꺼짐'}</span>`,i,{pressed:on,name:(Math.floor(i/4)+1)+'번 음색 '+(i%4+1)+'박 '+(on?'켜짐':'꺼짐')})),4,'beat-board')+`<div class="inline-actions"><button type="button" class="button secondary" data-audio="0">리듬 한 번 듣기</button>${action('무늬 비우기',0,{type:'clear'})}</div>`+note('소리는 기본 꺼짐이에요. 상단에서 소리를 켜면 자체 합성음을 들을 수 있어요.')+action('이 무늬로 마무리',0,{type:'finish',disabled:!s.beats.some(Boolean),className:'wide-tile'});
}
