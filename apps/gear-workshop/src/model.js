export const help='빈 축에 톱니를 올린 뒤, 손잡이를 세 번 돌려 보세요.';
export function createState(seed){return {mounted:[true,false,false,false],turns:[0,0,0,0],linkedTurns:0,offset:(seed>>>0)%4,done:false};}
export function reduce(s,a){
 if(s.done)return s;
 if(a.type==='tap'&&Number.isInteger(a.id)&&a.id>=1&&a.id<4)return {...s,mounted:s.mounted.map((v,i)=>i===a.id?!v:v)};
 if(a.type==='start'&&a.id===0){let linked=true;const turns=s.turns.map((v,i)=>{linked=linked&&s.mounted[i];return linked?v+(i%2?-1:1):v;});const linkedTurns=s.linkedTurns+(s.mounted.every(Boolean)?1:0);return {...s,turns,linkedTurns,done:linkedTurns>=3};}return s;
}
export function hint(s){if(s.done)return null;const i=s.mounted.indexOf(false);return i<0?{type:'start',id:0}:{type:'tap',id:i};}
