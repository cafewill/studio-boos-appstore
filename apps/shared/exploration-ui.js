import {escape} from './board-ui.js';
export const scene=(art,label)=>`<svg class="explore-art" viewBox="0 0 500 300" role="img" aria-label="${escape(label)}">${art}</svg>`;
export const tools=buttons=>`<div class="explore-tools">${buttons.join('')}</div>`;
export const summary=(state,message,detail)=>`${state.done?`<p class="scene-result">${escape(message)}</p>`:''}<p class="quiet-note">${escape(detail)}</p>`;
