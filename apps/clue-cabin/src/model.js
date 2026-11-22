export function createState(seed){const target=(seed>>>0)%4;return {target,revealed:[],picked:-1,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='reveal'&&[0,1].includes(a.id)&&!s.revealed.includes(a.id))return {...s,revealed:[...s.revealed,a.id]};if(a.type==='tap'&&a.id===s.target&&s.revealed.length===2)return {...s,picked:a.id,done:true};return s;}
export function hint(s){if(s.done)return null;return s.revealed.length<2?{type:'reveal',id:[0,1].find(i=>!s.revealed.includes(i))}:{type:'tap',id:s.target};}
