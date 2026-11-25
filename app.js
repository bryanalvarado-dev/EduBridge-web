// ===== 1. UTILIDADES =====
const $=s=>document.querySelector(s),
  L=(k,d)=>{
  try{
    return JSON.parse(localStorage.getItem(k))??d
  }catch{
    return d
  }
},
  S=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const e=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

// ===== 2. DATOS (cursos, recursos y mentores) =====
const U=["UPC","PUCP","UNMSM","UTP"],
  C=["Ingeniería de Sistemas","Psicología","Administración"],
  Y=[1,2,3,4,5,6,7,8,9,10],
  D=["Básico","Intermedio","Avanzado"];
// Carreras para el registro (la lista C de arriba es la de los cursos que existen hoy)
const CA=[...C,"Arquitectura","Comunicaciones","Contabilidad","Derecho","Economía","Educación","Enfermería","Ingeniería Civil","Ingeniería Industrial","Marketing","Medicina Humana","Odontología"].sort((a,b)=>a.localeCompare(b,"es"));
const cursos=[
  {n:"Interacción Humano-Computador",c:C[0],d:D[1],t:"Aprende a diseñar interfaces centradas en las personas: heurísticas de usabilidad, prototipado y pruebas con usuarios reales.",w:"8 semanas",m:"HCI y diseño",pm:25,k:["Heurísticas de Nielsen","Prototipado en Figma","Pruebas de usabilidad","Accesibilidad web"]},
  {n:"Cálculo I",c:C[0],d:D[0],t:"Domina los fundamentos del cálculo diferencial e integral con ejercicios resueltos paso a paso.",w:"10 semanas",m:"Cálculo",pm:15,k:["Límites y continuidad","Derivadas y sus aplicaciones","Integrales definidas e indefinidas","Problemas de optimización"]},
  {n:"Psicología del Aprendizaje",c:C[1],d:D[1],t:"Conoce las principales teorías del aprendizaje y cómo aplicarlas en casos prácticos de estudio y enseñanza.",w:"8 semanas",m:"Psicología",pm:19,k:["Conductismo y cognitivismo","Motivación y memoria","Estrategias de estudio","Casos prácticos"]},
  {n:"Finanzas Corporativas",c:C[2],d:D[2],t:"Entiende el valor del dinero en el tiempo y cómo evaluar proyectos de inversión en una empresa.",w:"12 semanas",m:"Finanzas",pm:29,k:["Valor del dinero en el tiempo","VAN y TIR","Costo de capital","Evaluación de proyectos"]}
];
const recs=[
  {n:"Guía de heurísticas de Nielsen",d:D[0],f:"heuristica.png"},
  {n:"Banco de ejercicios de derivadas",d:D[1],f:"ejercicios.webp"},
  {n:"Ejemplo de prototipo en Figma",d:D[1],f:"figma.webp"},
  {n:"Simulacro de examen de finanzas",d:D[2],f:"introduccion.png"}
];
const ments=[
  {n:"Victor Fabio Salazar",s:"HCI y diseño",u:U[0],r:4.8,h:["Lun 4:00 pm","Mié 6:00 pm"],p:12},
  {n:"Jaime Paul Gomez",s:"Cálculo",u:U[1],r:4.6,h:["Mar 5:00 pm","Vie 3:00 pm"],p:12},
  {n:"Gabriel Alfonso Regalado",s:"Finanzas",u:U[2],r:4.9,h:["Jue 7:00 pm"],p:15},
  {n:"Maria Pilar Anticona",s:"Psicología",u:U[3],r:4.5,h:["Sáb 10:00 am"],p:10}
];
cursos.forEach((c,i)=>c.i=["tecnologia.jpg","matematica.png","apoyo.jpg","negocios.jpg"][i]);
recs.forEach((c,i)=>c.i=["ciencias-exactas.jpg","matematica.png","tecnologia.jpg","negocios.jpg"][i]);
ments.forEach((m,i)=>m.i="alumno"+(i+1)+".jpg");

