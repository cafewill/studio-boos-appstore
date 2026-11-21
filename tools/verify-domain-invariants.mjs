import assert from 'node:assert/strict';
import {createState as sudoku} from '../apps/number-squares/src/model.js';
import {isSolved,counts,createState as loop} from '../apps/loop-walk/src/model.js';
import {createState as ten,reduce as tenStep} from '../apps/ten-friends/src/model.js';
import {createState as clock} from '../apps/clock-walk/src/model.js';
import {createState as letters,syllables} from '../apps/letter-bloom/src/model.js';
import {deliveries,createState as delivery} from '../apps/little-delivery/src/model.js';
import {moved} from '../apps/double-garden/src/model.js';
import {createState as layers,combined} from '../apps/layered-paper/src/model.js';
import {NEW_CONTENTS} from '../apps/content-registry.js';
let checks=0;const check=(v,m)=>{assert.ok(v,m);checks++;};
function solutionCount(values){const board=[...values];let total=0;function solve(){const cell=board.indexOf(0);if(cell<0){total++;return;}const row=Math.floor(cell/4),col=cell%4;for(let v=1;v<=4;v++){let ok=true;for(let i=0;i<16;i++)if(board[i]===v&&(Math.floor(i/4)===row||i%4===col||(Math.floor(i/8)===Math.floor(row/2)&&Math.floor(i%4/2)===Math.floor(col/2))))ok=false;if(ok){board[cell]=v;solve();board[cell]=0;if(total>1)return;}}}solve();return total;}
for(let seed=0;seed<100;seed++){
 const su=sudoku(seed);check(solutionCount(su.values)===1,'sudoku unique solution');
 for(let row=0;row<4;row++)check(new Set(su.solution.slice(row*4,row*4+4)).size===4,'sudoku row');
 const lo=loop(seed);check(isSolved({...lo,lines:lo.target}),'loop generated witness valid');check(!isSolved({...lo,lines:lo.target.slice(1)}),'open loop rejected');check(counts(lo.target).every((v,i)=>v===lo.clues[i]),'loop clue counts');
 const te=ten(seed);const count=new Map();for(const x of te.numbers)count.set(x,(count.get(x)||0)+1);for(let x=1;x<=9;x++)check(x===5?((count.get(x)||0)%2===0):(count.get(x)||0)===(count.get(10-x)||0),'ten complement supply');
 const first=tenStep(te,{type:'tap',id:0});const mismatch=te.numbers.findIndex((x,i)=>i>0&&x+te.numbers[0]!==10);if(mismatch>=0)check(JSON.stringify(tenStep(first,{type:'tap',id:mismatch}))===JSON.stringify(first),'wrong sum cannot remove');
 const cl=clock(seed);check(new Set(cl.options).size===3&&cl.options.includes(cl.hour),'clock unique choices');
 const le=letters(seed);check(syllables[le.c][le.v].length===1,'one Hangul syllable');
 const de=delivery(seed);check(!deliveries(de).some(Boolean),'nothing delivered at start');check(!deliveries(de,[de.path[0],...de.houses,...de.pickups]).some(Boolean),'must pick up before arrival');
 const la=layers(seed);check(combined(0,0)!==la.target,'layer puzzle unfinished at start');
}
check(JSON.stringify(moved([2,2,2,2,...Array(12).fill(0)],0).slice(0,4))==='[4,4,0,0]','merge once per tile per move');
for(const c of NEW_CONTENTS){const model=await import(`../apps/${c.slug}/src/model.js`),activity=await import(`../apps/${c.slug}/src/activity.js`);const instance=activity.createActivity({seed:3,actions:[],prefs:{sound:false},audio:{stop(){},play(){}},announce(){},save(){},changed(){}});for(const name of ['mount','pause','resume','serialize','destroy'])check(typeof instance[name]==='function',c.slug+' lifecycle '+name);instance.pause();instance.resume();instance.destroy();instance.destroy();
 const initial=model.createState(3);for(const a of [{type:'tap',id:1024},{type:'select',id:1024},{type:'unexpected',id:0}])check(JSON.stringify(model.reduce(initial,a))===JSON.stringify(initial),c.slug+' invalid action');
}
console.log(`PASS: ${checks} independent puzzle, learning and lifecycle assertions.`);
