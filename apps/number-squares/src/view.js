import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('가로줄·세로줄·굵은 작은 네모에 1, 2, 3, 4가 한 번씩 들어가요. 빈칸을 고르고 숫자를 눌러요.')+grid(s.values.map((v,i)=>action(v?String(v):'·',i,{type:'select',disabled:s.given[i],pressed:s.selected===i,className:'sudoku-cell '+(s.given[i]?'given':''),name:(Math.floor(i/4)+1)+'행 '+(i%4+1)+'열 '+(v||'빈칸')})),4,'sudoku-board')+grid([1,2,3,4].map(v=>action(String(v),v,{disabled:s.selected===null,className:'number-tile'})),4);
}