// ===== 3. UTILIDADES DE INTERFAZ (avisos, selects, validación) =====
const say=m=>{
  const t=$("#toast");
  t.textContent=m;
  t.classList.add("on");
  clearTimeout(say.t);
  say.t=setTimeout(()=>t.classList.remove("on"),4000)
};
const fill=(id,a,ph)=>{
  $(id).innerHTML=(ph?`<option value="">${ph}</option>`:"")+a.map(x=>`<option>${e(x)}</option>`).join("")
};
const err=(id,m)=>{
  $(id).textContent=m;
  return!m
};
const user=()=>L("user",null),
  gate=()=>user()||(document.querySelectorAll("dialog[open]").forEach(d=>d.close()),say("Inicia sesión para usar esta función."),location.hash="#cuenta",false);
const ok=s=>/^\S+@\S+\.\S+$/.test(s);
// Datos propios de cada usuario (se guardan con su correo): cursos guardados, historial, certificaciones y plan
const key=k=>k+":"+user().m,
  mine=(k,d)=>user()?L(key(k),d):d,
  save=(k,v)=>S(key(k),v),
  allBooks=()=>Object.keys(localStorage).filter(k=>k.startsWith("books:")).flatMap(k=>L(k,[]));
// ===== 4. INICIO: llenar los selectores =====
[
  ["#ru",U,"Selecciona tu universidad"],
  ["#rc",CA,"Selecciona tu carrera"],
  ["#ry",Y,"Selecciona tu ciclo"],
  ["#cc",C,"Todas"],
  ["#cd",D,"Todas"],
  ["#rd",D,"Todas"]
].forEach(a=>fill(...a));
fill("#fa",cursos.map(c=>c.n));

// ===== 5. CUENTA: sesión, registro, login y recuperar contraseña =====
function session(){
  const u=user(),
    b=$("#ses");
  b.textContent=u?"Salir ("+u.n.split(" ")[0]+")":"Iniciar sesión";
  b.onclick=u?ev=>{
    ev.preventDefault();
    localStorage.removeItem("user");
    session();
    draw();
    say("Sesión cerrada.")
  }:null
}
$("#reg").onsubmit=ev=>{
  ev.preventDefault();
  const n=$("#rn").value.trim(),
    m=$("#re").value.trim().toLowerCase(),
    p=$("#rp").value;
  if(!n)return err("#rerr","Escribe tu nombre completo.");
  if(!ok(m))return err("#rerr","Escribe un correo válido.");
  if(p.length<6)return err("#rerr","La contraseña necesita al menos 6 caracteres.");
  if(!$("#ru").value||!$("#rc").value||!$("#ry").value)return err("#rerr","Selecciona universidad, carrera y ciclo.");
  const us=L("users",[]);
  if(us.some(x=>x.m===m))return err("#rerr","Ese correo ya está registrado. Inicia sesión.");
  const u={n,m,p,u:$("#ru").value,c:$("#rc").value,y:$("#ry").value};
  us.push(u);
  S("users",us);
  S("user",u);
  err("#rerr","");
  session();
  if([...$("#cc").options].some(o=>o.value===u.c))$("#cc").value=u.c;
  draw();
  say("Cuenta creada. Ya iniciaste sesión.")
};
$("#log").onsubmit=ev=>{
  ev.preventDefault();
  const u=L("users",[]).find(x=>x.m===$("#le").value.trim().toLowerCase()&&x.p===$("#lp").value);
  if(!u)return err("#lerr","Correo o contraseña incorrectos.");
  err("#lerr","");
  S("user",u);
  session();
  draw();
  say("Bienvenido, "+u.n+".")
};
$("#forg").onclick=()=>{
  $("#rec").hidden=!$("#rec").hidden;
  $("#xe").focus()
};
$("#rec").onsubmit=ev=>{
  ev.preventDefault();
  const us=L("users",[]),
    u=us.find(x=>x.m===$("#xe").value.trim().toLowerCase());
  if(!u)return err("#xerr","No encontramos ese correo.");
  if($("#xp").value.length<6)return err("#xerr","La contraseña necesita al menos 6 caracteres.");
  u.p=$("#xp").value;
  S("users",us);
  err("#xerr","");
  $("#rec").hidden=true;
  say("Contraseña actualizada. Ya puedes iniciar sesión.")
};

