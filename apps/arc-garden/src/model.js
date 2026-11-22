export function landing(power,loft){return 50+power*45+(loft===1?20:0);}
export function createState(seed){const targetPower=2+(seed>>>0)%4;return {power:1,loft:0,target:landing(targetPower,(seed>>>0)%2),last:null,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='select'&&[1,2,3,4,5].includes(a.id)&&a.id!==s.power)return {...s,power:a.id};if(a.type==='tool'&&[0,1].includes(a.id)&&a.id!==s.loft)return {...s,loft:a.id};if(a.type==='start'&&a.id===0){const last=landing(s.power,s.loft);return s.last===last?s:{...s,last,done:last===s.target};}return s;}
export function hint(s){if(s.done)return null;for(let p=1;p<=5;p++)for(let l=0;l<=1;l++)if(landing(p,l)===s.target)return s.power!==p?{type:'select',id:p}:s.loft!==l?{type:'tool',id:l}:{type:'start',id:0};return null;}
