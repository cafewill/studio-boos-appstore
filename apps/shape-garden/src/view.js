import {action,grid,note,shape} from '../../shared/board-ui.js';
import {garden} from '../../shared/garden-art.js';
import {NAMES} from './board-model.js';
export function render(s){return note('색이 달라도 같은 모양을 찾아요. 아래 모양을 톡 눌러요.')+`<div class="target-card">${shape(s.target,s.targetColor)}<p>이 모양과 같은 모양을 찾아요.</p></div>`+grid(s.options.map((o,i)=>action(shape(o.shape,o.color)+`<span>${NAMES[o.shape]}</span>`,i,{name:NAMES[o.shape]+' 선택'})),3)+(s.done?`<div class="shape-bloom">${garden(['matched'],0)}<p>같은 모양을 만나 꽃이 피었어요.</p></div>`:'');}
