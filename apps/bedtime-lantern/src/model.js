export function createState(seed){return {lights:[2,2,2],moon:(seed>>>0)%3,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||!Number.isInteger(a.id)||a.id<0||a.id>2||s.lights[a.id]===0)return s;const lights=s.lights.map((v,i)=>i===a.id?v-1:v);return {...s,lights,done:lights.every(v=>v===0)};}
export function hint(s){return s.done?null:{type:'tap',id:s.lights.findIndex(v=>v>0)};}
