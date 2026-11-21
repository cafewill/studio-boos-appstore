import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('한 번, 두 번, 세 번. 소리와 함께 그림 무늬도 살펴봐요.')+`<div class="target-card"><button type="button" class="button secondary" data-audio="0">합성 소리 들어보기</button>${dots(s.target+1,'bell')}<p>${s.target+1}번 울리는 무늬</p></div>`+grid(s.order.map((v,i)=>action(dots(v+1,'star')+`<span>${v+1}번 무늬</span>`,i)),3)+note('실제 악기나 동물 소리를 재현한 것이 아닌 자체 합성음이에요. 소리를 끄고 그림으로도 놀 수 있어요.');
}
