import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
export function render(s){return note('새 숫자보다 작은 항구 끝 숫자 중 가장 큰 숫자를 찾아요.')+`<div class="arrival-boat">${s.done?'모두 정박했어요':`다가오는 배 ${s.arrivals[s.index]}`}</div><div class="number-piers">${s.rows.map((r,i)=>action(`<span class="pier-numbers">${r.join(' · ')}</span><span>${i+1}번 항구에 정박</span>`,i,{name:`${i+1}번 항구, 끝 숫자 ${r.at(-1)}에 정박`})).join('')}</div>`+summary(s,'작은 수 중 가장 가까운 자리를 찾아 배를 나란히 놓았어요.','카드 벌점·원작 동물 표식·정원 초과·대결은 없어요.');}
