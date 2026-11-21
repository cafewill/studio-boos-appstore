export function createState(seed){return {yaw:1+(seed>>>0)%3,pitch:1+((seed>>>0)>>>2)%3,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tool'&&a.id===0)return {...s,yaw:(s.yaw+1)%4};if(a.type==='tool'&&a.id===1)return {...s,pitch:(s.pitch+1)%4};if(a.type==='finish'&&a.id===0&&s.yaw===0&&s.pitch===0)return {...s,done:true};return s;}
export function hint(s){return s.done?null:s.yaw?{type:'tool',id:0}:s.pitch?{type:'tool',id:1}:{type:'finish',id:0};}
