export const sentences=[['우리는','씨앗을','심어요.'],['친구가','등불을','들어요.'],['작은 배가','강을','건너요.']];
export function createState(seed){return {sentence:(seed>>>0)%3,tiles:[1,2,0],selected:-1,done:false};}
export function reduce(s,a){if(s.done||a.type!=='tap'||![0,1,2].includes(a.id))return s;if(s.selected<0)return {...s,selected:a.id};if(s.selected===a.id)return {...s,selected:-1};const tiles=[...s.tiles];[tiles[s.selected],tiles[a.id]]=[tiles[a.id],tiles[s.selected]];return {...s,tiles,selected:-1,done:tiles.every((v,i)=>v===i)};}
export function hint(s){if(s.done)return null;const i=s.tiles.findIndex((v,i)=>v!==i);return s.selected<0?{type:'tap',id:i}:{type:'tap',id:s.tiles.indexOf(s.selected)};}
