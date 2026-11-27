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
// Universidades para el registro (la lista U de arriba es la que usan los mentores de ejemplo)
const UR=[...U,"UNI","UNALM","UNFV","UNAC","UNSA","UNT","UNSAAC","UNCP","UNAP","UNP","UNJFSC","UNTELS","UNH","UNICA","UNSCH","UNAJMA","UNDAC","UNAS","UNASAM","UNC","UNCA","UNPRG","UNU","UNTRM","UNTUMBES","UNAAA","UNSM","UNJBG","UNSAC","UNIA","ULima","UP","USMP","UPCH","UPN","UCV","USIL","UCSUR","URP","UNIFE","UARM","UTEC","ESAN","UDEP","USAT","UCSM","UPAO","UAP","UCAL","UAUT","UPeU","UCSS","UWIENER","UCH","UPSJB","USS","UDH","UCP","UPLA","UCT"]
  .filter((x,i,a)=>a.indexOf(x)===i)
  .sort((a,b)=>a.localeCompare(b,"es"));
const CA=[...C,"Administración de Empresas","Administración de Negocios Internacionales","Agronomía","Antropología","Arqueología","Arquitectura","Artes Escénicas","Biología","Ciencias de la Comunicación","Ciencias del Deporte","Ciencia de la Computación","Ciencia de Datos","Comunicaciones","Comunicación Audiovisual","Contabilidad","Contabilidad y Finanzas","Derecho","Diseño Gráfico","Diseño de Interiores","Diseño Industrial","Economía","Educación","Educación Inicial","Educación Primaria","Enfermería","Estadística","Farmacia y Bioquímica","Filosofía","Física","Gastronomía","Geografía","Gestión Pública","Historia","Hotelería y Turismo","Ingeniería Agroindustrial","Ingeniería Ambiental","Ingeniería Civil","Ingeniería de Minas","Ingeniería de Software","Ingeniería de Telecomunicaciones","Ingeniería Eléctrica","Ingeniería Electrónica","Ingeniería Industrial","Ingeniería Informática","Ingeniería Mecánica","Ingeniería Mecatrónica","Ingeniería Pesquera","Ingeniería Química","Lingüística","Literatura","Marketing","Matemática","Medicina Humana","Medicina Veterinaria","Música","Nutrición","Obstetricia","Odontología","Periodismo","Publicidad","Química","Relaciones Internacionales","Sociología","Tecnología Médica","Terapia Física","Trabajo Social","Traducción e Interpretación","Turismo"].filter((x,i,a)=>a.indexOf(x)===i).sort((a,b)=>a.localeCompare(b,"es"));
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
  {n:"Victor Fabio Salazar",s:"HCI y diseño",u:U[0],r:4.8,p:12},
  {n:"Jaime Paul Gomez",s:"Cálculo",u:U[1],r:4.6,p:12},
  {n:"Gabriel Alfonso Regalado",s:"Finanzas",u:U[2],r:4.9,p:15},
  {n:"Maria Pilar Anticona",s:"Psicología",u:U[3],r:4.5,p:10}
];
cursos.forEach((c,i)=>c.i=["tecnologia.jpg","matematica.png","apoyo.jpg","negocios.jpg"][i]);
recs.forEach((c,i)=>c.i=["ciencias-exactas.jpg","matematica.png","tecnologia.jpg","negocios.jpg"][i]);
ments.forEach((m,i)=>m.i="alumno"+(i+1)+".jpg");

