export const names=['수성','금성','지구','화성'];
export const help='수성, 금성, 지구, 화성을 태양에서 가까운 자리부터 놓아 보세요.';
export function createState(seed){return {placed:[false,false,false,false],selected:(seed>>>0)%4,ticks:0,done:false};}
export function reduce(s,a){
 if(s.done)return s;
 if(a.type==='select'&&Number.isInteger(a.id)&&a.id>=0&&a.id<4&&!s.placed[a.id]&&s.selected!==a.id)return {...s,selected:a.id};
 if(a.type==='tap'&&a.id>=10&&a.id<14&&a.id-10===s.selected&&!s.placed[s.selected]){const placed=s.placed.map((v,i)=>v||i===s.selected);return {...s,placed,selected:-1};}
 if(a.type==='start'&&a.id===0&&s.placed.every(Boolean))return {...s,ticks:s.ticks+1,done:s.ticks+1===4};return s;
}
export function hint(s){if(s.done)return null;const next=s.placed.indexOf(false);return next<0?{type:'start',id:0}:s.selected===next?{type:'tap',id:next+10}:{type:'select',id:next};}
