import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
import {sentences} from './model.js';
export function render(s){const words=sentences[s.sentence];return note('누가 · 무엇을 · 어떻게 하는지 차례로 놓아 봐요. 두 조각을 누르면 자리가 바뀌어요.')+`<div class="sentence-loom">${s.tiles.map((n,i)=>action(words[n],i,{pressed:s.selected===i})).join('')}</div><p class="sentence-guide">누가　·　무엇을　·　어떻게</p>`+summary(s,'낱말들이 짧은 문장으로 이어졌어요.','이 활동의 예문 순서를 살펴봐요. 한국어의 모든 문장 순서가 하나라는 뜻은 아니에요.');}
