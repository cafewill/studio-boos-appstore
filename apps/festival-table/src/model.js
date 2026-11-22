export const recipes=[[2,0],[1,1],[0,2]];
export function createState(seed){return {stock:[0,0],made:[false,false,false],theme:(seed>>>0)%3,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tool'&&[0,1].includes(a.id)&&s.stock[a.id]<5)return {...s,stock:s.stock.map((v,i)=>i===a.id?v+1:v)};if(a.type==='tap'&&[0,1,2].includes(a.id)&&!s.made[a.id]&&recipes[a.id].every((n,i)=>s.stock[i]>=n)){const made=s.made.map((v,i)=>v||i===a.id);return {...s,stock:s.stock.map((v,i)=>v-recipes[a.id][i]),made,done:made.every(Boolean)};}return s;}
export function hint(s){if(s.done)return null;const i=s.made.indexOf(false),need=recipes[i].findIndex((n,j)=>s.stock[j]<n);return need<0?{type:'tap',id:i}:{type:'tool',id:need};}
