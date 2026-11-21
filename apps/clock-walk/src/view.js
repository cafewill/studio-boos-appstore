import {action,grid,note,chip,shape,dots,palette,pathBoard} from '../../shared/board-ui.js';
import * as M from './model.js';
export function render(s){
return note('긴 바늘은 12, 짧은 바늘이 가리키는 시각을 찾아요.')+`<svg class="clock-art" viewBox="0 0 240 240" role="img" aria-label="정각 시계, 짧은 바늘은 ${s.hour} 방향"><circle cx="120" cy="120" r="103" fill="#fff" stroke="#365d46" stroke-width="4"/>${Array.from({length:12},(_,i)=>{const n=i+1,a=n*Math.PI/6;return `<text x="${120+83*Math.sin(a)}" y="${126-83*Math.cos(a)}" text-anchor="middle" fill="#253e34" font-size="18">${n}</text>`;}).join('')}<path d="M120 120V48" stroke="#718474" stroke-width="5" stroke-linecap="round"/><path d="M120 120V68" transform="rotate(${s.hour*30} 120 120)" stroke="#365d46" stroke-width="9" stroke-linecap="round"/><circle cx="120" cy="120" r="7" fill="#365d46"/></svg>`+grid(s.options.map((v,i)=>action(v+'시',i)),3);
}