// Más cursos. Cada fila: nombre, carrera, dificultad (0 Básico, 1 Intermedio, 2 Avanzado) e imagen.
// Para poner la imagen: guarda el archivo en la carpeta imagenes/ y escribe su nombre en el último campo (por ejemplo "algebra.jpg").
const MAS=[
  ["Álgebra Lineal","Matemática",1,"algebralineal.webp"],
  ["Anatomía","Medicina Humana",1,"anatomia2.webp"],
  ["Algoritmos y Estructuras de Datos","Ingeniería de Sistemas",2,"estructuradatos.webp"],
  ["Auditoría","Contabilidad",2,"auditoria.jpg"],
  ["Base de Datos","Ingeniería de Sistemas",1,"basededatos2.png"],
  ["Bioquímica","Farmacia y Bioquímica",2,"bioquimica.jpg"],
  ["Cálculo II","Ingeniería de Sistemas",1,"calculo2.jpg"],
  ["Cálculo III","Ingeniería Civil",2,"calculoiii.jpg"],
  ["Ciencia de Datos","Ciencia de Datos",2,"cienciadatos.jpg"],
  ["Comunicación y Redacción","Ciencias de la Comunicación",0,"comunicacion.jpg"],
  ["Contabilidad","Contabilidad",0,"contabilidad.jpg"],
  ["Contabilidad de Costos","Contabilidad",1,"contabilidadcostos.jpg"],
  ["Derecho Civil","Derecho",1,"derechocivil.jpg"],
  ["Derecho Constitucional","Derecho",1,"derechocons.jpg"],
  ["Derecho Penal","Derecho",2,"derechopenal.jpg"],
  ["Dibujo Técnico","Ingeniería Civil",0,"dibujotecnico.jpg"],
  ["Ecuaciones Diferenciales","Ingeniería Mecánica",2,"ecuacionesdiferenciales.jpg"],
  ["Economía","Economía",0,"economia.jpg"],
  ["Estadística","Estadística",0,"estadistica.jpg"],
  ["Estadística Inferencial","Estadística",2,"estadisticainferencial.jpg"],
  ["Estática y Dinámica","Ingeniería Civil",1,"estatica.jpg"],
  ["Física I","Física",0,"fisica.jpg"],
  ["Física II","Física",1,"fisica2.jpg"],
  ["Fisiología","Medicina Humana",2,"fisiologia.webp"],
  ["Gestión de Proyectos","Ingeniería Industrial",1,"gestiondeproyectos.jpg"],
  ["Inglés","Traducción e Interpretación",0,"ingles.jpg"],
  ["Investigación de Operaciones","Ingeniería Industrial",2,"operaciones.jpg"],
  ["Macroeconomía","Economía",1,"macroeconomia.jpg"],
  ["Marketing","Marketing",0,"marketing.jpg"],
  ["Matemática Básica","Matemática",0,"matematicabas.png"],
  ["Matemática Discreta","Ciencia de la Computación",1,"matematicadiscreta.jpg"],
  ["Metodología de la Investigación","Educación",0,"metodologia.jpg"],
  ["Microeconomía","Economía",1,"microeconomia.jpg"],
  ["Pensamiento Lógico","Matemática",0,"pensamiento.jpg"],
  ["Probabilidades","Estadística",1,"probabilidades.jpg"],
  ["Programación","Ingeniería de Software",0,"programacion.jpg"],
  ["Programación Orientada a Objetos","Ingeniería de Software",1,"programacionorientada.jpg"],
  ["Psicología Social","Psicología",1,"psicologiasocial.jpg"],
  ["Química General","Química",0,"quimica.jpg"],
  ["Química Orgánica","Química",2,"organica.jpg"],
  ["Redes de Computadoras","Ingeniería de Telecomunicaciones",1,"redes.jpg"],
  ["Resistencia de Materiales","Ingeniería Civil",2,"resistencia.jpg"],
  ["Sistemas Operativos","Ingeniería Informática",1,"sistemas.jpg"],
  ["Termodinámica","Ingeniería Química",2,"termodinamica.jpg"]
];
MAS.forEach(([n,c,d,i])=>cursos.push({n,c,d:D[d],t:"Refuerza "+n+" con explicaciones claras, ejercicios resueltos y el apoyo de mentores de ciclos superiores.",w:["8 semanas","10 semanas","12 semanas"][d],m:n,pm:[15,19,25][d],k:["Conceptos fundamentales","Ejercicios resueltos paso a paso","Casos prácticos","Repaso para evaluaciones"],i}));

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
const user=()=>{
    try{
      return JSON.parse(sessionStorage.getItem("user"))
    }catch{
      return null
    }
  },
  gate=()=>user()||(document.querySelectorAll("dialog[open]").forEach(d=>d.close()),say("Inicia sesión para usar esta función."),location.hash="#cuenta",false);
