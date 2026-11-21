import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('숫자 칸 주변의 선 개수를 맞추고 하나의 고리로 이어요. 선을 다시 누르면 지워져요.')+`<div class="loop-board">${M.edges.map(([a,b],id)=>{const x=(a%3+b%3)/2*40+10,y=(Math.floor(a/3)+Math.floor(b/3))/2*40+10;return `<button type="button" class="loop-edge ${id<6?'horizontal':'vertical'} ${s.lines.includes(id)?'on':''}" style="left:${x}%;top:${y}%" data-action="tap" data-id="${id}" aria-pressed="${s.lines.includes(id)}" aria-label="${id+1}번 선 ${s.lines.includes(id)?'있음':'없음'}"></button>`;}).join('')}${s.clues.map((v,i)=>`<span class="loop-clue" style="left:${30+i%2*40}%;top:${30+Math.floor(i/2)*40}%">${v}</span>`).join('')}${Array.from({length:9},(_,i)=>`<span class="loop-dot" style="left:${10+i%3*40}%;top:${10+Math.floor(i/3)*40}%"></span>`).join('')}</div>`;
}
