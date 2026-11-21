import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
const kinds=['circle','triangle','star'];return note('위 저장통의 무늬를 봐요. 그릇을 고른 뒤 이웃 빈칸을 눌러 아래 같은 무늬 자리로 옮겨요. 준비되면 모래를 내려요.')+`<div class="sand-tanks">${s.amounts.map((v,i)=>`<div>${shape(kinds[i],palette[i])}${s.filled[i]?chip('모았어요'):dots(v,'drop',palette[i])}</div>`).join('')}</div>`+grid(s.cells.map((v,i)=>v===null?action(`<span>빈칸</span>${i>=3?shape(kinds[i-3],'#fff'):''}`,i,{name:(i+1)+'번 빈칸'}):action(shape(kinds[v],palette[v])+`<span>${s.filled[v]?'모래를 모은 그릇':'받는 그릇'}</span>`,v,{type:'select',pressed:s.selected===v,disabled:s.filled[v],name:['동그라미','삼각형','별'][v]+' 그릇 선택'})),3,'sand-board')+action('모래 내려보기',0,{type:'start',className:'wide-tile'})+note('모래는 작은 단위로 이동하는 자체 모형이에요. 정밀한 유체 시뮬레이션은 아니에요.');
}