// ===== 6. CURSOS, RECURSOS Y MENTORES (listas y filtros) =====
function draw(){
  const sv=mine("saved",[]),
    q=$("#cq").value.toLowerCase(),
    c=$("#cc").value,
    d=$("#cd").value;
  const r=cursos.filter(x=>x.n.toLowerCase().includes(q)&&(!c||x.c===c)&&(!d||x.d===d));
  $("#cn").textContent=r.length?r.length+" cursos encontrados.":"No hay cursos con esos filtros. Prueba quitar alguno.";
  $("#cl").innerHTML=r.map(x=>`<article class="card"><img src="imagenes/${x.i}" alt="Imagen del curso ${e(x.n)}"><h3>${e(x.n)}</h3><div class="tags"><span class="tag">${e(x.c)}</span><span class="tag">${x.d}</span></div><button type="button" class="vlink" data-course="${e(x.n)}">Ver información del curso</button><button class="btn alt" data-save="${e(x.n)}" aria-pressed="${sv.includes(x.n)}">${sv.includes(x.n)?"Guardado":"Guardar curso"}</button></article>`).join("");
  const q2=$("#rq").value.toLowerCase(),
    d2=$("#rd").value,
    r2=recs.filter(x=>x.n.toLowerCase().includes(q2)&&(!d2||x.d===d2));
  $("#rn2").textContent=r2.length?r2.length+" recursos encontrados.":"No hay recursos con esos filtros.";
  $("#rl").innerHTML=r2.map(x=>`<article class="card" data-res="${e(x.n)}"><img src="imagenes/${x.i}" alt="Imagen del recurso ${e(x.n)}"><h3>${e(x.n)}</h3><div class="tags"><span class="tag">${x.d}</span></div><div class="ract"><button type="button" class="btn" data-res="${e(x.n)}">Ver recurso</button><button type="button" class="btn alt" data-rep="${e(x.n)}">Reportar recurso</button></div></article>`).join("");
  const q3=$("#mq").value.toLowerCase(),
    r3=ments.filter(m=>(m.n+m.s).toLowerCase().includes(q3));
  $("#mn").textContent=r3.length?r3.length+" mentores disponibles.":"No encontramos mentores con esa búsqueda.";
  $("#ml").innerHTML=r3.map(m=>`<article class="card"><img src="imagenes/${m.i}" alt="Foto de ${e(m.n)}, mentor de ${e(m.s)}"><h3>${e(m.n)}</h3><div class="tags"><span class="tag">${e(m.u)}</span><span class="tag">★ ${m.r}</span></div><p>Disponibilidad: ${m.h.map(h=>`<span class="tag">${h}</span>`).join("")}</p><button type="button" class="vlink" data-prof="${e(m.n)}">Ver perfil del mentor</button><button class="btn" data-pick="${e(m.n)}">Elegir mentor</button></article>`).join("");
  fill("#bm",ments.map(m=>m.n));
  slots();
  panel();
  plan()
}
function slots(){
  const m=ments.find(x=>x.n===$("#bm").value)||ments[0];
  fill("#bs",m.h)
}
$("#bm").onchange=slots;
["#cq","#cc","#cd","#rq","#rd","#mq"].forEach(i=>$(i).oninput=draw);

// ===== 6b. PERFIL DEL MENTOR (ventana emergente) =====
function openProfile(n){
  const m=ments.find(x=>x.n===n);
  $("#mpi").src="imagenes/"+m.i;
  $("#mpi").alt="Foto de "+m.n;
  $("#mpt").textContent=m.n;
  $("#mpb").innerHTML=`<p class="mp-price"><b>S/ ${m.p}</b> por mentoría</p><p><span class="tag">${e(m.u)}</span><span class="tag">★ ${m.r}</span></p><p>Especialista en ${e(m.s)}.</p><p>Disponible: ${e(m.h.join(" · "))}</p>`;
  $("#mpe").dataset.pick=m.n;
  $("#mp").showModal()
}
$("#mpx").onclick=()=>$("#mp").close();
$("#mp").addEventListener("click",ev=>{
  if(ev.target===$("#mp"))$("#mp").close()
});

