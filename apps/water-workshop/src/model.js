export const help='아직 물이 필요한 화분의 밸브를 고르고, 한 칸씩 보내 보세요.';
export function createState(seed){const shift=(seed>>>0)%3;return {tank:6,needs:[1,2,3].map((_,i)=>1+(i+shift)%3),cups:[0,0,0],valve:0,done:false};}
export function reduce(s,a){
 if(s.done)return s;
 if(a.type==='select'&&Number.isInteger(a.id)&&a.id>=0&&a.id<3&&a.id!==s.valve)return {...s,valve:a.id};
 if(a.type==='start'&&a.id===0&&s.tank>0&&s.cups[s.valve]<s.needs[s.valve]){const cups=s.cups.map((v,i)=>v+(i===s.valve?1:0));return {...s,tank:s.tank-1,cups,done:cups.every((v,i)=>v===s.needs[i])};}return s;
}
export function hint(s){if(s.done)return null;const i=s.cups.findIndex((v,j)=>v<s.needs[j]);return i===s.valve?{type:'start',id:0}:{type:'select',id:i};}
