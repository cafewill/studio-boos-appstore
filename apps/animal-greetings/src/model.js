export function createState(seed){return {pose:0,seen:[],ears:(seed>>>0)%2,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1,2].includes(a.id)){if(s.pose===a.id&&s.seen.includes(a.id))return s;return {...s,pose:a.id,seen:[...new Set([...s.seen,a.id])]};}if(a.type==='finish'&&a.id===0&&s.seen.length>0)return {...s,done:true};return s;}
export function hint(s){if(s.done)return null;const i=[0,1,2].find(i=>!s.seen.includes(i));return i===undefined?{type:'finish',id:0}:{type:'tap',id:i};}
