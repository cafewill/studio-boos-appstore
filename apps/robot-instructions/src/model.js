const dirs=[[0,-1],[1,0],[0,1],[-1,0]];
export const help='명령을 쌓은 뒤 한 걸음 실행해요. 앞이 막히면 왼쪽이나 오른쪽으로 돌아봐요.';
export function createState(seed){return {x:0,y:3,dir:0,goal:[3,0],walls:(seed>>>0)%2?[[1,1],[2,2]]:[[1,2],[2,1]],program:[],pc:0,trail:[[0,3]],blocked:false,done:false};}
export function step(s,command){if(command===1||command===2)return {...s,dir:(s.dir+(command===1?3:1))%4,blocked:false};const [dx,dy]=dirs[s.dir],x=s.x+dx,y=s.y+dy;if(x<0||x>3||y<0||y>3||s.walls.some(p=>p[0]===x&&p[1]===y))return {...s,blocked:true};return {...s,x,y,blocked:false,trail:[...s.trail,[x,y]],done:x===s.goal[0]&&y===s.goal[1]};}
export function reduce(s,a){
 if(s.done)return s;
 if(a.type==='tap'&&Number.isInteger(a.id)&&a.id>=0&&a.id<=2&&s.program.length<24)return {...s,program:[...s.program,a.id]};
 if(a.type==='start'&&a.id===0&&s.pc<s.program.length)return {...step(s,s.program[s.pc]),pc:s.pc+1};
 if(a.type==='clear'&&a.id===0&&s.program.length)return {...s,program:[],pc:0,blocked:false};return s;
}
export function route(s){const queue=[{x:s.x,y:s.y,dir:s.dir,path:[]}],seen=new Set();while(queue.length){const p=queue.shift(),key=[p.x,p.y,p.dir].join(',');if(seen.has(key))continue;seen.add(key);if(p.x===s.goal[0]&&p.y===s.goal[1])return p.path;for(const cmd of [0,1,2]){const n=step({...p,walls:s.walls,goal:s.goal,trail:[]},cmd);if(!n.blocked)queue.push({x:n.x,y:n.y,dir:n.dir,path:[...p.path,cmd]});}}return [];}
export function hint(s){if(s.done)return null;if(s.pc<s.program.length)return {type:'start',id:0};if(s.program.length>=24)return {type:'clear',id:0};return {type:'tap',id:route(s)[0]};}
