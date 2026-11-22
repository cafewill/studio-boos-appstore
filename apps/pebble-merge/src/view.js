import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
export function render(s){return note('같은 단계의 세 개를 고르면 하나로 모여요. 빈자리는 그대로 두어도 좋아요.')+`<div class="merge-meadow">${s.pieces.map((v,i)=>action(v===null?'빈 자리':['씨앗 ●','새싹 ♧','꽃 ✿'][v],i,{disabled:v===null,pressed:s.selected.includes(i),className:v===null?'empty-plot':''})).join('')}</div>`+summary(s,'아홉 씨앗이 세 새싹을 거쳐 한 꽃으로 모였어요.','합성의 수량 모형이지 실제 생물 성장 방식은 아니에요.');}
