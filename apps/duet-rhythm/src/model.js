export function createState(seed){return {beats:[],first:(seed>>>0)%2,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1].includes(a.id)&&s.beats.length<8)return {...s,beats:[...s.beats,a.id]};if(a.type==='finish'&&a.id===0&&s.beats.length===8)return {...s,done:true};return s;}
export function notes(s){return s.beats.flatMap((n,i)=>n?[{pitch:(i+s.first)%2?5:0,step:i}]:[]);}
export function hint(s){return s.done?null:s.beats.length===8?{type:'finish',id:0}:{type:'tap',id:s.beats.length%3===2?0:1};}
