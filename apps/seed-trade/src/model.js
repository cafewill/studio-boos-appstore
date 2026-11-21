export function createState(seed){const n=2+(seed>>>0)%2;return {left:[n*2,0],right:[0,n*2],need:n,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id!==0||s.left[0]<=0||s.right[1]<=0)return s;const left=[s.left[0]-1,s.left[1]+1],right=[s.right[0]+1,s.right[1]-1];return {...s,left,right,done:left[1]===s.need&&right[0]===s.need};}
export function hint(s){return s.done?null:{type:'tap',id:0};}
