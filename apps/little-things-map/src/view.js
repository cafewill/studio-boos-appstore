import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return `<div class="target-strip">${shape(M.kinds[s.target])}<p>지도 속 같은 그림 세 개를 찾아요.<br>${s.found.length} / 3개 발견</p></div>`+grid(s.items.map((v,i)=>action(shape(M.kinds[v],palette[(i+v)%4]),i,{disabled:s.found.includes(i),className:s.found.includes(i)?'found':'',name:(i+1)+'번 작은 그림 '+['동그라미','삼각형','정사각형','잎','별'][v]})),5,'mosaic-board');
}
