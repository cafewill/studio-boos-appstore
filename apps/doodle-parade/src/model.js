export function createState(seed){return {pixels:Array(9).fill(false),frame:0,ink:(seed>>>0)%3,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&Number.isInteger(a.id)&&a.id>=0&&a.id<9&&s.frame===0)return {...s,pixels:s.pixels.map((v,i)=>i===a.id?!v:v)};if(a.type==='start'&&a.id===0&&s.pixels.some(Boolean)&&s.frame<3)return {...s,frame:s.frame+1,done:s.frame+1===3};return s;}
export function hint(s){return s.done?null:!s.pixels.some(Boolean)?{type:'tap',id:4}:{type:'start',id:0};}
