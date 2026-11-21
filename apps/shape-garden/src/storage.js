// 최초 버전 검사·호환성에 사용하는 래퍼. 저장 구현은 shared 한 곳에서 관리한다.
import {createScopedStorage} from '../../shared/storage.js';
export const KEYS={preferences:'shape-garden:v1:preferences',progress:'shape-garden:v1:progress'};
export function createStorage(getStore){const store=createScopedStorage('shape-garden',1,getStore);return {
 preferences(){const p=store.read('preferences',()=>true);return {sound:p?.sound===true,choices:p?.choices===2?2:3};},
 progress(){return store.read('progress',p=>!!p&&Number.isInteger(p.seed)&&p.seed>=0&&p.seed<=0xffffffff&&Array.isArray(p.results)&&p.results.length<=5&&p.results.every(v=>v==='matched'||v==='skipped'),null);},
 savePreferences(p){store.write('preferences',{sound:p.sound===true,choices:p.choices===2?2:3});},
 saveProgress(p){store.write('progress',{seed:p.seed>>>0,results:[...p.results]});},
 clear(){store.clear(['preferences','progress']);},
};}
