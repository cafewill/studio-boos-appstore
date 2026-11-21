export function random(seed) { let n=seed>>>0; return ()=> {n=(n+0x6d2b79f5)|0;let t=Math.imul(n^n>>>15,1|n);t^=t+Math.imul(t^t>>>7,61|t);return ((t^t>>>14)>>>0)/4294967296;}; }
export function shuffled(items, rng) {const out=[...items];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
export const copy = state => JSON.parse(JSON.stringify(state));
export function seedNow(){try{return crypto.getRandomValues(new Uint32Array(1))[0];}catch{return Date.now()>>>0;}}
export function validAction(a){return !!a&&typeof a==='object'&&['tap','select','tool','finish','start','clear','mark','reveal'].includes(a.type)&&Number.isInteger(a.id)&&a.id>=0&&a.id<=1024;}
