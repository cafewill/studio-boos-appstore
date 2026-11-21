import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('../',import.meta.url));
for(const command of [['node','tools/verify-shape-garden.mjs'],['node','tools/verify-content-models.mjs'],['node','tools/verify-domain-invariants.mjs'],['node','tools/verify-expand10.mjs'],['node','tools/verify-shared.mjs'],['node','tools/verify-architecture.mjs'],['python3','tools/verify-project.py']]){
 console.log('\n'+command.join(' '));const result=spawnSync(command[0],command.slice(1),{cwd,stdio:'inherit'});if(result.status!==0){console.error('검증 실패:',command.join(' '));process.exit(result.status||1);}
}
console.log('\nPASS: all automated checks. Browser, device and child observations are separate.');