// ===== 6c. INFORMACIÓN DEL CURSO (ventana emergente) =====
function courseBody(n){
  const c=cursos.find(x=>x.n===n),
    sv=mine("saved",[]).includes(n),
    en=mine("enrolled",[]).includes(n),
    m=ments.find(x=>x.s===c.m);
  $("#cpi").src="imagenes/"+c.i;
  $("#cpi").alt="Imagen del curso "+c.n;
  $("#cpt").textContent=c.n;
  $("#cpb").innerHTML=`<p><span class="tag">${e(c.c)}</span><span class="tag">${c.d}</span><span class="tag">${e(c.w)}</span></p><p class="mp-price"><b>S/ ${c.pm} al mes</b>Pago mensual</p><p>${e(c.t)}</p><h4>Lo que aprenderás</h4><ul>${c.k.map(k=>`<li>${e(k)}</li>`).join("")}</ul>${m?`<h4>Mentor recomendado</h4><p>${e(m.n)} · ${e(m.u)}</p>`:""}<div class="cp-act"><button type="button" class="btn alt" data-save="${e(n)}" aria-pressed="${sv}">${sv?"Guardado":"Guardar curso"}</button>${en?`<button type="button" class="btn alt" data-unenroll="${e(n)}">✓ Inscrito (cancelar)</button>`:`<button type="button" class="btn" data-enroll="${e(n)}">Inscribirse al curso</button>`}</div>`
}
function openCourse(n){
  courseBody(n);
  if(!$("#cp").open)$("#cp").showModal()
}
$("#cpx").onclick=()=>$("#cp").close();
$("#cp").addEventListener("click",ev=>{
  if(ev.target===$("#cp"))$("#cp").close()
});

// ===== 6d. RECURSO (ventana emergente con imagen) =====
function openResource(n){
  const r=recs.find(x=>x.n===n);
  $("#rst").textContent=r.n;
  $("#rsb").innerHTML=`<p><span class="tag">${r.d}</span></p>${r.f?`<img class="rimg" src="imagenes/${e(r.f)}" alt="Vista del recurso ${e(r.n)}">`:`<div class="rph" role="img" aria-label="Imagen del recurso pendiente"><span>Aquí irá la imagen del recurso</span></div>`}<div class="cp-act"><button type="button" class="btn alt" data-rep="${e(n)}">Reportar recurso</button></div>`;
  if(!$("#rsc").open)$("#rsc").showModal()
}
$("#rsx").onclick=()=>$("#rsc").close();
$("#rsc").addEventListener("click",ev=>{
  if(ev.target===$("#rsc"))$("#rsc").close()
});

// ===== 7. BOTONES: guardar, reportar, elegir mentor, planes, completar tutoría =====
document.addEventListener("click",ev=>{
  const card=ev.target.closest(".card[data-res]");
  if(card&&!ev.target.closest("button"))openResource(card.dataset.res);
  const b=ev.target.closest("button");
  if(!b)return;
  if(b.dataset.save){
    if(!gate())return;
    const sv=mine("saved",[]),
      i=sv.indexOf(b.dataset.save);
    i<0?sv.push(b.dataset.save):sv.splice(i,1);
    save("saved",sv);
    draw();
    if($("#cp").open)courseBody(b.dataset.save);
    say(i<0?"Curso guardado.":"Curso quitado de guardados.")
  }
  if(b.dataset.rep){
    if(!gate())return;
    const r=L("reps",[]);
    r.push(b.dataset.rep);
    S("reps",r);
    say("Gracias. Revisaremos el recurso reportado.")
  }
  if(b.dataset.enroll){
    if(!gate())return;
    const en=mine("enrolled",[]),
      c=cursos.find(x=>x.n===b.dataset.enroll);
    if(!en.includes(c.n)){
      en.push(c.n);
      save("enrolled",en)
    }
    courseBody(c.n);
    say("Te inscribiste en "+c.n+" (S/ "+c.pm+" al mes).")
  }
  if(b.dataset.unenroll){
    if(!gate())return;
    save("enrolled",mine("enrolled",[]).filter(x=>x!==b.dataset.unenroll));
    courseBody(b.dataset.unenroll);
    say("Cancelaste tu inscripción en "+b.dataset.unenroll+".")
  }
  if(b.dataset.prof)openProfile(b.dataset.prof);
  if(b.dataset.course)openCourse(b.dataset.course);
  if(b.dataset.res)openResource(b.dataset.res);
  if(b.dataset.pick){
    if($("#mp").open)$("#mp").close();
    if($("#cp").open)$("#cp").close();
    $("#bm").value=b.dataset.pick;
    slots();
    $("#bk").scrollIntoView();
    $("#bt").focus()
  }
  if(b.dataset.plan){
    if(!gate())return;
    save("plan",b.dataset.plan);
    plan();
    say("Plan "+b.dataset.plan+" activado.")
  }
  if(b.dataset.done){
    const bs=mine("books",[]);
    bs.find(x=>x.id==b.dataset.done).done=1;
    save("books",bs);
    panel();
    say("Tutoría marcada como completada. Ahora puedes calificar.")
  }
});

