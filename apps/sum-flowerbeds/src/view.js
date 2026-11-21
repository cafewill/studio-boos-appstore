import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('칸을 누르면 비움·1·2·3 순서로 바뀌어요. 가로와 세로의 합을 단서에 맞춰요.')+`<div class="sum-columns">${s.cols.map(v=>chip('세로 합 '+v)).join('')}</div>`+`<div class="sum-rows">${[0,1,2].map(row=>`<div>${grid(s.values.slice(row*3,row*3+3).map((v,c)=>action(v?dots(v,'leaf'):'비움',row*3+c,{name:(row+1)+'행 '+(c+1)+'열 '+(v||'비움')})),3)}${chip('가로 합 '+s.rows[row])}</div>`).join('')}</div>`;
}
