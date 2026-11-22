export function createState(seed){return {angles:[0,0,0,0],touched:[],color:(seed>>>0)%3,done:false};}
export function reduce(s,a){if(s.done)return s;if(a.type==='tap'&&[0,1,2,3].includes(a.id))return {...s,angles:s.angles.map((v,i)=>i===a.id?(v+1)%4:v),touched:[...new Set([...s.touched,a.id])]};if(a.type==='finish'&&a.id===0&&s.touched.length>=2)return {...s,done:true};return s;}
export function hint(s){return s.done?null:s.touched.length>=2?{type:'finish',id:0}:{type:'tap',id:[0,1,2,3].find(i=>!s.touched.includes(i))};}
