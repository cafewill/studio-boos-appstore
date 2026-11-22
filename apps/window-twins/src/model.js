export function createState(seed){const unchanged=(seed>>>0)%4;return {changed:[0,1,2,3].filter(i=>i!==unchanged),found:[],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||!s.changed.includes(a.id)||s.found.includes(a.id))return s;const found=[...s.found,a.id];return {...s,found,done:found.length===3};}
export function hint(s){return s.done?null:{type:'tap',id:s.changed.find(i=>!s.found.includes(i))};}
