export function createState(seed){return {drops:[0,0,0],order:[0,1,2].map((_,i)=>(i+(seed>>>0)%3)%3),done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1,2].includes(a.id)&&s.drops[a.id]<2)return {...s,drops:s.drops.map((v,i)=>i===a.id?v+1:v)};if(a.type==='finish'&&a.id===0&&s.drops.every(n=>n>0))return {...s,done:true};return s;}
export function hint(s){return s.done?null:s.drops.some(n=>n===0)?{type:'tap',id:s.order.find(i=>s.drops[i]===0)}:{type:'finish',id:0};}
