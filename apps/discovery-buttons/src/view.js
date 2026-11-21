import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('누른 칸과 바로 위·아래·왼쪽·오른쪽 칸이 함께 바뀌어요. 모든 칸에 잎이 나타나게 해 봐요.')+grid(s.cells.map((on,i)=>action(shape('leaf',on?'#97bdaf':'#fff')+`<span>${on?'잎이 보여요':'빈 잎 자리'}</span>`,i,{pressed:on,name:(Math.floor(i/3)+1)+'행 '+(i%3+1)+'열 '+(on?'잎 있음':'잎 없음')})),3,'discovery-board');
}
