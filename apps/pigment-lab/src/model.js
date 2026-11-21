export const colors=[[226,149,126],[121,175,167],[172,155,207]];
export function blend(counts){const total=counts.reduce((a,b)=>a+b,0);return total?colors[0].map((_,j)=>Math.round(counts.reduce((sum,n,i)=>sum+n*colors[i][j],0)/total)):[250,248,238];}
export function createState(seed){const k=(seed>>>0)%3;return {drops:[0,0,0],target:[0,1,2].map(i=>i===k?2:i===(k+1)%3?1:0),done:false};}
export function matches(s){const n=s.drops.reduce((a,b)=>a+b,0);return n>0&&s.drops.every((v,i)=>v*3===s.target[i]*n);}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1,2].includes(a.id)&&s.drops.reduce((a,b)=>a+b,0)<9)return {...s,drops:s.drops.map((v,i)=>i===a.id?v+1:v)};if(a.type==='clear'&&a.id===0&&s.drops.some(Boolean))return {...s,drops:[0,0,0]};if(a.type==='finish'&&a.id===0&&matches(s))return {...s,done:true};return s;}
export function hint(s){if(s.done)return null;if(matches(s))return {type:'finish',id:0};if(s.drops.some((v,i)=>v>s.target[i]))return {type:'clear',id:0};return {type:'tap',id:s.drops.findIndex((v,i)=>v<s.target[i])};}
