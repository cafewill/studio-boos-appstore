import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('가로 조각은 옆으로, 세로 조각은 위아래로 움직여요. 가로 조각이 오른쪽 출구로 나가게 해 봐요.')+`<div class="sliding-board">${Array.from({length:16},()=>'<span></span>').join('')}<button type="button" class="sliding-piece horizontal-piece ${s.selected===0?'selected':''}" style="--r:${s.row};--c:${Math.min(s.col,2)}" data-action="select" data-id="0" aria-pressed="${s.selected===0}" aria-label="가로 조각 선택">${s.done?'나왔어요':'가로'}</button><button type="button" class="sliding-piece vertical-piece ${s.selected===1?'selected':''}" style="--r:${s.blockRow};--c:3" data-action="select" data-id="1" aria-pressed="${s.selected===1}" aria-label="세로 조각 선택">세로</button><span class="exit-label" style="--r:${s.row}">출구</span></div>`+grid(['왼쪽 이동','오른쪽 이동','위로 이동','아래로 이동'].map((t,i)=>action(t,i,{disabled:s.selected===0?i>=2:i<2})),2);
}
