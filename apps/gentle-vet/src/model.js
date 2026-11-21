export function createState(seed){return {dust:3,brushed:false,blanket:false,friend:(seed>>>0)%2,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tool')return s;if(a.id===0&&s.dust>0)return {...s,dust:s.dust-1};if(a.id===1&&s.dust===0&&!s.brushed)return {...s,brushed:true};if(a.id===2&&s.brushed&&!s.blanket)return {...s,blanket:true,done:true};return s;}
export function hint(s){return s.done?null:{type:'tool',id:s.dust?0:s.brushed?2:1};}
