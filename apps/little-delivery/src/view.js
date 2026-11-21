import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
const delivered=M.deliveries(s),points=Array.from({length:9},(_,i)=>[40+i%3*150,30+Math.floor(i/3)*100]);
return note('상자를 먼저 싣고 같은 모양의 집으로 가요. 이웃 칸을 눌러 한 번씩 지나는 길을 그린 뒤 배달해요. 막히면 되돌릴 수 있어요.')+pathBoard(points,s.path.slice(1).map((id,i)=>[s.path[i],id]))+grid(Array.from({length:9},(_,id)=>{const pick=s.pickups.indexOf(id),house=s.houses.indexOf(id);return action(house>=0?shape(['star','triangle'][house],palette[house])+`<span>${delivered[house]?'배달 준비됨':'집'}</span>`:pick>=0?shape(['star','triangle'][pick],palette[pick])+`<span>실을 상자</span>`:s.path[0]===id?shape('car')+'<span>출발</span>':`<span>${s.path.includes(id)?'지나는 길':'빈 길'}</span>`,id,{pressed:s.path.includes(id),name:(id+1)+'번 길 '+(house>=0?'집':pick>=0?'상자':'빈 길')});}),3)+action('이 길로 배달하기',0,{type:'start',disabled:!delivered.every(Boolean),className:'wide-tile'});
}
