import {random, shuffled, copy} from '../../shared/random.js';
export function toggle(cells,id){const out=[...cells];for(let i=0;i<9;i++)if(i===id||Math.abs(Math.floor(i/3)-Math.floor(id/3))+Math.abs(i%3-id%3)===1)out[i]=!out[i];return out;}
export function createState(seed){let cells=Array(9).fill(true);for(const id of [seed%9,(seed+3)%9,(seed+5)%9])cells=toggle(cells,id);return {cells,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id<0||a.id>=9)return s;const cells=toggle(s.cells,a.id);return {cells,done:cells.every(Boolean)};}
export function hint(s){for(let mask=1;mask<512;mask++){let cells=s.cells;for(let id=0;id<9;id++)if(mask&(1<<id))cells=toggle(cells,id);if(cells.every(Boolean))return {type:'tap',id:Array.from({length:9},(_,i)=>i).find(id=>mask&(1<<id))};}return null;}
