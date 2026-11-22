export const edges=[[0,1,1],[1,2,2],[2,3,1],[0,3,3],[0,2,3]];
export function connected(s){const seen=new Set([0]);for(let pass=0;pass<4;pass++)s.on.forEach((v,i)=>{const [a,b]=edges[i];if(v&&(seen.has(a)||seen.has(b))){seen.add(a);seen.add(b);}});return seen.size===4;}
export function cost(s){return s.on.reduce((n,v,i)=>n+(v?edges[i][2]:0),0);}
export function createState(seed){return {on:Array(5).fill(false),theme:(seed>>>0)%3,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1,2,3,4].includes(a.id)){const on=s.on.map((v,i)=>i===a.id?!v:v),n={...s,on};if(cost(n)>4)return s;return {...n,done:connected(n)};}if(a.type==='clear'&&a.id===0&&s.on.some(Boolean))return {...s,on:Array(5).fill(false)};return s;}
export function hint(s){if(s.done)return null;if(s.on[3]||s.on[4])return {type:'clear',id:0};return {type:'tap',id:[0,1,2].find(i=>!s.on[i])};}
