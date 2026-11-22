export function stone(row,phase){return row*(phase+1)%3;}
export function createState(seed){return {row:3,col:(seed>>>0)%3,phase:0,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tool'&&a.id===0){const phase=(s.phase+1)%3;return {...s,phase,col:s.row===3?s.col:stone(s.row,phase)};}if(a.type==='tool'&&[1,2].includes(a.id)&&s.row===3){const col=s.col+(a.id===1?-1:1);return col>=0&&col<3?{...s,col}:s;}if(a.type==='tap'&&a.id===0&&s.row>0&&(s.row===1||stone(s.row-1,s.phase)===s.col))return {...s,row:s.row-1,done:s.row===1};return s;}
export function hint(s){if(s.done)return null;if(s.row===3){const c=stone(2,s.phase);return c===s.col?{type:'tap',id:0}:{type:'tool',id:c<s.col?1:2};}return s.row===1||stone(s.row-1,s.phase)===s.col?{type:'tap',id:0}:{type:'tool',id:0};}
