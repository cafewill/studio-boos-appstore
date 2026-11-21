// 목록과 상단 요약이 같은 플레이 가능 기준을 사용한다.
export const CATEGORIES = [
 {id:'all',label:'전체 놀이',kind:'star',tone:'all'},
 {id:'education',label:'배우기',kind:'leaf',tone:'learn'},
 {id:'game',label:'생각놀이',kind:'car',tone:'think'},
 {id:'creative',label:'표현놀이',kind:'bell',tone:'create'}
];
export const isPlayable = content => ['implemented','verified'].includes(content.status);
export function summarizeContents(contents){
 const counts={all:0,education:0,game:0,creative:0};
 for(const content of contents){if(!isPlayable(content))continue;counts.all++;if(Object.hasOwn(counts,content.category)&&content.category!=='all')counts[content.category]++;}
 return counts;
}
export function filterContents(contents,{category='all',age='all',query=''}={}){
 const term=query.trim();
 return contents.filter(c=>isPlayable(c)&&(category==='all'||c.category===category)&&(age==='all'||c.ageBand===age)&&(!term||`${c.title} ${c.goal} ${c.skills.join(' ')}`.includes(term)));
}
