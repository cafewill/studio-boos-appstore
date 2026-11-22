import {action,note,chip,escape} from '../../shared/board-ui.js';
import {scene,tools,summary} from '../../shared/exploration-ui.js';
import {cards} from './model.js';
export function render(s){const n=s.queue[0]??s.kept.at(-1);return note('점수는 없어요. 기억이 나지 않으면 다시 보아도 괜찮아요.')+`<div class="recall-postcard"><span class="postmark">${s.done?'함께 본 엽서':s.revealed?'엽서 뒷면':'엽서 앞면'}</span><h2>${s.revealed||s.done?cards[n]:['씨앗은 어디에 있었을까요?','배 옆에는 무엇이 있었을까요?','나무 곁에는 무엇이 있었을까요?'][n]}</h2>${s.revealed?'<p>잠깐 살펴보고 내 기억을 골라요.</p>':''}</div>`+tools(s.revealed?[action('기억해 둘게요',0),action('나중에 다시 볼게요',1)]:[action('엽서 뒤집기',0,{type:'reveal'})])+chip(`살펴본 엽서 ${s.kept.length}/3`)+summary(s,'세 엽서를 내 속도로 살펴봤어요.','회상 여부는 내가 고르는 것이며 기억력 진단이 아니에요.');}
