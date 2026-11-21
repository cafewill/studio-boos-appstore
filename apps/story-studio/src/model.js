export const chapters=[['숲속 쉼터','바닷가 길','구름 우체국'],['작은 우산','씨앗 봉투','노란 등불'],['길 잃은 편지','비를 만난 새','나눌 자리를 찾는 친구']];
export function createState(seed){return {choices:[],ending:-1,theme:(seed>>>0)%3,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1,2].includes(a.id)&&s.choices.length<3)return {...s,choices:[...s.choices,a.id]};if(a.type==='finish'&&[0,1,2].includes(a.id)&&s.choices.length===3)return {...s,ending:a.id,done:true};return s;}
export function hint(s){return s.done?null:s.choices.length===3?{type:'finish',id:s.theme}:{type:'tap',id:(s.choices.length+s.theme)%3};}
