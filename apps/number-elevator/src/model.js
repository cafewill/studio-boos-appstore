export function createState(seed){return {ones:12+(seed>>>0)%8,tens:0,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tool'&&a.id===0&&s.ones>=10)return {...s,ones:s.ones-10,tens:s.tens+1};if(a.type==='tool'&&a.id===1&&s.tens>0)return {...s,ones:s.ones+10,tens:s.tens-1};if(a.type==='finish'&&a.id===0&&s.ones<10&&s.tens>0)return {...s,done:true};return s;}
export function hint(s){return s.done?null:s.ones>=10?{type:'tool',id:0}:{type:'finish',id:0};}
