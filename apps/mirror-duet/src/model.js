export function reflected(n){return Math.floor(n/3)*3+2-n%3;}
export function goal(s){return [0,4,8][s.stage];}
export function ready(s){return s.positions[0]===goal(s)&&s.positions[1]===reflected(goal(s));}
export function createState(seed){return {positions:[4,4],active:(seed>>>0)%2,stage:0,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='select'&&[0,1].includes(a.id)&&a.id!==s.active)return {...s,active:a.id};if(a.type==='tap'&&Number.isInteger(a.id)&&a.id>=0&&a.id<9&&s.positions[s.active]!==a.id)return {...s,positions:s.positions.map((v,i)=>i===s.active?a.id:v)};if(a.type==='finish'&&a.id===0&&ready(s))return {...s,stage:s.stage+1,done:s.stage+1===3};return s;}
export function hint(s){if(s.done)return null;const targets=[goal(s),reflected(goal(s))],i=targets.findIndex((n,i)=>n!==s.positions[i]);return i<0?{type:'finish',id:0}:s.active!==i?{type:'select',id:i}:{type:'tap',id:targets[i]};}
