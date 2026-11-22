export function best(s){const n=s.arrivals[s.index],ends=s.rows.map(r=>r.at(-1)),candidates=ends.map((v,i)=>v<n?i:-1).filter(i=>i>=0);return candidates.reduce((a,i)=>a<0||ends[i]>ends[a]?i:a,-1);}
export function createState(seed){const d=(seed>>>0)%2;return {rows:[[1],[4],[7]],arrivals:[2+d,5+d,8+d],index:0,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||a.id!==best(s))return s;const rows=s.rows.map((r,i)=>i===a.id?[...r,s.arrivals[s.index]]:r);return {...s,rows,index:s.index+1,done:s.index+1===3};}
export function hint(s){return s.done?null:{type:'tap',id:best(s)};}
