import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
const bird='<path d="M-60 15-12-10 20-55 35-8 75 8 18 20-30 55-20 12Z"/>';
export function render(s){return note('보조선의 새와 같은 방향으로 종이 그림자를 돌려요.')+scene(`<rect x="20" y="20" width="460" height="260" rx="24" fill="#fff4d9"/><g transform="translate(250 150)" fill="none" stroke="#718474" stroke-width="4" stroke-dasharray="7 6">${bird}</g><g transform="translate(250 150) rotate(${s.angle})" fill="#365d46">${bird}</g>`,'보조선 새와 '+s.angle+'도 방향의 종이 그림자')+tools([action('종이 돌리기',0,{type:'tool'}),action('같은 방향 확인',0,{type:'finish',disabled:s.angle!==s.target})])+summary(s,'종이는 같아도 방향에 따라 모습이 달라져요.','3D 광학이 아닌 2D 회전 모형이에요.');}
