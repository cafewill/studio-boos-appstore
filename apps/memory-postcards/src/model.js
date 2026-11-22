export const cards=['우산 아래 씨앗','별 옆의 작은 배','나무 곁의 등불'];
export function createState(seed){return {queue:[0,1,2].map((_,i)=>(i+(seed>>>0)%3)%3),revealed:false,kept:[],done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='reveal'&&a.id===0&&!s.revealed)return {...s,revealed:true};if(a.type==='tap'&&[0,1].includes(a.id)&&s.revealed){const [first,...rest]=s.queue,queue=a.id===0?rest:[...rest,first];return {...s,queue,kept:a.id===0?[...s.kept,first]:s.kept,revealed:false,done:queue.length===0};}return s;}
export function hint(s){return s.done?null:{type:s.revealed?'tap':'reveal',id:0};}
