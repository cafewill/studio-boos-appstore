import {random, shuffled, copy} from '../../shared/random.js';
export function createState(){return {length:2,curl:false,color:0,changes:0,done:false};}
export function reduce(s,a){if(s.done)return s;const n=copy(s);if(a.type==='tool'&&a.id===0)n.length=Math.max(0,n.length-1);else if(a.type==='tool'&&a.id===1)n.length=Math.min(4,n.length+1);else if(a.type==='tool'&&a.id===2)n.curl=!n.curl;else if(a.type==='tap'&&a.id>=0&&a.id<4)n.color=a.id;else if(a.type==='finish'&&a.id===0&&n.changes>0){n.done=true;return n;}else return s;if(JSON.stringify(n)===JSON.stringify(s))return s;n.changes++;return n;}
export const hint=s=>s.changes?{type:'finish',id:0}:{type:'tool',id:0};
