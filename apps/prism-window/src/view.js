import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
import {visible} from './model.js';
function window(bits){return Array.from({length:4},(_,i)=>`<rect x="${70+i*95}" y="75" width="75" height="150" rx="18" fill="${bits&(1<<i)?'#e3c46b':'#edf1e5'}" stroke="#365d46" stroke-width="4"/>`).join('');}
export function render(s){return note('켜진 필름 두 장이 같은 칸에 겹치면 그 칸은 꺼져요. 실제 빛과 다른 논리 놀이예요.')+scene(window(visible(s)),'현재 겹침 창문')+`<div class="target-window">목표 ${[0,1,2,3].map(i=>(s.target&(1<<i))?'●':'○').join(' ')}</div>`+tools(['1·2칸 필름','2·3칸 필름','3·4칸 필름'].map((n,i)=>action(n,i,{pressed:s.on[i]})))+action('창문 무늬 확인',0,{type:'finish',className:'wide-tile',disabled:visible(s)!==s.target})+summary(s,'겹침의 새로운 규칙으로 창문 무늬를 만들었어요.','XOR 논리 모형이며 광학·색 혼합의 설명은 아니에요.');}
