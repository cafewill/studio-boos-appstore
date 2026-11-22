import {bfs} from '../../shared/search.js';
export function moved(values,id){const p=[[0,1],[2,3],[0,2],[1,3]][id];const out=[...values];[out[p[0]],out[p[1]]]=[out[p[1]],out[p[0]]];return out;}
export function solved(v){return v.every((n,i)=>n===i);}
export function createState(seed){let values=[0,1,2,3];for(const id of [0,2,1+(seed>>>0)%2])values=moved(values,id);if(solved(values))values=moved(values,0);return {values,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tool'||![0,1,2,3].includes(a.id))return s;const values=moved(s.values,a.id);return {...s,values,done:solved(values)};}
export function hint(s){if(s.done)return null;const p=bfs(s.values,v=>[0,1,2,3].map(i=>moved(v,i)),solved,JSON.stringify);return {type:'tool',id:[0,1,2,3].find(i=>JSON.stringify(moved(s.values,i))===JSON.stringify(p[1]))};}
