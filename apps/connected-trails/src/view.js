import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
const coords=[[50,0],[100,50],[50,100],[0,50]];
return note('왼쪽 위의 입구에서 왼쪽 아래 바깥까지, 여섯 조각을 모두 지나는 길을 이어요. 두 타일을 차례로 눌러 바꿔요.')+`<div class="route-label">입구 · 왼쪽 위 타일의 왼쪽</div>`+grid(s.order.map((v,i)=>action(`<svg viewBox="0 0 100 100" class="tile-art" aria-hidden="true"><path d="M${coords[M.directions[v][0]].join(' ')}L50 50L${coords[M.directions[v][1]].join(' ')}" fill="none" stroke="#365d46" stroke-width="12" stroke-linecap="round"/></svg>`,i,{pressed:s.selected===i,name:(i+1)+'번 길 타일 선택'})),3,'connected-board')+note('출구 · 왼쪽 아래 타일의 아래');
}
