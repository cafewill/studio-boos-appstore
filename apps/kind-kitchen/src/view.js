import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('그림 속 주방이에요. 실제 칼이나 불은 어른과 함께 사용해요.')+`<div class="kitchen-scene">${shape(s.step<2?'leaf':'bowl',palette[s.ingredient])}<p>${M.steps[Math.min(s.step,3)]}</p>${s.step>=2?dots(3,'leaf'):''}</div><ol class="recipe-list">${M.steps.map((t,i)=>`<li class="${i<s.step?'finished':''}">${t}${i<s.step?' · 마쳤어요':''}</li>`).join('')}</ol>`+grid(M.steps.map((t,i)=>action(t,i,{disabled:i<s.step})),2);
}
