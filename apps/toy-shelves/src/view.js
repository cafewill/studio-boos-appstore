import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
const toy=M.toys[s.items[Math.min(s.index,s.items.length-1)]];return `<section class="toy-room"><span class="room-label">작은 장난감 방</span>`+note(s.done?'모두 제자리를 만났어요.':toy.name+'의 바구니를 골라요.')+`<div class="toy-turntable">${shape(toy.kind)}${chip(toy.name)}</div>`+grid(M.groups.map((g,i)=>action(shape(['car','bell','leaf'][i],palette[i])+`<span>${g} 서랍</span><small>${s.placed[i]}개가 제자리에</small><span class="drawer-pull" aria-hidden="true"></span>`,i)),3,'toy-cabinet')+'</section>';
}
