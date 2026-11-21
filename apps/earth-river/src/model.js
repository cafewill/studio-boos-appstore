export function createState(seed){return {hill:7+(seed>>>0)%3,sediment:0,delta:0,moves:0,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tool')return s;if(a.id===0&&s.hill>0)return {...s,hill:s.hill-1,sediment:s.sediment+1};if(a.id===1&&s.sediment>0)return {...s,sediment:s.sediment-1,delta:s.delta+1,moves:s.moves+1,done:s.moves+1===4};return s;}
export function hint(s){return s.done?null:{type:'tool',id:s.sediment?1:0};}
