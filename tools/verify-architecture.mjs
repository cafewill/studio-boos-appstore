import assert from 'node:assert/strict';
import {readFile,readdir,access} from 'node:fs/promises';
import {resolve,dirname,relative} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {CONTENTS} from '../apps/catalog.js';
const root=fileURLToPath(new URL('../',import.meta.url));let checks=0;
function check(value,message){assert.ok(value,message);checks++;}
const seen=new Set();
for(const c of CONTENTS){
 check(!seen.has(c.slug),'duplicate '+c.slug);seen.add(c.slug);check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug),'slug');
 check(['game','education','creative'].includes(c.category),'category');check(['3-5','6-8','9-12'].includes(c.ageBand),'age band');check(['implemented','verified'].includes(c.status),'runtime state');
 for(const file of ['index.html','README.md','src/main.js','src/activity.js','src/model.js','src/view.js'])await access(resolve(root,'apps',c.slug,file));
 if(c.thumbnail){check(c.thumbnail===`${c.slug}/cover.svg`,c.slug+' local cover path');await access(resolve(root,'apps',c.thumbnail));await access(resolve(root,'apps',c.slug,'style.css'));}
 const activity=await import(pathToFileURL(resolve(root,'apps',c.slug,'src/activity.js')));check(typeof activity.createActivity==='function',c.slug+' factory');
 const source=await readFile(resolve(root,'apps',c.slug,'src/activity.js'),'utf8');check(source.includes('createBoardActivity'),c.slug+' shared lifecycle adapter');
 for(const type of ['review','plan','verify']){check(typeof c.docs?.[type]==='string',c.slug+' '+type);await access(resolve(root,'apps',c.docs[type]));}
}
async function files(path){const out=[];for(const e of await readdir(path,{withFileTypes:true})){const p=resolve(path,e.name);if(e.isDirectory())out.push(...await files(p));else if(e.name.endsWith('.js'))out.push(p);}return out;}
const edges=new Map();
for(const file of await files(resolve(root,'apps'))){const source=await readFile(file,'utf8'),rels=[];
 for(const match of source.matchAll(/(?:from\s*|import\s*)['"](\.[^'"]+)['"]/g)){
  const target=resolve(dirname(file),match[1]);await access(target);rels.push(target);
  const a=relative(resolve(root,'apps'),file).split('/')[0],b=relative(resolve(root,'apps'),target).split('/')[0];
  if(a==='shared')check(b==='shared'||(file.endsWith('/shared/host.js')&&['catalog.js','content-registry.js'].includes(b)),'shared must not depend on content '+file);
  else if(seen.has(a))check(b===a||b==='shared','content cross-import '+file);
  else check(!seen.has(b),'catalog/home must not import content internals '+file);
 }
 if(!file.endsWith('/shared/storage.js'))check(!/\blocalStorage\b/.test(source),'direct storage '+file);
 check(!/fetch\s*\(|XMLHttpRequest|sendBeacon|https?:\/\//.test(source),'external runtime reference '+file);
 if(seen.has(relative(resolve(root,'apps'),file).split('/')[0]))check(!source.includes('TODO'),'unimplemented template '+file);
 edges.set(file,rels);
}
const visited=new Set(),active=new Set();function visit(file){if(visited.has(file))return;check(!active.has(file),'circular import '+file);active.add(file);for(const target of edges.get(file)||[])visit(target);active.delete(file);visited.add(file);}for(const file of edges.keys())visit(file);
console.log(`PASS: ${CONTENTS.length} registered contents, ${edges.size} JS modules, ${checks} architecture checks; no cross-content imports or cycles.`);
