export const help='물을 데우고, 수증기를 식힌 뒤, 구름에서 비를 내려 보세요.';
export function createState(){return {pool:6,vapor:0,cloud:0,rain:0,last:'물방울의 여행을 시작해요.',done:false};}
export function reduce(s,a){
 if(s.done||a.type!=='tool'||![0,1,2].includes(a.id))return s;
 if(a.id===0&&s.pool>0)return {...s,pool:s.pool-1,vapor:s.vapor+1,last:'증발: 물이 수증기가 되었어요.'};
 if(a.id===1&&s.vapor>0)return {...s,vapor:s.vapor-1,cloud:s.cloud+1,last:'응결: 식은 수증기가 작은 물방울이 되어 모였어요.'};
 if(a.id===2&&s.cloud>0)return {...s,cloud:s.cloud-1,pool:s.pool+1,rain:s.rain+1,last:'강수: 구름 속 물방울이 비로 돌아왔어요.',done:s.rain+1>=3};return s;
}
export function hint(s){return s.done?null:{type:'tool',id:s.cloud?2:s.vapor?1:0};}
