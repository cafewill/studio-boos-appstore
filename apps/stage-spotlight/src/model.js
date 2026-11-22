export function lit(s){return [0,1,2].map(i=>s.lights.some(p=>p===i||p+1===i));}
export function createState(seed){return {lights:[(seed>>>0)%2,(seed>>>0)%2],done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tool'&&[0,1].includes(a.id))return {...s,lights:s.lights.map((v,i)=>i===a.id?1-v:v)};if(a.type==='finish'&&a.id===0&&lit(s).every(Boolean))return {...s,done:true};return s;}
export function hint(s){return s.done?null:lit(s).every(Boolean)?{type:'finish',id:0}:{type:'tool',id:0};}
