<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>VTM5 Ghoul Builder – Standalone (No Build)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    :root{--bg:#0b0c0f;--fg:#e6e6e6;--muted:#adb5bd;--card:#121318;--line:#252733}
    html,body{height:100%}
    body{font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--fg)}
    .card{background:var(--card);border:1px solid var(--line);border-radius:1rem}
    .btn{border:1px solid var(--line);padding:.5rem .75rem;border-radius:.75rem}
    .btn:disabled{opacity:.6;cursor:not-allowed}
    input,select,textarea{background:#0f1116;border:1px solid var(--line);border-radius:.5rem;padding:.5rem .6rem;width:100%;color:var(--fg)}
    label{font-size:.85rem;font-weight:600}
    .muted{color:var(--muted)}
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem}
    .section{padding:1rem}
    .tabs button[aria-selected="true"]{background:#1b1d26}
    .dotbox input{width:3.5rem;text-align:center}
  </style>
  <!-- pdf-lib for PDF export -->
  <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
</head>
<body>
  <main class="max-w-6xl mx-auto p-6 space-y-6">
    <header class="flex items-center justify-between">
      <h1 class="text-3xl font-extrabold">VTM5 Ghoul Builder (Standalone)</h1>
      <div class="flex gap-2">
        <button id="downloadPdf" class="btn">Download Fill‑able PDF</button>
      </div>
    </header>

    <!-- Tabs -->
    <nav class="tabs flex flex-wrap gap-2">
      <button class="btn" data-tab="basics" aria-selected="true">Basics</button>
      <button class="btn" data-tab="domitor">Domitor</button>
      <button class="btn" data-tab="attributes">Attributes</button>
      <button class="btn" data-tab="skills">Skills</button>
      <button class="btn" data-tab="advantages">Adv./Flaws</button>
      <button class="btn" data-tab="disciplines">Disciplines</button>
      <button class="btn" data-tab="summary">Summary</button>
      <button class="btn" data-tab="dice">Dice Roller</button>
    </nav>

    <!-- BASICS -->
    <section class="card section" data-panel="basics">
      <h2 class="text-xl font-semibold mb-3">Character Basics</h2>
      <div class="grid-2">
        <div>
          <label for="name">Name</label>
          <input id="name" placeholder="e.g., Harper Quinn"/>
        </div>
        <div>
          <label for="concept">Concept</label>
          <input id="concept" placeholder="e.g., ‘Union fixer with a secret’"/>
        </div>
      </div>
      <div class="mt-3">
        <label for="notes">Notes</label>
        <textarea id="notes" rows="3" placeholder="Ambition, Desire, Touchstones, Convictions, etc."></textarea>
      </div>
      <p class="muted text-sm mt-3">This standalone version is pure HTML + JavaScript. No React/build steps needed.</p>
    </section>

    <!-- DOMITOR -->
    <section class="card section hidden" data-panel="domitor">
      <h2 class="text-xl font-semibold mb-3">Domitor</h2>
      <div class="grid-2">
        <div>
          <label for="domitorName">Domitor Name</label>
          <input id="domitorName"/>
        </div>
        <div>
          <label for="domitorClan">Domitor Clan</label>
          <select id="domitorClan"></select>
        </div>
      </div>
      <div class="mt-4">
        <label>Domitor Disciplines (check all that apply)</label>
        <div id="domitorDisciplines" class="grid-3 mt-2"></div>
      </div>
      <div class="mt-3">
        <label for="domitorNotes">Domitor / Relationship Notes</label>
        <textarea id="domitorNotes" rows="3" placeholder="Blood Bond? Boons owed? Coterie ties?"></textarea>
      </div>
    </section>

    <!-- ATTRIBUTES -->
    <section class="card section hidden" data-panel="attributes">
      <h2 class="text-xl font-semibold mb-3">Attributes</h2>
      <div id="attrGrid" class="grid-3"></div>
      <div class="mt-4 p-4 rounded-lg" style="background:#0f1116;border:1px solid var(--line)">
        <div class="font-semibold mb-2">Checklist (V5 Players Guide)</div>
        <ul class="list-disc pl-6 text-sm space-y-1">
          <li>Best Attribute at 4 (you have: <b id="chkAt4">0</b>)</li>
          <li>Three Attributes at 3 (you have: <b id="chkAt3">0</b>)</li>
          <li>Worst Attribute at 1 (you have: <b id="chkAt1">0</b>)</li>
          <li>All remaining at 2 (auto)</li>
          <li class="mt-2">Derived: Health = Stamina + 3 → <b id="health">—</b></li>
          <li>Derived: Willpower = Resolve + Composure → <b id="willpower">—</b></li>
        </ul>
      </div>
    </section>

    <!-- SKILLS -->
    <section class="card section hidden" data-panel="skills">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">Skills</h2>
        <div class="flex items-center gap-2">
          <label for="preset" class="muted text-sm">Preset</label>
          <select id="preset" class="w-48"></select>
          <button id="applyPreset" class="btn">Apply</button>
        </div>
      </div>
      <div class="grid-2 mt-4">
        <div id="skillColA" class="space-y-2"></div>
        <div id="skillColB" class="space-y-2"></div>
      </div>
      <div class="grid-2 mt-4">
        <div>
          <label>Free Specialties (Academics, Craft, Performance, Science) + 1 extra</label>
          <div class="grid-2 mt-2" id="freeSpecs"></div>
        </div>
        <div class="p-3 rounded-lg" style="background:#0f1116;border:1px solid var(--line)">
          <div class="font-semibold mb-2">Preset Summary</div>
          <div class="text-sm">Lv4: <b id="sum4">0</b> &nbsp; Lv3: <b id="sum3">0</b> &nbsp; Lv2: <b id="sum2">0</b> &nbsp; Lv1: <b id="sum1">0</b></div>
        </div>
      </div>
    </section>

    <!-- ADVANTAGES / FLAWS -->
    <section class="card section hidden" data-panel="advantages">
      <h2 class="text-xl font-semibold mb-3">Advantages & Flaws</h2>
      <div class="grid-2">
        <div>
          <label>Advantages (target 7 dots)</label>
          <div class="mt-2 flex gap-2">
            <input id="advName" placeholder="e.g., Status / Resources / Retainer"/>
            <input id="advDots" type="number" min="1" max="5" value="1" class="w-24"/>
            <button id="addAdv" class="btn">Add</button>
          </div>
          <div id="advList" class="mt-3 space-y-2"></div>
          <div class="text-sm mt-2">Total dots: <b id="advTotal">0</b></div>
        </div>
        <div>
          <label>Flaws (target 2 dots)</label>
          <div class="mt-2 flex gap-2">
            <input id="flawName" placeholder="e.g., Baneful Blood / Crone's Curse"/>
            <input id="flawDots" type="number" min="1" max="5" value="1" class="w-24"/>
            <button id="addFlaw" class="btn">Add</button>
          </div>
          <div id="flawList" class="mt-3 space-y-2"></div>
          <div class="text-sm mt-2">Total dots: <b id="flawTotal">0</b></div>
        </div>
      </div>
    </section>

    <!-- DISCIPLINES -->
    <section class="card section hidden" data-panel="disciplines">
      <h2 class="text-xl font-semibold mb-3">Disciplines (Ghoul Rules)</h2>
      <div class="grid-2">
        <div>
          <label for="chosenDiscipline">Choose a Discipline your domitor has</label>
          <select id="chosenDiscipline"></select>
        </div>
        <div>
          <label for="powerNames">Level‑1 Power Names (you always count as 1 dot)</label>
          <input id="powerNames" placeholder="Comma‑separated (e.g., Awe, Cloak of Shadows)" />
        </div>
      </div>
      <p class="muted text-sm mt-3">Ghouls gain one level‑1 power in a Discipline their domitor possesses. Extra level‑1 powers can be purchased with XP; ghouls never buy actual dots and count as 1 dot for activation. Using powers above level 1 via external means inflicts 1 Aggravated damage instead of a Rouse Check.</p>
    </section>

    <!-- SUMMARY -->
    <section class="card section hidden" data-panel="summary">
      <h2 class="text-xl font-semibold mb-3">Summary</h2>
      <div class="grid-3">
        <div>
          <h3 class="font-semibold">Derived</h3>
          <div>Health: <b id="sumHealth">—</b></div>
          <div>Willpower: <b id="sumWP">—</b></div>
          <div>Humanity (start): <b>7</b></div>
        </div>
        <div>
          <h3 class="font-semibold">Discipline</h3>
          <div id="sumDiscipline">—</div>
          <div class="text-sm">Powers: <span id="sumPowers">—</span></div>
        </div>
        <div>
          <h3 class="font-semibold">Checklist</h3>
          <ul class="list-disc pl-6 text-sm">
            <li>Advantages ≤ 7 dots (now <b id="sumAdv">0</b>)</li>
            <li>Flaws ≈ 2 dots (now <b id="sumFlaw">0</b>)</li>
            <li>One Discipline level‑1 power chosen</li>
            <li>Free Specialties set</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- DICE -->
    <section class="card section hidden" data-panel="dice">
      <h2 class="text-xl font-semibold mb-3">Dice Roller (Attribute + Skill)</h2>
      <div class="grid-3 items-end">
        <div>
          <label for="pool">Manual Pool Size</label>
          <input id="pool" type="number" min="0" value="5" />
        </div>
        <div></div>
        <div class="flex justify-end">
          <button id="roll" class="btn">Roll</button>
        </div>
      </div>
      <div id="rollOut" class="mt-3 p-3 rounded-lg" style="background:#0f1116;border:1px solid var(--line)">
        <div class="font-semibold">Results</div>
        <div>Rolls: <span id="rolls">—</span></div>
        <div>Successes (6+; 10s help crit): <b id="successes">—</b></div>
      </div>
    </section>

    <footer class="muted text-xs">This fan-made tool follows V5 Players Guide ghoul creation structure: Attributes array; Skills presets; one level‑1 Discipline from domitor; Health and Willpower derivations; Humanity 7 baseline; Advantages/Flaws guidance. World of Darkness and Vampire: The Masquerade are © Paradox Interactive AB (publ) and Renegade Game Studios. Non‑commercial, personal use only.</footer>
  </main>

  <script>
    // ----------------- Data -----------------
    const ATTRS = ["Strength","Dexterity","Stamina","Charisma","Manipulation","Composure","Intelligence","Wits","Resolve"]; 
    const SKILLS = [
      "Athletics","Brawl","Craft","Drive","Firearms","Larceny","Melee","Stealth","Survival",
      "Animal Ken","Etiquette","Insight","Intimidation","Leadership","Performance","Persuasion","Streetwise","Subterfuge",
      "Academics","Awareness","Finance","Investigation","Medicine","Occult","Politics","Science","Technology"
    ];
    const DISCIPLINES = ["Animalism","Auspex","Blood Sorcery","Celerity","Dominate","Fortitude","Obfuscate","Oblivion","Potence","Presence","Protean"]; 
    const CLANS = ["Banu Haqim","Brujah","Gangrel","Hecata","Lasombra","Malkavian","Ministry","Nosferatu","Ravnos","Salubri","Toreador","Tremere","Tzimisce","Ventrue","Caitiff"]; 
    const PRESETS = { Jack:{3:1,2:8,1:10}, Balanced:{3:3,2:5,1:7}, Specialist:{4:1,3:3,2:3,1:3} };

    // State
    const state = {
      name:"", concept:"", notes:"",
      domitor:{ name:"", clan:"", notes:"", disciplines:[] },
      attrs:Object.fromEntries(ATTRS.map(a=>[a,2])),
      skills:Object.fromEntries(SKILLS.map(s=>[s,0])),
      freeSpecs:{ Academics:"", Craft:"", Performance:"", Science:"", extra:"" },
      advantages:[], flaws:[],
      chosenDiscipline:"", disciplinePowers:[],
      dice:{ rolls:[], successes:0 }
    };
    state.attrs.Intelligence = 4; state.attrs.Manipulation = 1; state.attrs.Strength = 3; state.attrs.Dexterity = 3; state.attrs.Stamina = 3;

    // ----------------- Tabs -----------------
    document.querySelectorAll('.tabs .btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.tabs .btn').forEach(b=>b.setAttribute('aria-selected','false'));
        btn.setAttribute('aria-selected','true');
        const v = btn.dataset.tab;
        document.querySelectorAll('[data-panel]').forEach(p=> p.classList.toggle('hidden', p.dataset.panel!==v));
        if(v==='attributes'||v==='summary') updateDerived();
        if(v==='summary') updateSummary();
      });
    });

    // ----------------- Basics -----------------
    bindInput('name', v=> state.name=v);
    bindInput('concept', v=> state.concept=v);
    bindInput('notes', v=> state.notes=v);

    function bindInput(id, on){
      const el = document.getElementById(id);
      el.addEventListener('input', ()=> on(el.value));
    }

    // ----------------- Domitor -----------------
    const clanSel = document.getElementById('domitorClan');
    CLANS.forEach(c=>{ const o = document.createElement('option'); o.value=o.textContent=c; clanSel.appendChild(o); });
    clanSel.addEventListener('change', ()=> state.domitor.clan = clanSel.value);
    bindInput('domitorName', v=> state.domitor.name=v);
    bindInput('domitorNotes', v=> state.domitor.notes=v);

    const disWrap = document.getElementById('domitorDisciplines');
    DISCIPLINES.forEach(d=>{
      const row = document.createElement('label');
      row.className = 'flex items-center gap-2 text-sm';
      const cb = document.createElement('input'); cb.type='checkbox';
      cb.addEventListener('change', ()=>{
        const set = new Set(state.domitor.disciplines);
        if(cb.checked) set.add(d); else set.delete(d);
        state.domitor.disciplines = [...set];
        refreshChosenDiscipline();
      });
      row.appendChild(cb); row.appendChild(document.createTextNode(d));
      disWrap.appendChild(row);
    });

    function refreshChosenDiscipline(){
      const sel = document.getElementById('chosenDiscipline');
      sel.innerHTML = '';
      const empty = document.createElement('option'); empty.value=''; empty.textContent='—'; sel.appendChild(empty);
      state.domitor.disciplines.forEach(d=>{
        const o = document.createElement('option'); o.value=o.textContent=d; sel.appendChild(o);
      });
      sel.value = state.chosenDiscipline && state.domitor.disciplines.includes(state.chosenDiscipline) ? state.chosenDiscipline : '';
    }

    // ----------------- Attributes -----------------
    const attrGrid = document.getElementById('attrGrid');
    ATTRS.forEach(a=>{
      const wrap = document.createElement('div'); wrap.className='dotbox flex items-center gap-2 p-2 rounded-lg border border-[var(--line)]';
      const lab = document.createElement('label'); lab.textContent=a; lab.className='w-36';
      const minus = mkBtn('−'); const plus = mkBtn('+');
      const box = document.createElement('input'); box.type='number'; box.min=1; box.max=5; box.value=state.attrs[a];
      minus.addEventListener('click', ()=>{ box.value = Math.max(1, Number(box.value)-1); state.attrs[a] = Number(box.value); updateDerived(); });
      plus.addEventListener('click', ()=>{ box.value = Math.min(5, Number(box.value)+1); state.attrs[a] = Number(box.value); updateDerived(); });
      box.addEventListener('input', ()=>{ const v = Math.max(1, Math.min(5, Number(box.value)||1)); box.value=v; state.attrs[a]=v; updateDerived(); });
      wrap.append(lab, minus, box, plus);
      attrGrid.appendChild(wrap);
    });

    function mkBtn(t){ const b=document.createElement('button'); b.textContent=t; b.className='btn w-10'; return b; }

    function updateDerived(){
      const vals = Object.values(state.attrs);
      const at4 = vals.filter(v=>v===4).length;
      const at3 = vals.filter(v=>v===3).length;
      const at1 = vals.filter(v=>v===1).length;
      document.getElementById('chkAt4').textContent = at4;
      document.getElementById('chkAt3').textContent = at3;
      document.getElementById('chkAt1').textContent = at1;
      const health = (state.attrs.Stamina||0)+3;
      const willpower = (state.attrs.Resolve||0)+(state.attrs.Composure||0);
      document.getElementById('health').textContent = health;
      document.getElementById('willpower').textContent = willpower;
      document.getElementById('sumHealth').textContent = health;
      document.getElementById('sumWP').textContent = willpower;
    }
    updateDerived();

    // ----------------- Skills -----------------
    const presetSel = document.getElementById('preset');
    Object.keys(PRESETS).forEach(k=>{ const o=document.createElement('option'); o.value=o.textContent=k; presetSel.appendChild(o); });
    document.getElementById('applyPreset').addEventListener('click', ()=>{
      const p = PRESETS[presetSel.value];
      const order = [];
      Object.entries(p).forEach(([lvl,count])=>{ for(let i=0;i<count;i++) order.push(Number(lvl)); });
      SKILLS.forEach((s,i)=> state.skills[s] = order[i] ?? 0);
      refreshSkills();
    });

    const skillA = document.getElementById('skillColA');
    const skillB = document.getElementById('skillColB');
    const skillRows = new Map();

    function makeSkillRow(s){
      const wrap = document.createElement('div'); wrap.className='dotbox flex items-center gap-2 p-2 rounded-lg border border-[var(--line)]';
      const lab = document.createElement('label'); lab.textContent=s; lab.className='w-40';
      const minus = mkBtn('−'); const plus = mkBtn('+');
      const box = document.createElement('input'); box.type='number'; box.min=0; box.max=5; box.value=state.skills[s];
      minus.addEventListener('click', ()=>{ box.value = Math.max(0, Number(box.value)-1); state.skills[s] = Number(box.value); refreshPresetSummary(); });
      plus.addEventListener('click', ()=>{ box.value = Math.min(5, Number(box.value)+1); state.skills[s] = Number(box.value); refreshPresetSummary(); });
      box.addEventListener('input', ()=>{ const v = Math.max(0, Math.min(5, Number(box.value)||0)); box.value=v; state.skills[s]=v; refreshPresetSummary(); });
      wrap.append(lab, minus, box, plus);
      return wrap;
    }

    function refreshSkills(){
      skillA.innerHTML = ''; skillB.innerHTML = ''; skillRows.clear();
      SKILLS.forEach((s,i)=>{
        const row = makeSkillRow(s); skillRows.set(s,row);
        (i<9?skillA:skillB).appendChild(row);
      });
      refreshPresetSummary();
    }
    refreshSkills();

    function refreshPresetSummary(){
      const m = new Map();
      Object.values(state.skills).forEach(v=> m.set(v, (m.get(v)||0)+1));
      document.getElementById('sum4').textContent = m.get(4)||0;
      document.getElementById('sum3').textContent = m.get(3)||0;
      document.getElementById('sum2').textContent = m.get(2)||0;
      document.getElementById('sum1').textContent = m.get(1)||0;
    }

    // Free specialties inputs
    const fsWrap = document.getElementById('freeSpecs');
    Object.keys(state.freeSpecs).forEach(k=>{
      const cell = document.createElement('div');
      const lab = document.createElement('label'); lab.textContent = k.charAt(0).toUpperCase()+k.slice(1);
      const input = document.createElement('input'); input.placeholder = `Specialty for ${k}`;
      input.addEventListener('input',()=> state.freeSpecs[k]=input.value);
      cell.append(lab,input); fsWrap.appendChild(cell);
    });

    // ----------------- Advantages / Flaws -----------------
    const advList = document.getElementById('advList');
    const flawList = document.getElementById('flawList');

    document.getElementById('addAdv').addEventListener('click', ()=>{
      const n = document.getElementById('advName').value.trim();
      const d = Number(document.getElementById('advDots').value)||1;
      if(!n) return; state.advantages.push({name:n,dots:d}); document.getElementById('advName').value=''; renderAF();
    });
    document.getElementById('addFlaw').addEventListener('click', ()=>{
      const n = document.getElementById('flawName').value.trim();
      const d = Number(document.getElementById('flawDots').value)||1;
      if(!n) return; state.flaws.push({name:n,dots:d}); document.getElementById('flawName').value=''; renderAF();
    });

    function renderAF(){
      advList.innerHTML = ''; flawList.innerHTML = '';
      let advTot = 0, flawTot = 0;
      state.advantages.forEach((it,i)=>{ advTot += Number(it.dots)||0; advList.appendChild(rowAF('adv', i, it)); });
      state.flaws.forEach((it,i)=>{ flawTot += Number(it.dots)||0; flawList.appendChild(rowAF('flaw', i, it)); });
      document.getElementById('advTotal').textContent = advTot; document.getElementById('flawTotal').textContent = flawTot;
      document.getElementById('sumAdv').textContent = advTot; document.getElementById('sumFlaw').textContent = flawTot;
    }

    function rowAF(type, idx, it){
      const wrap = document.createElement('div'); wrap.className='flex items-center justify-between rounded-lg border border-[var(--line)] p-2';
      const left = document.createElement('div'); left.innerHTML = `${it.name} <span class="muted text-xs">(${it.dots} dots)</span>`;
      const right = document.createElement('div'); right.className='flex items-center gap-2';
      const minus = mkBtn('−'); const plus = mkBtn('+'); const rm = mkBtn('Remove');
      minus.addEventListener('click', ()=>{ it.dots = Math.max(1, (it.dots||1)-1); renderAF(); });
      plus.addEventListener('click', ()=>{ it.dots = Math.min(5, (it.dots||1)+1); renderAF(); });
      rm.addEventListener('click', ()=>{ (type==='adv'?state.advantages:state.flaws).splice(idx,1); renderAF(); });
      right.append(minus,plus,rm); wrap.append(left,right); return wrap;
    }

    // ----------------- Disciplines -----------------
    const chosenSel = document.getElementById('chosenDiscipline');
    chosenSel.addEventListener('change', ()=>{ state.chosenDiscipline = chosenSel.value; updateSummary(); });
    document.getElementById('powerNames').addEventListener('input', (e)=>{ state.disciplinePowers = e.target.value.split(',').map(x=>x.trim()).filter(Boolean); updateSummary(); });

    // Populate chosen discipline list from domitor selection initially
    refreshChosenDiscipline();

    // ----------------- Summary -----------------
    function updateSummary(){
      document.getElementById('sumDiscipline').textContent = state.chosenDiscipline ? `${state.chosenDiscipline} (1)` : '—';
      document.getElementById('sumPowers').textContent = state.disciplinePowers.length ? state.disciplinePowers.join(', ') : '—';
    }

    // ----------------- Dice -----------------
    document.getElementById('roll').addEventListener('click', ()=>{
      const n = Math.max(0, Number(document.getElementById('pool').value)||0);
      const rolls = Array.from({length:n}, ()=> 1+Math.floor(Math.random()*10));
      const tens = rolls.filter(r=>r===10).length; // simplified crit support
      const successes = rolls.filter(r=>r>=6).length + (tens>1 ? tens : 0);
      state.dice = { rolls, successes };
      document.getElementById('rolls').textContent = rolls.join(', ');
      document.getElementById('successes').textContent = successes;
    });

    // ----------------- PDF Export -----------------
    document.getElementById('downloadPdf').addEventListener('click', async ()=>{
      const { PDFDocument, StandardFonts, rgb } = PDFLib;
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([612,792]);
      const form = pdfDoc.getForm();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const title = (x,y,t)=> page.drawText(t,{x,y,size:18,font});
      const label = (x,y,t)=> page.drawText(t,{x,y,size:10,font,color:rgb(0.7,0.7,0.7)});

      title(40,750,'VTM5 Ghoul Character');
      const tf = (name,x,y,w=200,h=16,val='')=>{ const f=form.createTextField(name); f.setText(String(val||'')); f.addToPage(page,{x,y,width:w,height:h}); return f; };

      tf('Name',40,720,250,18,state.name); label(40,740,'Name');
      tf('Concept',310,720,250,18,state.concept); label(310,740,'Concept');

      label(40,700,'Domitor');
      tf('DomitorName',40,682,200,18,state.domitor.name); label(40,694,'Name');
      tf('DomitorClan',250,682,140,18,state.domitor.clan); label(250,694,'Clan');
      tf('DomitorDisciplines',400,682,160,18,state.domitor.disciplines.join(', ')); label(400,694,'Disciplines (domitor)');

      label(40,660,'Attributes');
      ATTRS.forEach((a,i)=>{
        const x = 40 + (i%3)*180; const y = 640 - Math.floor(i/3)*24;
        label(x,y+14,a);
        tf(`Attr_${a}`,x,y,40,14,state.attrs[a]);
      });

      label(40,566,'Derived');
      tf('Health',40,548,40,14,(state.attrs.Stamina||0)+3); label(40,560,'Health');
      tf('Willpower',100,548,40,14,(state.attrs.Resolve||0)+(state.attrs.Composure||0)); label(100,560,'Willpower');

      label(300,566,'Skills');
      SKILLS.forEach((s,i)=>{
        const x = 300 + (i%3)*90; const y = 548 - Math.floor(i/3)*18;
        tf(`Skill_${s}`,x,y,30,14,state.skills[s]);
        label(x+34,y+2,s);
      });

      label(40,516,'Discipline (Level 1) from domitor');
      tf('Discipline',40,498,520,16, state.chosenDiscipline + (state.disciplinePowers.length?`: ${state.disciplinePowers.join(', ')}`:''));

      tf('Advantages',40,472,520,16, state.advantages.map(a=>`${a.name} (${a.dots})`).join('; ')); label(40,488,'Advantages (7 dots total suggested)');
      tf('Flaws',40,446,520,16, state.flaws.map(a=>`${a.name} (${a.dots})`).join('; ')); label(40,462,'Flaws (2 dots suggested)');

      tf('Notes',40,320,520,110, state.notes); label(40,434,'Notes / Domitor Relationship / Touchstones & Convictions');

      form.updateFieldAppearances(font);
      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes], {type:'application/pdf'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download=`${state.name||'ghoul'}.pdf`; a.click(); URL.revokeObjectURL(url);
    });
  </script>
</body>
</html>
