import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note(s.revealed?'그림 순서로 작은 이야기를 지어 봐요. 준비되면 가리고 이어봐요.':'기억한 순서대로 그림을 눌러요. 언제든 다시 살펴봐도 괜찮아요.')+`<div class="sequence-strip">${(s.revealed?s.sequence:s.sequence.map((v,i)=>s.answer[i]??null)).map((v,i)=>`<div class="sequence-cell">${v===null?chip('기다리는 자리'):shape(M.kinds[v],palette[v])}<small>${i+1}번째</small></div>`).join('')}</div>`+(s.revealed?action('준비됐어요 · 그림 가리기',0,{type:'start',className:'wide-tile'}):grid(M.kinds.map((k,i)=>action(shape(k,palette[i])+`<span>${M.names[i]}</span>`,i)),4)+action('다시 살펴보기',0,{type:'reveal',className:'wide-tile'}));
}
