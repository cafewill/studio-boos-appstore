// 순수 breadth-first search. 반환 경로에 시작과 목표를 포함한다.
export function bfs(start,neighbors,isGoal,key=String){const queue=[[start]],seen=new Set([key(start)]);for(let i=0;i<queue.length;i++){const path=queue[i],node=path.at(-1);if(isGoal(node))return path;for(const next of neighbors(node)){const k=key(next);if(!seen.has(k)){seen.add(k);queue.push([...path,next]);}}}return [];}
