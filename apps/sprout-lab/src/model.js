export const help='물과 빛을 하나씩 만나게 해 주세요. 둘이 모이면 다음 모습이 보여요.';
export function createState(seed){return {stage:0,water:false,light:false,petals:5+(seed>>>0)%3,done:false};}
export function reduce(s,a){
 if(s.done||a.type!=='tool'||![0,1].includes(a.id)||s[a.id===0?'water':'light'])return s;
 const n={...s,[a.id===0?'water':'light']:true};
 if(n.water&&n.light){n.stage++;n.water=false;n.light=false;n.done=n.stage===3;}return n;
}
export function hint(s){return s.done?null:{type:'tool',id:s.water?1:0};}
