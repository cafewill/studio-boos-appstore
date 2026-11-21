export const prompts=['씨앗에서 새싹으로','바람 따라 흔들리는 나무','천천히 날아가는 나비'];
export function createState(seed){return {order:[0,1,2].map((_,i)=>(i+(seed>>>0)%3)%3),index:0,revealed:false,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='reveal'&&a.id===0&&!s.revealed)return {...s,revealed:true};if(a.type==='tap'&&[0,1].includes(a.id)&&s.revealed)return {...s,index:s.index+1,revealed:false,done:s.index+1===3};return s;}
export function hint(s){return s.done?null:s.revealed?{type:'tap',id:0}:{type:'reveal',id:0};}
