import {random, shuffled, copy} from '../../shared/random.js';
export function createState(){return {top:0,hat:false,pattern:false,background:0,changes:0,done:false};}
export function reduce(s,a){if(s.done)return s;const n=copy(s);if(a.type==='tap'&&a.id>=0&&a.id<4)n.top=a.id;else if(a.type==='tool'&&a.id===0)n.hat=!n.hat;else if(a.type==='tool'&&a.id===1)n.pattern=!n.pattern;else if(a.type==='tool'&&a.id===2)n.background=(n.background+1)%3;else if(a.type==='finish'&&a.id===0&&s.changes){n.done=true;return n;}else return s;if(JSON.stringify(n)===JSON.stringify(s))return s;n.changes++;return n;}
export const hint=s=>s.changes?{type:'finish',id:0}:{type:'tool',id:0};
