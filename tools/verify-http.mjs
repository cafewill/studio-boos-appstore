// 이미 실행 중인 로컬 서버의 파일 제공 검사. 브라우저 실행·터치 검증과 구분한다.
import {writeFile} from 'node:fs/promises';
import {CONTENTS} from '../apps/catalog.js';
const base=(process.env.BOOS_TEST_URL||'http://127.0.0.1:7902').replace(/\/$/,'');
const paths=new Set(['/apps/','/apps/catalog.js','/apps/content-registry.js','/apps/home.js','/apps/site.css','/apps/shared/host.js','/apps/shared/board-activity.js','/apps/shared/experiment.css','/apps/shared/exploration.css','/apps/shared/search.js','/apps/shared/exploration-ui.js']);
for(const c of CONTENTS){for(const file of ['index.html','src/main.js','src/activity.js','src/model.js','src/view.js'])paths.add(`/apps/${c.slug}/${file}`);if(c.thumbnail){paths.add('/apps/'+c.thumbnail);paths.add(`/apps/${c.slug}/style.css`);}}
const results=[],errors=[],pending=[...paths];
async function worker(){while(pending.length){const path=pending.shift();try{const response=await fetch(base+path,{signal:AbortSignal.timeout(5000)});const body=await response.text(),type=response.headers.get('content-type')||'';if(!response.ok||!body.length)throw new Error('HTTP '+response.status);if(path.endsWith('.js')&&!/javascript/.test(type))throw new Error('JS MIME '+type);if(path.endsWith('.svg')&&!/svg/.test(type))throw new Error('SVG MIME '+type);results.push({path,status:response.status,type});}catch(e){errors.push({path,error:e.message});}}}
await Promise.all(Array.from({length:6},worker));
const report={base,contents:CONTENTS.length,checked:results.length,errors,results:results.sort((a,b)=>a.path.localeCompare(b.path)),scope:'HTTP file delivery only; no browser execution or visual verification'};
if(process.env.BOOS_HTTP_REPORT)await writeFile(process.env.BOOS_HTTP_REPORT,JSON.stringify(report,null,2)+'\n');
console.log(`${errors.length?'FAIL':'PASS'}: ${CONTENTS.length} contents, ${results.length} HTTP resources, ${errors.length} errors. Browser execution is separate.`);
for(const e of errors.slice(0,12))console.error(e.path,e.error);if(errors.length>12)console.error(`... ${errors.length-12} further HTTP errors; see report.`);if(errors.length)process.exitCode=1;
