const screens = [
{title:"Início",text:"A cliente chega ao app para simular o crédito.",html:`<div class="screen"><span class="eyebrow">EMPRÉSTIMOS</span><h1>Olá, Maria!</h1><p>Vamos encontrar uma opção que faça sentido para você.</p><div class="hero"><div style="font-size:32px">🛡️</div><h2>Empréstimo Consignado INSS</h2><p>Simule seu empréstimo e conheça as opções de proteção.</p></div><button class="btn primary" onclick="go(1)">Simular empréstimo</button></div>`},
{title:"Simulação",text:"Aqui o cliente já está tomando a decisão financeira.",html:`<div class="screen"><span class="eyebrow">SIMULAÇÃO</span><h1>Seu empréstimo</h1><p>Valor do empréstimo</p><div class="amount" id="amt">R$ 15.000</div><input id="amount" class="slider" type="range" min="5000" max="30000" step="1000" value="15000"><p>Prazo: <b id="months">36 meses</b></p><input id="term" class="slider" type="range" min="12" max="84" step="12" value="36"><div class="installment"><span>Parcela estimada</span><b id="installment">R$ 620</b></div><div class="protection"><b>🛡️ Proteja seu empréstimo</b><p>Conheça uma proteção para situações inesperadas.</p><button onclick="go(2)">Conhecer proteção →</button></div><button class="btn primary" onclick="go(2)">Continuar</button></div>`},
{title:"Conhecendo o seguro",text:"A oferta é contextualizada e explicada antes da decisão.",html:`<div class="screen"><span class="eyebrow">PROTEÇÃO</span><h1>Mais tranquilidade para você e sua família</h1><p>Entenda a proteção antes de decidir.</p><div class="coverage"><div class="ico">♥</div><div><b>Falecimento</b><p>Em evento coberto, pode ajudar na quitação da dívida, conforme a apólice.</p></div></div><div class="coverage"><div class="ico">♿</div><div><b>Invalidez Permanente Total por Acidente</b><p>Em evento coberto, pode ajudar na proteção do empréstimo, conforme a apólice.</p></div></div><div class="info"><b>Importante</b><p>O seguro é opcional. O cliente pode continuar sem contratar.</p></div><button class="btn primary" onclick="go(3)">Quero contratar</button><button class="btn secondary" onclick="go(5)">Continuar sem contratar</button></div>`},
{title:"Confirmação",text:"Antes de contratar, o cliente vê exatamente o que está escolhendo.",html:`<div class="screen"><span class="eyebrow">RESUMO</span><h1>Confira antes de confirmar</h1><div class="summary"><div><span>Empréstimo</span><b id="sumAmt">R$ 15.000</b></div><div><span>Prazo</span><b id="sumTerm">36 meses</b></div><div><span>Proteção</span><b>Seguro do seu consignado</b></div><div><span>Valor ilustrativo</span><b>R$ 12,90/mês</b></div></div><div class="info"><p>Protótipo conceitual: valores e condições são ilustrativos.</p></div><button class="btn primary" onclick="go(4)">Confirmar contratação</button><button class="btn secondary" onclick="go(2)">Voltar</button></div>`},
{title:"Sem contratação",text:"O cliente pode recusar sem fricção — transparência faz parte do produto.",html:`<div class="screen"><div class="success">✓</div><h1>Empréstimo contratado!</h1><p>Você escolheu continuar sem a proteção.</p><div class="info"><b>Decisão registrada</b><p>O cliente deve ter clareza sobre a escolha e poder seguir sem contratar.</p></div><button class="btn primary" onclick="go(6)">Ver meu empréstimo</button></div>`},
{title:"Contratação",text:"Depois da contratação, a proteção fica fácil de encontrar.",html:`<div class="screen"><div class="success">✓</div><h1>Empréstimo contratado!</h1><p>Sua contratação foi concluída com sucesso.</p><div class="status"><span class="dot"></span><div><b>🛡️ Seu empréstimo está protegido</b><p>Consulte coberturas, condições e documentos.</p></div></div><button class="btn primary" onclick="go(6)">Ver meu empréstimo</button></div>`},
{title:"Acompanhamento",text:"O cliente encontra a proteção depois, sem precisar procurar.",html:`<div class="screen"><span class="eyebrow">MEU EMPRÉSTIMO</span><h1>Acompanhe sua proteção</h1><div class="loan"><span>Empréstimo Consignado INSS</span><strong id="finalAmt">R$ 15.000</strong><small id="finalTerm">36 parcelas</small></div><div class="status"><span class="dot"></span><div><b>Proteção ativa</b><p>Veja coberturas e condições do seguro.</p></div></div><button class="btn secondary" onclick="go(0)">Refazer simulação</button></div>`}
];
let current=0;
const content=document.getElementById("phoneContent"), title=document.getElementById("journeyTitle"), text=document.getElementById("journeyText"), label=document.getElementById("stepLabel"), dots=document.getElementById("dots");
function render(){
  content.innerHTML=screens[current].html; title.textContent=screens[current].title; text.textContent=screens[current].text; label.textContent=`${current+1} de 7`;
  dots.innerHTML=screens.map((_,i)=>`<i class="${i===current?'active':''}"></i>`).join("");
  bind();
}
function brl(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function bind(){
  const a=document.getElementById("amount"), t=document.getElementById("term");
  if(a&&t){
    const update=()=>{const av=+a.value,tv=+t.value; document.getElementById("amt").textContent=brl(av); document.getElementById("months").textContent=tv+" meses"; document.getElementById("installment").textContent=brl(av/tv*1.35); document.getElementById("sumAmt").textContent=brl(av); document.getElementById("sumTerm").textContent=tv+" meses"; document.getElementById("finalAmt").textContent=brl(av); document.getElementById("finalTerm").textContent=tv+" parcelas"};
    a.addEventListener("input",update);t.addEventListener("input",update);update();
  }
}
function go(n){current=n;render()}
document.getElementById("back").onclick=()=>{if(current>0)go(current-1)};
render();

const client=document.getElementById("clientMode"), manager=document.getElementById("managerMode");
document.getElementById("modeBtn").onclick=()=>{
  const isClient=client.classList.contains("active");
  client.classList.toggle("active",!isClient); manager.classList.toggle("active",isClient);
  document.getElementById("modeBtn").textContent=isClient?"Modo cliente":"Modo gestor";
  window.scrollTo({top:0,behavior:"smooth"});
};