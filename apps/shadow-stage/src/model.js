export function createState(seed){return {angle:((seed>>>0)%3+1)*90,target:0,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tool'&&a.id===0)return {...s,angle:(s.angle+90)%360};if(a.type==='finish'&&a.id===0&&s.angle===s.target)return {...s,done:true};return s;}
export function hint(s){return s.done?null:s.angle===s.target?{type:'finish',id:0}:{type:'tool',id:0};}
