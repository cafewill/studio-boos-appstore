export const help='왼쪽 무게 × 거리와 오른쪽 무게 × 거리가 같아지는 자리를 찾아요.';
export function createState(seed){const n=(seed>>>0)%4;return {leftWeight:[1,2,3,2][n],leftDistance:[4,3,2,2][n],rightWeight:1,rightDistance:1,done:false};}
export function moment(s){return s.rightWeight*s.rightDistance-s.leftWeight*s.leftDistance;}
export function reduce(s,a){if(s.done)return s;
 if(a.type==='select'&&[1,2,3,4].includes(a.id)&&a.id!==s.rightWeight)return {...s,rightWeight:a.id};
 if(a.type==='tap'&&[1,2,3,4].includes(a.id)&&a.id!==s.rightDistance)return {...s,rightDistance:a.id};
 if(a.type==='finish'&&a.id===0&&moment(s)===0)return {...s,done:true};return s;
}
export function hint(s){if(s.done)return null;const total=s.leftWeight*s.leftDistance;for(let w=1;w<=4;w++)for(let d=1;d<=4;d++)if(w*d===total){if(s.rightWeight!==w)return {type:'select',id:w};if(s.rightDistance!==d)return {type:'tap',id:d};return {type:'finish',id:0};}return null;}
