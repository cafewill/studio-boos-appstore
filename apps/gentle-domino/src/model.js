export const positions=[0,1,3,5];
export function reaches(s){let n=1;while(n<4&&positions[n]-positions[n-1]<=s.heights[n-1]+1)n++;return n;}
export function createState(seed){return {heights:[0,0,0,0],selected:(seed>>>0)%4,last:0,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='select'&&[0,1,2,3].includes(a.id)&&a.id!==s.selected)return {...s,selected:a.id};if(a.type==='tool'&&a.id===0)return {...s,heights:s.heights.map((v,i)=>i===s.selected?(v+1)%3:v)};if(a.type==='start'&&a.id===0){const last=reaches(s);return last===s.last?s:{...s,last,done:last===4};}return s;}
export function hint(s){if(s.done)return null;const n=reaches(s);if(n===4)return {type:'start',id:0};return s.selected!==n-1?{type:'select',id:n-1}:{type:'tool',id:0};}
