export const help='흙이 남은 칸을 두 번씩 살살 털어 주세요. 찾은 뒤에는 전시 받침을 골라요.';
export function createState(seed){return {dust:Array(12).fill(2),specimen:(seed>>>0)%3,stand:-1,done:false};}
export function reduce(s,a){
 if(s.done)return s;
 if(a.type==='tap'&&Number.isInteger(a.id)&&a.id>=0&&a.id<12&&s.dust[a.id]>0)return {...s,dust:s.dust.map((v,i)=>i===a.id?v-1:v)};
 if(a.type==='finish'&&Number.isInteger(a.id)&&a.id>=0&&a.id<3&&s.dust.every(v=>v===0))return {...s,stand:a.id,done:true};return s;
}
export function hint(s){if(s.done)return null;const id=s.dust.findIndex(v=>v>0);return id<0?{type:'finish',id:s.specimen}:{type:'tap',id};}
