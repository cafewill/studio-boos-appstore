export const organs=['입','식도','위','작은창자','큰창자'];
export const roles=['입에서 잘게 씹고 침과 섞어요.','식도를 따라 위로 이동해요.','위에서 음식이 섞이고 더 잘게 나뉘어요.','작은창자에서 영양분의 많은 부분을 흡수해요.','큰창자에서 물을 더 흡수하고 남은 것을 내보낼 준비를 해요.'];
export const help='입부터 식도, 위, 작은창자, 큰창자 순서로 길을 따라가요.';
export function createState(seed){return {step:0,snack:(seed>>>0)%2,done:false};}
export function reduce(s,a){return !s.done&&a.type==='tap'&&a.id===s.step?{...s,step:s.step+1,done:s.step+1===organs.length}:s;}
export function hint(s){return s.done?null:{type:'tap',id:s.step};}
