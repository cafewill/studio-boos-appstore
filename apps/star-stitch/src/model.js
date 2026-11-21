export function createState(seed){return {points:[[60,200],[140,80],[240,150],[340,60],[430,180]],order:(seed>>>0)%2?[4,3,2,1,0]:[0,1,2,3,4],path:[],done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id!==s.order[s.path.length])return s;const path=[...s.path,a.id];return {...s,path,done:path.length===5};}
export function hint(s){return s.done?null:{type:'tap',id:s.order[s.path.length]};}
