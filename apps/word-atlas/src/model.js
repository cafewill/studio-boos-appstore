export const words=[['나무','tree'],['배','boat'],['집','house']];
export function createState(seed){return {active:(seed>>>0)%3,opened:[],done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='select'&&[0,1,2].includes(a.id)&&a.id!==s.active)return {...s,active:a.id};if(a.type==='reveal'&&a.id===0&&!s.opened.includes(s.active))return {...s,opened:[...s.opened,s.active]};if(a.type==='finish'&&a.id===0&&s.opened.length===3)return {...s,done:true};return s;}
export function hint(s){if(s.done)return null;const i=[0,1,2].find(i=>!s.opened.includes(i));return i===undefined?{type:'finish',id:0}:s.active===i?{type:'reveal',id:0}:{type:'select',id:i};}