// ===== 8. TUTORÍAS: agendar =====
$("#bk").onsubmit=ev=>{
  ev.preventDefault();
  if(!gate())return;
  const t=$("#bt").value.trim();
  if(t.length<10)return err("#berr","Cuéntanos con más detalle tu dificultad (mínimo 10 caracteres).");
  const bs=mine("books",[]);
  if(bs.some(x=>x.m===$("#bm").value&&x.h===$("#bs").value))return err("#berr","Ya agendaste ese horario.");
  bs.push({id:Date.now(),m:$("#bm").value,h:$("#bs").value,t,rem:$("#br").checked});
  save("books",bs);
  err("#berr","");
  $("#bt").value="";
  panel();
  say("Tutoría agendada con "+$("#bm").value+" ("+$("#bs").value+")."+($("#br").checked?" Te enviaremos un recordatorio.":""))
};

// ===== 9. MI PANEL: progreso, insignias, historial y ranking =====
function panel(){
  const on=!!user(),
    sv=mine("saved",[]),
    bs=mine("books",[]),
    dn=bs.filter(b=>b.done),
    rt=allBooks().filter(b=>b.rate);
  const p=Math.min(100,sv.length*10+dn.length*20+bs.length*10);
  $("#pf").style.width=p+"%";
  $("#pb").setAttribute("aria-valuenow",p);
  $("#pt").textContent=`${p}% completado: ${sv.length} cursos guardados, ${dn.length} tutorías completadas.`;
  const bd=[
    [sv.length>0,"Primer curso guardado"],
    [bs.length>0,"Primera tutoría agendada"],
    [dn.length>0,"Mentoría completada"],
    [bs.some(b=>b.rate),"Mentor calificado"]
  ];
  $("#bd").innerHTML=bd.map(([a,t])=>`<li>${a?"🏅 "+t:"Bloqueada: "+t}</li>`).join("");
  $("#hs").innerHTML=!on?"<p>Inicia sesión para ver tu historial de mentorías.</p>":bs.length?bs.map(b=>`<div class="bk"><strong>${e(b.m)}</strong> · ${e(b.h)}<br>Tema: ${e(b.t)}<br>${b.rem?"Recordatorio activo. ":""}${b.done?(b.rate?`Nota: ${e(b.note)} · Calificación: ${b.rate}/5`:`<form class="pf" data-id="${b.id}" novalidate><label>Notas de la tutoría<textarea rows="2" required></textarea></label><label>Calificar mentor<select><option value="">Elige</option>${[5,4,3,2,1].map(n=>`<option>${n}</option>`)}</select></label><button class="btn">Guardar notas y calificación</button></form>`):`<button class="btn alt" data-done="${b.id}">Marcar como completada</button>`}</div>`).join(""):"<p>Aún no tienes tutorías. Agenda la primera en la sección Mentores.</p>";
  const sc=ments.map(m=>{
    const r=rt.filter(b=>b.m===m.n).map(b=>+b.rate);
    return{n:m.n,v:(m.r*10+r.reduce((a,b)=>a+b,0))/(10+r.length)}
  }).sort((a,b)=>b.v-a.v);
  rankDraw(sc,rt)
}
let rankKey="";
function rankDraw(sc,rt){
  const k=JSON.stringify(sc)+rt.length;
  if(k===rankKey)return;
  rankKey=k;
  const prev=L("rankPrev",[]);
  $("#rk").className="rank";
  $("#rk").innerHTML=sc.map((s,i)=>{
    const m=ments.find(x=>x.n===s.n),
      o=prev.indexOf(s.n),
      n=rt.filter(b=>b.m===s.n).length,
      mv=o<0||o===i?"":o>i?`<span class="up">▲ ${o-i}<span class="sr"> posiciones arriba</span></span>`:`<span class="dn">▼ ${i-o}<span class="sr"> posiciones abajo</span></span>`;
    return`<li class="rk${i<3?" top"+(i+1):""}"><span class="pos"><span class="sr">Puesto </span>${i+1}</span><img src="imagenes/${m.i}" alt="Foto de ${e(m.n)}"><div class="inf"><strong>${e(m.n)}</strong>${mv}<span class="tag">${e(m.u)}</span><div class="meter" aria-hidden="true"><i data-w="${(s.v/5*100).toFixed(0)}"></i></div></div><div class="sc"><b>${s.v.toFixed(2)}</b><span aria-hidden="true">${"★".repeat(Math.round(s.v))}</span><span class="sr"> de 5 puntos${n?", "+n+" calificación(es) de estudiantes":""}</span></div></li>`
  }).join("");
  S("rankPrev",sc.map(s=>s.n));
  const go=()=>document.querySelectorAll("#rk .meter i").forEach(b=>b.style.width=b.dataset.w+"%");
  if("IntersectionObserver"in window){
    const o=new IntersectionObserver(a=>{
      if(a[0].isIntersecting){
        go();
        o.disconnect()
      }
    },{threshold:.2});
    o.observe($("#rk"))
  }else go()
}
$("#hs").addEventListener("submit",ev=>{
  ev.preventDefault();
  const f=ev.target,
    n=f.querySelector("textarea").value.trim(),
    r=f.querySelector("select").value;
  if(!n||!r)return say("Escribe tus notas y elige una calificación.");
  const bs=mine("books",[]),
    b=bs.find(x=>x.id==f.dataset.id);
  b.note=n;
  b.rate=r;
  save("books",bs);
  panel();
  say("Notas y calificación guardadas.")
});
$("#cert").onclick=()=>{
  if(!gate())return;
  const h=mine("books",[]).filter(b=>b.done).length;
  if(!h)return say("Completa al menos una tutoría para solicitar la certificación.");
  const c=mine("certs",[]);
  c.push({h,f:Date.now()});
  save("certs",c);
  say("Solicitud enviada: certificación de "+h+" hora(s) de mentoría.")
};

