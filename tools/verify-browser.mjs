// 선택적인 개발자 도구. 앱 런타임은 이 패키지나 브라우저 자동화에 의존하지 않는다.
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {CONTENTS} from '../apps/catalog.js';
const require=createRequire(new URL('./browser/package.json',import.meta.url));
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=(process.env.BOOS_TEST_URL||'http://127.0.0.1:7902').replace(/\/$/,'');
let browser;const report={base,results:[],errors:[]};
const assert=(value,message)=>{if(!value)throw new Error(message);};
try {
 browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('request',r=>{if(!r.url().startsWith(base+'/')&&!r.url().startsWith('data:'))report.errors.push('External request: '+r.url());});
 await page.goto(base+'/apps/');await page.locator('#catalog .content-card').last().waitFor();assert(await page.locator('#catalog .content-card').count()===CONTENTS.length,'catalog count matches registry');
 for(const viewport of [{width:360,height:640},{width:390,height:844},{width:520,height:768},{width:768,height:1024},{width:1280,height:800}]){
  await page.setViewportSize(viewport);await page.goto(base+'/apps/');await page.locator('#catalog .content-card').last().waitFor();
  if(viewport.width<=820){
   await page.locator('.discovery-feature').waitFor();await page.locator('[data-discovery="2"]').click();assert(await page.locator('.discovery-feature').getAttribute('href')==='sound-paint/','mobile discovery changes actual destination');await page.locator('[data-discovery="0"]').click();
  }
  const layout=await page.evaluate(()=>{const caption=document.querySelector('.art-note'),figure=document.querySelector('.hero-illustration'),logo=document.querySelector('.brand-mark img');const c=caption.getBoundingClientRect(),f=figure.getBoundingClientRect();const mobile=document.querySelector('.mobile-discovery'),feature=document.querySelector('.discovery-feature').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth+1,captionVisible:c.left>=0&&c.right<=innerWidth&&c.top>=f.top&&c.bottom<=f.bottom+1,captionOutsideCanvas:caption.parentElement===figure&&!document.querySelector('.hero-canvas').contains(caption),mobileShown:getComputedStyle(mobile).display!=='none',desktopShown:getComputedStyle(document.querySelector('.home-hero')).display!=='none',featureFits:feature.left>=0&&feature.right<=innerWidth,logoLoaded:logo.complete&&logo.naturalWidth>0};});
  assert(!layout.overflow,'home horizontal overflow '+viewport.width);assert(layout.logoLoaded,'brand asset '+viewport.width);
  if(viewport.width<=820)assert(layout.mobileShown&&!layout.desktopShown&&layout.featureFits,'mobile recomposition '+viewport.width);else assert(layout.captionVisible&&layout.captionOutsideCanvas,'caption clipped '+viewport.width);

 }
 await page.setViewportSize({width:390,height:844});
 for(const c of CONTENTS){
  await page.goto(`${base}/apps/${c.slug}/`);await page.locator('#host-start').waitFor();
  await page.evaluate(({slug})=>{localStorage.setItem(`${slug}:v1:progress`,JSON.stringify({seed:42,level:0,actions:[]}));},{slug:c.slug});await page.reload();
  await page.locator('#host-start').click();
  let steps=0;
  while(!await page.locator('#host-again').count()&&steps<500){
   const next=page.locator('#host-next');
   if(await next.isVisible()){await next.click();continue;}
   const action=await page.evaluate(async ({slug})=>{const model=await import(`/apps/${slug}/src/${slug==='shape-garden'?'board-model':'model'}.js`);const p=JSON.parse(localStorage.getItem(`${slug}:v1:progress`));let s=model.createState((p.seed+p.level*997)>>>0);for(const a of p.actions)s=model.reduce(s,a);return model.hint(s);},{slug:c.slug});
   assert(action&&Number.isInteger(action.id),c.slug+' valid hint');
   await page.locator(`#activity-root [data-action="${action.type}"][data-id="${action.id}"]`).click();steps++;
  }
  assert(await page.locator('#host-again').count(),c.slug+' completion');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),c.slug+' mobile horizontal overflow');
  await page.locator('#host-parents').click();await page.locator('#host-gate-check').check();await page.locator('#host-gate-open').click();
  await page.locator('#host-reset-request').click();await page.locator('#host-reset-cancel').click();await page.getByRole('button',{name:'보호자 설정 닫기'}).click();
  report.results.push({slug:c.slug,steps,result:'passed'});console.log('PASS browser',c.slug);
 }
 for(const size of [{width:360,height:640},{width:768,height:1024},{width:1280,height:800}]){await page.setViewportSize(size);await page.goto(base+'/apps/');await page.locator('#catalog .content-card').last().waitFor();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'catalog overflow '+size.width);}
 assert(report.errors.length===0,report.errors.join('\n'));
 console.log(`PASS: ${CONTENTS.length} full flows and catalog layouts`);
}catch(e){report.errors.push(e.message.split('\n')[0]);console.error(e.message.split('\n')[0]);process.exitCode=1;}
finally{await browser?.close();await mkdir(new URL('../test/',import.meta.url),{recursive:true});await writeFile(new URL(process.env.BOOS_BROWSER_REPORT||'../test/20261121165150-browser-runtime.json',import.meta.url),JSON.stringify(report,null,2));}
