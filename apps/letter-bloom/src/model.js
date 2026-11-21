import {random, shuffled, copy} from '../../shared/random.js';
export const consonants=['ㄱ','ㄴ','ㄷ'],vowels=['ㅏ','ㅗ','ㅜ'];export const syllables=[['가','고','구'],['나','노','누'],['다','도','두']];
export function createState(seed){const r=random(seed);return {c:Math.floor(r()*3),v:Math.floor(r()*3),pickedC:null,pickedV:null,done:false};}
export function reduce(s,a){if(s.done)return s;const n=copy(s);if(a.type==='select'&&a.id>=0&&a.id<3)n.pickedC=a.id;else if(a.type==='tap'&&a.id>=0&&a.id<3)n.pickedV=a.id;else return s;n.done=n.pickedC===n.c&&n.pickedV===n.v;return n;}
export const hint=s=>s.pickedC!==s.c?{type:'select',id:s.c}:{type:'tap',id:s.v};
