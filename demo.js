// New, standalone editorial viewer. No imports from the application.
'use strict';
const course=JSON.parse(document.getElementById('course-data').textContent);
const $=id=>document.getElementById(id);
const availableLevels=[...new Set(course.units.map(u=>u.level))];
const key='mundotalk-limited-demo-draft-v1';
let state={level:'A1',unit:course.units[0].id,lesson:course.units[0].lessons[0].id,index:0,answers:{}};
try{const old=JSON.parse(localStorage.getItem(key));if(old&&['A1','A2','B1','B2','C1','C2'].includes(old.level)&&course.units.some(u=>u.id===old.unit&&u.level===old.level&&u.lessons.some(l=>l.id===old.lesson))&&Number.isInteger(old.index)&&old.index>=0&&old.answers&&typeof old.answers==='object'&&!Array.isArray(old.answers))state=old;}catch{$('storage-status').textContent='Armazenamento indisponível: o rascunho dura somente enquanto esta página estiver aberta.';}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch{$('storage-status').textContent='Não foi possível guardar este rascunho neste navegador.';}}
function options(select,items,value){select.replaceChildren();for(const [id,title]of items){const n=el('option',title);n.value=id;select.append(n);}select.value=value;}
function detail(title,text){const d=el('details');d.append(el('summary',title),el('p',text));return d;}
function lesson(){return course.units.find(u=>u.id===state.unit).lessons.find(l=>l.id===state.lesson);}
function render(){
 const units=course.units.filter(u=>u.level===state.level);if(!units.some(u=>u.id===state.unit))state.unit=units[0].id;
 const u=units.find(u=>u.id===state.unit);if(!u.lessons.some(l=>l.id===state.lesson))state.lesson=u.lessons[0].id;
 const l=lesson();state.index=Math.min(Math.max(0,state.index),l.exercises.length-1);
 options($('level'),availableLevels.map(v=>[v,v]),state.level);
 options($('unit'),units.map((u,i)=>[u.id,(i+1)+'. '+u.title]),u.id);options($('lesson'),u.lessons.map(l=>[l.id,l.title]),l.id);
 const root=$('lesson-view');root.replaceChildren(el('h2',l.title),el('p',l.subtitle));
 if(l.guide.goal)root.append(el('p','Objetivo: '+l.guide.goal));
 if(l.guide.explanation)root.append(detail('Explicação da Emily',l.guide.explanation));
 if(l.guide.dialogue?.length)root.append(detail('Diálogo da aula',l.guide.dialogue.join('\n')));
 if(l.guide.speaking)root.append(detail('Pratique em voz alta',l.guide.speaking));
 const e=l.exercises[state.index],view=$('exercise-view');view.replaceChildren(el('p',e.skill,'eyebrow'),el('h3',e.prompt));
 if(e.context)view.append(el('p',e.context,'passage'));
 if(e.image){const image=el('img');image.src=e.image;image.alt=e.imageAlt??'';image.className='exercise-image';view.append(image);}
 if(e.audio){const a=el('audio');a.src=e.audio;a.controls=true;a.preload='none';a.addEventListener('error',()=>{view.append(el('p','Não foi possível reproduzir este áudio.','pending'));});view.append(a);}
 if(e.audioMissing){view.append(el('p','Áudio obrigatório ainda não disponível. Esta questão não valida compreensão auditiva.','pending'));if(e.transcript)view.append(detail('Roteiro para revisão editorial',e.transcript));}
 if(e.words)view.append(el('p','Palavras: '+e.words.join(' · ')));
 if(e.pairs)view.append(el('p','Associe: '+e.pairs.map(p=>p[0]).join(' · ')));
 if(e.options){const group=el('fieldset');group.append(el('legend','Sua resposta'));for(const [i,text]of e.options.entries()){const label=el('label',undefined,'option'),input=el('input');input.type='radio';input.name='exercise';input.value=String(i);input.checked=state.answers[e.id]===text;input.onchange=()=>{state.answers[e.id]=text;save();};label.append(input,el('span',text));group.append(label);}view.append(group);}
 else{const label=el('label','Rascunho da sua resposta'),input=el('textarea');input.maxLength=3000;input.value=typeof state.answers[e.id]==='string'?state.answers[e.id]:'';input.oninput=()=>{state.answers[e.id]=input.value;save();};label.append(input);view.append(label);}
 const d=el('details');d.append(el('summary','Conferir exemplos de resposta e explicação'),el('p',(e.answer??[]).join(' / '),'feedback'),el('p',e.explain),el('p','Autoavaliação: compare o sentido da sua resposta. Esta prévia não atribui nota nem conclui a aula.'));view.append(d);
 $('previous').disabled=state.index===0;$('next').disabled=state.index===l.exercises.length-1;$('position').textContent=(state.index+1)+' de '+l.exercises.length;
 const p=$('productive');p.replaceChildren();for(const t of l.productiveTasks??[]){const a=el('article');a.append(el('h3',t.mode==='speaking'?'Prática oral':'Prática escrita'),el('p',t.prompt));if(t.model)a.append(detail('Exemplo para autoavaliação',t.model));if(t.criteria?.length)a.append(el('p','Critérios: '+t.criteria.join(' · ')));p.append(a);}save();
}
for(const id of ['level','unit','lesson'])$(id).onchange=()=>{state[id]=$(id).value;state.index=0;render();};
$('previous').onclick=()=>{if(state.index>0){state.index--;render();}};$('next').onclick=()=>{if(state.index<lesson().exercises.length-1){state.index++;render();}};
$('expression').onchange=()=>{$('portrait').style.backgroundPosition=$('expression').value;};
$('slow').onclick=()=>{const a=$('voice'),slow=a.playbackRate===1;a.playbackRate=slow?0.8:1;a.preservesPitch=true;$('slow').textContent=slow?'Voltar ao ritmo normal':'Ouvir mais devagar';$('slow').setAttribute('aria-pressed',String(slow));};
$('voice').addEventListener('error',()=>{$('voice-status').textContent='Não foi possível reproduzir a amostra neste navegador.';});
const scenes=[['I am Ana. I work in customer support.','Nice to meet you, Ana! What do you enjoy about customer support?'],['I need coffee before my first meeting.','A very important meeting partner! How do you usually prepare for a call?'],['Não entendi “deadline”.','Deadline é prazo de entrega. My deadline is Friday significa: meu prazo é sexta-feira.'],['Could I send the report on Monday instead?','Thanks for letting me know. What can you share by Friday so we can plan the rest?']];
function dialogue(){const scene=scenes[Number($('scenario').value)]??scenes[0];$('dialogue').replaceChildren(el('p','Aluno fictício: '+scene[0]),el('p','Emily: '+scene[1],'feedback'));}
$('scenario').onchange=dialogue;render();dialogue();
