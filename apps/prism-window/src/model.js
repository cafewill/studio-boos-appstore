export const masks=[3,6,12];
export function visible(s){return s.on.reduce((bits,v,i)=>v?bits^masks[i]:bits,0);}
export function createState(seed){const selection=1+(seed>>>0)%7;return {on:[false,false,false],target:masks.reduce((bits,m,i)=>selection&(1<<i)?bits^m:bits,0),done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1,2].includes(a.id))return {...s,on:s.on.map((v,i)=>i===a.id?!v:v)};if(a.type==='finish'&&a.id===0&&visible(s)===s.target)return {...s,done:true};return s;}
export function hint(s){if(s.done)return null;if(visible(s)===s.target)return {type:'finish',id:0};for(let bits=0;bits<8;bits++){const on=[0,1,2].map(i=>!!(bits&(1<<i)));if(visible({...s,on})===s.target)return {type:'tap',id:on.findIndex((v,i)=>v!==s.on[i])};}return null;}
