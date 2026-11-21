import {createLifecycle} from './lifecycle.js';
import {validAction} from './random.js';
export function createBoardActivity(context, model, render) {
 const life=createLifecycle();let root=null,state=model.createState(context.seed),history=[],hinted=false,retries=0;
 for(const a of context.actions||[]){if(!validAction(a))break;const next=model.reduce(state,a);if(JSON.stringify(next)!==JSON.stringify(state)){state=next;history.push(a);}}
 function draw(focus){if(!root)return;root.innerHTML=render(state);if(hinted){const hint=model.hint(state);const target=hint&&root.querySelector(`[data-action="${hint.type}"][data-id="${hint.id}"]`);target?.classList.add('suggested');target?.setAttribute('aria-description','다음에 살펴볼 곳');}if(focus)root.querySelector(focus)?.focus({preventScroll:true});if(state.done)root.querySelectorAll('[data-action]').forEach(b=>b.disabled=true);context.changed({done:state.done===true,canUndo:history.length>0,hinted});}
 function apply(a){if(life.paused||state.done||!validAction(a))return;const next=model.reduce(state,a);if(JSON.stringify(next)===JSON.stringify(state)){retries++;if(retries>=2){hinted=true;draw(`[data-action="${a.type}"][data-id="${a.id}"]`);}context.announce('다시 살펴봐도 괜찮아요. 도움을 눌러 함께 해 봐요.');return;}state=next;history.push(a);hinted=false;retries=0;draw(`[data-action="${a.type}"][data-id="${a.id}"]`);context.save();if(state.done)context.announce('함께 살펴봤어요. 다음으로 가거나 쉬어도 좋아요.');}
 return {
  mount(element){root=element;draw();life.on(root,'click',e=>{const b=e.target.closest('button');if(!b||b.disabled||life.paused)return;if(b.dataset.audio!==undefined){context.audio.play(model.notes?.(state)||[{pitch:Number(b.dataset.audio)||0,step:0}]);return;}if(b.dataset.action)apply({type:b.dataset.action,id:Number(b.dataset.id)});});},
  pause(){life.pause();context.audio.stop();},resume(){life.resume();},
  serialize(){return {actions:[...history]};},
  undo(){if(life.paused||!history.length)return;history.pop();state=model.createState(context.seed);for(const a of history)state=model.reduce(state,a);hinted=false;draw();context.save();},
  help(){if(life.paused)return;if(!model.hint(state)){context.announce('한 걸음 되돌려 다른 길을 살펴보거나, 이번 활동을 건너뛰어도 괜찮아요.');return;}hinted=true;draw();context.announce(model.help||'테두리가 표시된 곳부터 살펴보세요.');},
  destroy(){life.destroy();context.audio.stop();if(root)root.replaceChildren();root=null;},
 };
}