// ===== 10. FORO DE CONSULTAS =====
function foro(){
  const a=$("#fa").value,
    p=L("posts",[]).filter(x=>x.a===a);
  $("#fl").innerHTML=p.length?p.map(x=>`<div class="post"><strong>${e(x.u)}</strong><br>${e(x.t)}</div>`).join(""):"<p>Aún no hay consultas en esta asignatura. Publica la primera.</p>"
}
$("#fa").onchange=foro;
$("#fp").onsubmit=ev=>{
  ev.preventDefault();
  if(!gate())return;
  const t=$("#ft").value.trim();
  if(t.length<10)return err("#ferr","Escribe tu consulta con al menos 10 caracteres.");
  const p=L("posts",[]);
  p.push({a:$("#fa").value,u:user().n,t});
  S("posts",p);
  err("#ferr","");
  $("#ft").value="";
  foro();
  say("Consulta publicada.")
};

// ===== 11. PLANES =====
function plan(){
  const p=mine("plan",null);
  $("#pl").textContent="Plan actual: "+(p||"ninguno (elige uno)")+".";
  document.querySelectorAll(".plan").forEach(c=>{
    const on=c.dataset.p===p,
      b=c.querySelector("button");
    c.classList.toggle("on",on);
    b.textContent=on?"✓ Plan actual":"Elegir "+c.dataset.p;
    b.disabled=on
  })
}

// ===== 12. CONTACTO =====
$("#ct").onsubmit=ev=>{
  ev.preventDefault();
  if(!$("#cn2").value.trim())return err("#cerr","Escribe tu nombre.");
  if(!ok($("#ce").value.trim()))return err("#cerr","Escribe un correo válido.");
  if($("#cm").value.trim().length<10)return err("#cerr","Cuéntanos más en tu mensaje (mínimo 10 caracteres).");
  const m=L("msgs",[]);
  m.push({k:$("#ck").value,t:$("#cm").value});
  S("msgs",m);
  err("#cerr","");
  ev.target.reset();
  say("Mensaje enviado. Te responderemos por correo.")
};

// ===== 13. MENÚ MÓVIL E INICIO =====
$("#mb").onclick=()=>{
  const n=$("#nav").classList.toggle("on");
  $("#mb").setAttribute("aria-expanded",n)
};
$("#nav").addEventListener("click",ev=>{
  if(ev.target.tagName==="A"){
    $("#nav").classList.remove("on");
    $("#mb").setAttribute("aria-expanded","false")
  }
});
session();
draw();
foro();
plan();
