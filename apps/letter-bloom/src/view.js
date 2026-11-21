import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return `<div class="word-target">${M.syllables[s.c][s.v]}</div>`+note('이 글자를 만드는 자음과 모음을 골라요.')+`<div class="letter-recipe">${chip(s.pickedC===null?'자음':M.consonants[s.pickedC])}<span>+</span>${chip(s.pickedV===null?'모음':M.vowels[s.pickedV])}</div>`+grid(M.consonants.map((c,i)=>action(c,i,{type:'select',pressed:s.pickedC===i,className:'letter-tile'})),3)+grid(M.vowels.map((c,i)=>action(c,i,{pressed:s.pickedV===i,className:'letter-tile'})),3)+note('가·고·구처럼 단순한 글자를 다뤄요. 발음이나 읽기 능력을 평가하지 않아요.');
}
