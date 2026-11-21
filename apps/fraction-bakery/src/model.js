export const help='목표와 같은 조각 수로 나눈 다음, 위 숫자만큼 접시에 담아요.';
export function createState(seed){const d=[2,4,8][(seed>>>0)%3],n=1+(seed>>>0)%(d-1);return {targetN:n,targetD:d,slices:0,selected:[],done:false};}
export function reduce(s,a){
 if(s.done)return s;
 if(a.type==='tool'&&[2,4,8].includes(a.id)&&s.slices!==a.id)return {...s,slices:a.id,selected:[]};
 if(a.type==='tap'&&Number.isInteger(a.id)&&a.id>=0&&a.id<s.slices)return {...s,selected:s.selected.includes(a.id)?s.selected.filter(i=>i!==a.id):[...s.selected,a.id]};
 if(a.type==='finish'&&a.id===0&&s.slices&&s.selected.length*s.targetD===s.targetN*s.slices)return {...s,done:true};return s;
}
export function hint(s){if(s.done)return null;if(s.slices!==s.targetD)return {type:'tool',id:s.targetD};if(s.selected.length===s.targetN)return {type:'finish',id:0};return {type:'tap',id:s.selected.length>s.targetN?s.selected.at(-1):Array.from({length:s.slices},(_,i)=>i).find(i=>!s.selected.includes(i))};}
