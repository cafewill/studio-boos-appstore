import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('큰 글자의 작은 짝을 찾아볼까? 같은 글자의 다른 모습이에요.')+`<div class="word-target">${M.pairs[s.target][0]}</div>`+grid(s.options.map((p,i)=>action(M.pairs[p][1],i,{className:'letter-tile',name:'소문자 '+M.pairs[p][1]})),3)+note('글자의 형태를 연결하는 놀이예요. 영어 발음 학습은 포함하지 않아요.');
}