const ok=s=>/^\S+@\S+\.\S+$/.test(s);
// Datos propios de cada usuario (se guardan con su correo): cursos guardados, historial, certificaciones y plan
const key=k=>k+":"+user().m,
  mine=(k,d)=>user()?L(key(k),d):d,
  save=(k,v)=>S(key(k),v),
  updBook=(id,fn)=>Object.keys(localStorage).filter(k=>k.startsWith("books:")).forEach(k=>{
    const bs=L(k,[]),
      x=bs.find(y=>y.id==id);
    if(x){
      fn(x);
      S(k,bs)
    }
  }),
  allBooks=()=>Object.keys(localStorage).filter(k=>k.startsWith("books:")).flatMap(k=>L(k,[]));
// ===== 4. INICIO: llenar los selectores =====
[
  ["#ru",UR,"Selecciona tu universidad"],
  ["#rc",CA,"Selecciona tu carrera"],
  ["#ry",Y,"Selecciona tu ciclo"],
  ["#cc",[...new Set(cursos.map(c=>c.c))].sort((a,b)=>a.localeCompare(b,"es")),"Todas"],
  ["#cd",D,"Todas"],
  ["#rd",D,"Todas"]
].forEach(a=>fill(...a));

// ===== 5. CUENTA: sesión, registro, login y recuperar contraseña =====
function session(){
  const u=user(),
    b=$("#ses");
  b.textContent=u?"Salir ("+u.n.split(" ")[0]+")":"Iniciar sesión";
  b.onclick=u?ev=>{
    ev.preventDefault();
    sessionStorage.removeItem("user");
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
  sessionStorage.setItem("user",JSON.stringify(u));
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
  sessionStorage.setItem("user",JSON.stringify(u));
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
  loadMentors();
  const sv=mine("saved",[]),
    q=$("#cq").value.toLowerCase(),
    c=$("#cc").value,
    d=$("#cd").value;
  const r=cursos.filter(x=>x.n.toLowerCase().includes(q)&&(!c||x.c===c)&&(!d||x.d===d));
  $("#cn").textContent=r.length?r.length+" cursos encontrados.":"No hay cursos con esos filtros. Prueba quitar alguno.";
  const sl=$("#cl").scrollLeft;
  $("#cl").innerHTML=r.map(x=>`<article class="card">${x.i?`<img src="imagenes/${x.i}" alt="Imagen del curso ${e(x.n)}">`:`<div class="cph" role="img" aria-label="Imagen del curso ${e(x.n)} (próximamente)"><span>Imagen próximamente</span></div>`}<h3>${e(x.n)}</h3><div class="tags"><span class="tag">${e(x.c)}</span><span class="tag">${x.d}</span></div><button type="button" class="vlink" data-course="${e(x.n)}">Ver información del curso</button><button class="btn alt" data-save="${e(x.n)}" aria-pressed="${sv.includes(x.n)}">${sv.includes(x.n)?"Guardado":"Guardar curso"}</button></article>`).join("");
  $("#cl").scrollLeft=sl;
  carUpdate();
  const q2=$("#rq").value.toLowerCase(),
    d2=$("#rd").value,
    r2=recs.filter(x=>x.n.toLowerCase().includes(q2)&&(!d2||x.d===d2));
  $("#rn2").textContent=r2.length?r2.length+" recursos encontrados.":"No hay recursos con esos filtros.";
  $("#rl").innerHTML=r2.map(x=>`<article class="card" data-res="${e(x.n)}"><img src="imagenes/${x.i}" alt="Imagen del recurso ${e(x.n)}"><h3>${e(x.n)}</h3><div class="tags"><span class="tag">${x.d}</span></div><div class="ract"><button type="button" class="btn" data-res="${e(x.n)}">Ver recurso</button><button type="button" class="btn alt" data-rep="${e(x.n)}">Reportar recurso</button></div></article>`).join("");
  const q3=$("#mq").value.toLowerCase(),
    r3=ments.filter(m=>(m.n+m.s).toLowerCase().includes(q3));
  $("#mn").textContent=r3.length?r3.length+" mentores disponibles.":"No encontramos mentores con esa búsqueda.";
  const slm=$("#ml").scrollLeft;
  $("#ml").innerHTML=r3.map(m=>`<article class="card"><img src="${pic(m)}" alt="Foto de ${e(m.n)}, mentor de ${e(m.s)}"><h3>${e(m.n)}</h3><div class="tags"><span class="tag">${e(m.u)}</span><span class="tag">${m.nw?"Nuevo":"★ "+m.r}</span></div><p>Disponibilidad: <span class="tag">Lun a Sáb</span><span class="tag">07:00 a 21:00</span></p><button type="button" class="vlink" data-prof="${e(m.n)}">Ver perfil del mentor</button>${mi(m)?`<p class="note">Este es tu perfil de mentor.</p>`:`<button class="btn" data-pick="${e(m.n)}">Elegir mentor</button>`}</article>`).join("");
  $("#ml").scrollLeft=slm;
  carUpdateM();
  const cur=$("#bm").value;
  fill("#bm",ments.filter(m=>!mi(m)).map(m=>m.n));
  if(ments.some(m=>m.n===cur))$("#bm").value=cur;
  renderSched();
  panel();
  plan();
  mentorUI()
}
$("#bm").onchange=()=>{
  bsel.h=null;
  renderSched()
};
["#cq","#cc","#cd","#rq","#rd","#mq"].forEach(i=>$(i).oninput=draw);

// ===== 6b. PERFIL DEL MENTOR (ventana emergente) =====
function openProfile(n){
  const m=ments.find(x=>x.n===n);
  $("#mpi").src=pic(m);
  $("#mpi").alt="Foto de "+m.n;
  $("#mpt").textContent=m.n;
  $("#mpb").innerHTML=`<p class="mp-price"><b>S/ ${m.p}</b> por mentoría</p><p><span class="tag">${e(m.u)}</span><span class="tag">${m.nw?"Nuevo":"★ "+m.r}</span></p><p>Especialista en ${e(m.s)}.</p><p>Disponible: lunes a sábado, de 7:00 a 21:00.</p>`;
  $("#mpe").dataset.pick=m.n;
  $("#mpe").hidden=mi(m);
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
  $("#cpi").hidden=!c.i;
  if(c.i){
    $("#cpi").src="imagenes/"+c.i;
    $("#cpi").alt="Imagen del curso "+c.n
  }
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

// ===== 6e. HORARIOS Y MENTORES (agenda tipo calendario, lunes a sábado de 7:00 a 21:00) =====
const HRS=Array.from({length:14},(_,i)=>i+7);
const WD=["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];
const TXT={ok:"Disponible",sel:"Seleccionado",res:"Reservado",off:"No disponible"};
const iso=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const fh=h=>String(h).padStart(2,"0")+":00";
const nextDays=()=>{
  const r=[],
    d=new Date();
  while(r.length<6){
    if(d.getDay()!==0)r.push(new Date(d));
    d.setDate(d.getDate()+1)
  }
  return r
};
const reservedFor=n=>new Set(allBooks().filter(b=>b.m===n&&b.dt&&b.ok!==false).map(b=>b.dt+"-"+b.hr));
function slotState(m,d,h,R){
  const t=new Date(),
    k=iso(d)+"-"+h;
  if(R.has(k))return"res";
  if(iso(d)===iso(t)&&h<=t.getHours())return"off";
  const o=(m.ov||{})[k];
  if(o!==undefined)return o?"ok":"off";
  return(m.off||[]).includes(d.getDay()+"-"+h)?"off":"ok"
}
const dayBtn=(label,txt,on,attr,i)=>`<button type="button" class="day${on?" on":""}" data-${attr}="${i}" aria-pressed="${on}"><span>${label}</span><b>${txt}</b></button>`;
const slotCard=(h,s,tag,attr)=>`<${tag} class="slot ${s}"${attr}><b>${fh(h)}</b><span>${TXT[s]}</span></${tag}>`;
let bsel={i:0,h:null},
  msel=1,
  psel=0;
const moff=new Set();
// Agenda del estudiante: elige día y hora del mentor
function renderSched(){
  const m=ments.find(x=>x.n===$("#bm").value)||ments[0],
    days=nextDays(),
    R=reservedFor(m.n);
  if(bsel.i>=days.length)bsel.i=0;
  const d=days[bsel.i];
  if(bsel.h!==null&&slotState(m,d,bsel.h,R)!=="ok")bsel.h=null;
  $("#bwd").innerHTML=days.map((x,i)=>dayBtn(WD[x.getDay()],x.getDate(),i===bsel.i,"day",i)).join("");
  $("#bwh").innerHTML=HRS.map(h=>{
    const s=slotState(m,d,h,R),
      v=bsel.h===h?"sel":s;
    return slotCard(h,v,"button",` type="button" data-slot="${h}" aria-pressed="${v==="sel"}"${s==="ok"?"":" disabled"}`)
  }).join("");
  $("#bws").textContent=bsel.h===null?"Elige un día y una hora disponible.":"Horario elegido: "+WD[d.getDay()]+" "+d.getDate()+" · "+fh(bsel.h)
}
// Agenda semanal del formulario de mentor: todo empieza disponible
function renderMW(){
  $("#mwd").innerHTML=[1,2,3,4,5,6].map(w=>dayBtn(WD[w],HRS.filter(h=>!moff.has(w+"-"+h)).length+" h",w===msel,"mday",w)).join("");
  $("#mwh").innerHTML=HRS.map(h=>{
    const off=moff.has(msel+"-"+h);
    return slotCard(h,off?"off":"ok","button",` type="button" data-mslot="${h}" aria-pressed="${!off}"`)
  }).join("")
}
const mi=m=>!!(m.dyn&&user()&&m.n===user().n);
const pic=m=>m.i.startsWith("data:")?m.i:"imagenes/"+m.i;
const avatar=n=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#e6e6e6"/><text x="100" y="125" font-size="80" font-family="Arial" font-weight="700" text-anchor="middle" fill="#1a1a1a">${n.split(" ").slice(0,2).map(w=>w[0]).join("").replace(/[^\p{L}]/gu,"").toUpperCase()}</text></svg>`);
// Cursos o áreas que se pueden dictar como mentor (incluye las de los cursos que existen hoy)
const MA=[...cursos.map(c=>c.m),"Álgebra Lineal","Anatomía","Algoritmos y Estructuras de Datos","Auditoría","Base de Datos","Bioquímica","Cálculo II","Cálculo III","Ciencia de Datos","Comunicación y Redacción","Contabilidad","Contabilidad de Costos","Derecho Civil","Derecho Constitucional","Derecho Penal","Dibujo Técnico","Ecuaciones Diferenciales","Economía","Estadística","Estadística Inferencial","Estática y Dinámica","Física I","Física II","Fisiología","Gestión de Proyectos","Inglés","Investigación de Operaciones","Macroeconomía","Marketing","Matemática Básica","Matemática Discreta","Metodología de la Investigación","Microeconomía","Pensamiento Lógico","Probabilidades","Programación","Programación Orientada a Objetos","Psicología Social","Química General","Química Orgánica","Redes de Computadoras","Resistencia de Materiales","Sistemas Operativos","Termodinámica"].filter((x,i,a)=>a.indexOf(x)===i).sort((a,b)=>a.localeCompare(b,"es"));
fill("#ms",MA);
// Asignaturas del foro: los cursos de la plataforma + las mismas áreas que dictan los mentores
fill("#fa",[...cursos.map(c=>c.n),...MA].filter((x,i,a)=>a.indexOf(x)===i).sort((a,b)=>a.localeCompare(b,"es")));
function loadMentors(){
  for(let i=ments.length-1;i>=0;i--)if(ments[i].dyn)ments.splice(i,1);
  Object.keys(localStorage).filter(k=>k.startsWith("mentor:")).forEach(k=>{
    const p=L(k,null);
    if(p)ments.push({n:p.n,s:p.s,u:p.u,r:4,off:p.off||[],ov:p.ov||{},p:p.p,i:avatar(p.n),nw:1,dyn:1})
  })
}
function mentorHist(me){
  const rs=allBooks().filter(b=>b.m===me.n&&b.ok!==false);
  return rs.length?rs.map(b=>`<div class="bk"><strong>${e(b.s||"Estudiante")}</strong> · ${e(b.h)}<br>Tema: ${e(b.t)}<br>Estado: ${b.done?"Completada por el estudiante":"Aceptada (esperando que el estudiante la marque como completada)"}${b.done?(b.mn!==undefined?`<br>Tu nota: ${b.mn}/20<br>Tus observaciones: ${e(b.mo)}`:`<form class="gf" data-id="${b.id}" novalidate><label>Nota del estudiante (0 a 20)<input type="number" min="0" max="20" step="1" inputmode="numeric"></label><label>Observaciones<textarea rows="2"></textarea></label><button class="btn">Guardar nota y observaciones</button></form>`):""}</div>`).join(""):"<p>Aún no aceptas tutorías.</p>"
}
function mentorUI(){
  const u=user(),
    me=mine("mentor",null),
    msg=$("#sm-msg");
  $("#mf").hidden=true;
  $("#mpan").hidden=!me;
  if(!u)msg.textContent="Inicia sesión con tu cuenta de estudiante para postular. Solo pueden ser mentores los estudiantes de ciclo 7, 8, 9 y 10.";
  else if(me)msg.textContent="Ya eres mentor: apareces en la sección Mentores y ves tus tutorías en Mi panel.";
  else if(Number(u.y)<7)msg.textContent="Solo pueden ser mentores los estudiantes de ciclo 7 a 10. Tu ciclo actual es "+u.y+".";
  else{
    msg.textContent="Cumples el requisito (ciclo "+u.y+"). Completa el formulario para ser mentor.";
    $("#mf").hidden=false
  }
  if(me)mentorPanel(me)
}
function mentorPanel(me){
  const m=ments.find(x=>x.n===me.n),
    days=nextDays(),
    R=reservedFor(me.n),
    rs=allBooks().filter(b=>b.m===me.n),
    dn=rs.filter(b=>b.done).length;
  if(psel>=days.length)psel=0;
  const t=new Date(),
    cards=HRS.map(h=>{
      const s=slotState(m,days[psel],h,R),
        lock=s==="res"||(iso(days[psel])===iso(t)&&h<=t.getHours());
      return slotCard(h,s,"button",` type="button" data-pslot="${h}"${lock?" disabled":""}`)
    }).join("");
  $("#mpanb").innerHTML=`<p><strong>${e(me.s)}</strong> · S/ ${me.p} por sesión</p><h4>Mi agenda</h4><div class="days">${days.map((x,i)=>dayBtn(WD[x.getDay()],x.getDate(),i===psel,"pday",i)).join("")}</div><p class="note">Toca un horario para cambiarlo entre disponible y no disponible. Los horarios reservados no se pueden cambiar.</p><div class="slots">${cards}</div><h4>Tutorías solicitadas por estudiantes (${rs.length})</h4>`+(rs.length?rs.map(b=>`<div class="bk"><strong>${e(b.s||"Estudiante")}</strong> · ${e(b.h)}<br>Tema: ${e(b.t)}<br>Estado: ${b.done?"Completada":b.ok===false?"Pendiente":"Aceptada"}${b.ok===false?`<br><button type="button" class="btn" data-accept="${b.id}">Aceptar</button>`:""}</div>`).join(""):"<p>Aún no tienes solicitudes.</p>")+`<p>Horas dictadas: ${dn}</p><button type="button" class="btn" data-certm="1">Solicitar certificación de horas dictadas</button><button type="button" class="btn alt" data-unmentor="1">Dejar de ser mentor</button>`
}
$("#mf").onsubmit=ev=>{
  ev.preventDefault();
  if(!gate())return;
  const u=user(),
    p=Number($("#mpz").value);
  if(Number(u.y)<7)return err("#mferr","Solo pueden ser mentores los estudiantes de ciclo 7 a 10.");
  if(mine("mentor",null))return err("#mferr","Ya eres mentor.");
  if(moff.size>=6*HRS.length)return err("#mferr","Deja al menos un horario disponible.");
  if(!Number.isInteger(p)||p<5||p>20)return err("#mferr","El precio por sesión debe ser un número entero entre S/ 5 y S/ 20.");
  save("mentor",{n:u.n,u:u.u,s:$("#ms").value,off:[...moff],p});
  moff.clear();
  msel=1;
  renderMW();
  err("#mferr","");
  draw();
  say("¡Listo! Ya eres mentor. Apareces en la lista de mentores.")
};
renderMW();

// ===== 6f. CARRUSEL (flechas izquierda y derecha): cursos y mentores =====
function mkCar(list,prev,next){
  const el=$(list),
    up=()=>{
      const max=el.scrollWidth-el.clientWidth;
      $(prev).hidden=$(next).hidden=max<=2;
      $(prev).disabled=el.scrollLeft<=2;
      $(next).disabled=el.scrollLeft>=max-2
    },
    go=dir=>el.scrollBy({left:dir*el.clientWidth*0.9,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
  $(prev).onclick=()=>go(-1);
  $(next).onclick=()=>go(1);
  el.addEventListener("scroll",up);
  window.addEventListener("resize",up);
  return up
}
const carUpdate=mkCar("#cl","#cprev","#cnext"),
  carUpdateM=mkCar("#ml","#mprev","#mnext");

// ===== 7. BOTONES: guardar, reportar, elegir mentor, planes, completar tutoría =====
document.addEventListener("click",ev=>{
  const card=ev.target.closest(".card[data-res]");
  if(card&&!ev.target.closest("button"))openResource(card.dataset.res);
  const b=ev.target.closest("button");
  if(!b)return;
  if(b.dataset.day){
    bsel.i=Number(b.dataset.day);
    bsel.h=null;
    renderSched()
  }
  if(b.dataset.slot){
    bsel.h=Number(b.dataset.slot);
    renderSched()
  }
  if(b.dataset.mday){
    msel=Number(b.dataset.mday);
    renderMW()
  }
  if(b.dataset.mslot){
    const k=msel+"-"+b.dataset.mslot;
    moff.has(k)?moff.delete(k):moff.add(k);
    renderMW()
  }
  if(b.dataset.pslot){
    const me=mine("mentor",null),
      d=nextDays()[psel],
      h=Number(b.dataset.pslot),
      R=reservedFor(me.n);
    if(R.has(iso(d)+"-"+h))return say("Ese horario ya está reservado y no se puede cambiar.");
    const s=slotState(ments.find(x=>x.n===me.n),d,h,R);
    me.ov={...(me.ov||{}),[iso(d)+"-"+h]:s==="off"};
    save("mentor",me);
    draw();
    say(s==="off"?"Horario marcado como disponible.":"Horario marcado como no disponible.")
  }
  if(b.dataset.pday){
    psel=Number(b.dataset.pday);
    mentorUI()
  }
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
    bsel.h=null;
    renderSched();
    $("#bk").scrollIntoView();
    $("#bt").focus()
  }
  if(b.dataset.accept){
    const tgt=allBooks().find(y=>y.id==b.dataset.accept);
    if(tgt&&tgt.dt){
      const R=reservedFor(tgt.m),
        s=slotState(ments.find(x=>x.n===tgt.m),new Date(tgt.dt+"T00:00:00"),tgt.hr,R);
      if(s==="res")return say("Ese horario ya fue reservado por otra tutoría. No se puede aceptar.");
      if(s==="off")return say("Ese horario ya no está disponible. Vuelve a marcarlo como disponible para aceptar.")
    }
    Object.keys(localStorage).filter(k=>k.startsWith("books:")).forEach(k=>{
      const bs=L(k,[]),
        x=bs.find(y=>y.id==b.dataset.accept);
      if(x){
        x.ok=true;
        S(k,bs)
      }
    });
    draw();
    say("Aceptaste la tutoría.")
  }
  if(b.dataset.certm){
    const me=mine("mentor",null),
      h=allBooks().filter(x=>x.m===me.n&&x.done).length;
    if(!h)return say("Aún no tienes tutorías completadas para certificar.");
    const c=mine("mcerts",[]);
    c.push({h,f:Date.now()});
    save("mcerts",c);
    say("Solicitud enviada: certificación de "+h+" hora(s) dictadas como mentor.")
  }
  if(b.dataset.unmentor){
    localStorage.removeItem(key("mentor"));
    draw();
    say("Dejaste de ser mentor.")
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
  const t=$("#bt").value.trim(),
    m=ments.find(x=>x.n===$("#bm").value),
    d=nextDays()[bsel.i];
  if(t.length<10)return err("#berr","Cuéntanos con más detalle tu dificultad (mínimo 10 caracteres).");
  if(bsel.h===null)return err("#berr","Elige un día y un horario disponible.");
  if(m.n===user().n)return err("#berr","No puedes agendar una tutoría contigo mismo.");
  if(slotState(m,d,bsel.h,reservedFor(m.n))!=="ok")return err("#berr","Ese horario ya no está disponible. Elige otro.");
  const bs=mine("books",[]);
  if(bs.some(x=>x.m===m.n&&x.dt===iso(d)&&x.hr===bsel.h))return err("#berr","Ya agendaste ese horario.");
  const label=WD[d.getDay()]+" "+d.getDate()+" · "+fh(bsel.h);
  bs.push({id:Date.now(),s:user().n,ok:!m.dyn,m:m.n,h:label,dt:iso(d),hr:bsel.h,t,rem:$("#br").checked});
  save("books",bs);
  err("#berr","");
  $("#bt").value="";
  bsel.h=null;
  draw();
  say("Tutoría agendada con "+m.n+" ("+label+")."+($("#br").checked?" Te enviaremos un recordatorio.":""))
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
  const me=mine("mentor",null),
    typing=$("#hs").contains(document.activeElement)&&["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName),
    stu=!on?"<p>Inicia sesión para ver tu historial de mentorías.</p>":bs.length?bs.map(b=>`<div class="bk"><strong>${e(b.m)}</strong> · ${e(b.h)}<br>Tema: ${e(b.t)}<br>Estado: ${b.done?"Completada":b.ok===false?"Pendiente de aceptación":"Aceptada por el mentor"}<br>${b.rem?"Recordatorio activo. ":""}${b.done?(b.rate?`Tu calificación al mentor: ${b.rate}/5`:`<form class="pf" data-id="${b.id}" novalidate><label>Calificar mentor<select><option value="">Elige</option>${[5,4,3,2,1].map(n=>`<option>${n}</option>`)}</select></label><button class="btn">Guardar calificación</button></form>`)+(b.mn!==undefined?`<br>Nota del mentor: ${b.mn}/20<br>Observaciones: ${e(b.mo)}`:"<br>El mentor aún no registra tu nota."):(b.ok===false?"Esperando que el mentor acepte la tutoría.":`<button class="btn alt" data-done="${b.id}">Marcar como completada</button>`)}</div>`).join(""):"<p>Aún no tienes tutorías. Agenda la primera en la sección Mentores.</p>";
  if(!typing)$("#hs").innerHTML=me?`<h4>Como estudiante</h4>${stu}<h4>Como mentor</h4>${mentorHist(me)}`:stu;
  const sc=ments.filter(m=>!m.nw||rt.some(b=>b.m===m.n)).map(m=>{
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
    return`<li class="rk${i<3?" top"+(i+1):""}"><span class="pos"><span class="sr">Puesto </span>${i+1}</span><img src="${pic(m)}" alt="Foto de ${e(m.n)}"><div class="inf"><strong>${e(m.n)}</strong>${mv}<span class="tag">${e(m.u)}</span><div class="meter" aria-hidden="true"><i data-w="${(s.v/5*100).toFixed(0)}"></i></div></div><div class="sc"><b>${s.v.toFixed(2)}</b><span aria-hidden="true">${"★".repeat(Math.round(s.v))}</span><span class="sr"> de 5 puntos${n?", "+n+" calificación(es) de estudiantes":""}</span></div></li>`
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
  const f=ev.target;
  if(f.classList.contains("gf")){
    const me=mine("mentor",null),
      nota=f.querySelector("input").value.trim(),
      obs=f.querySelector("textarea").value.trim(),
      n=Number(nota),
      bk=allBooks().find(x=>x.id==f.dataset.id);
    if(!me||!bk||bk.m!==me.n||!bk.done)return say("Solo puedes calificar tutorías completadas que dictaste.");
    if(nota===""||!Number.isInteger(n)||n<0||n>20||!obs)return say("Escribe una nota entera de 0 a 20 y tus observaciones.");
    updBook(bk.id,x=>{
      x.mn=n;
      x.mo=obs
    });
    draw();
    say("Nota y observaciones guardadas.");
    return
  }
  const r=f.querySelector("select").value;
  if(!r)return say("Elige una calificación para el mentor.");
  const bs=mine("books",[]),
    b=bs.find(x=>x.id==f.dataset.id);
  b.rate=r;
  save("books",bs);
  panel();
  say("Calificación guardada.")
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
// Tiempo real: si otra pestaña cambia los datos (agenda, reservas...), esta se actualiza sola
window.addEventListener("storage",ev=>{
  if(ev.storageArea===localStorage){
    draw();
    foro()
  }
});
session();
draw();
foro();
plan();
