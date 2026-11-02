'use strict';
const TOOLS = [
  {t:'Languages', u:'C++ for DSA, JavaScript for nearly everything I ship.', c:['C++','Python','JavaScript','Java']},
  {t:'Frontend', u:'I hand-build responsive layouts before reaching for a library.', c:['HTML5','CSS3','Tailwind CSS','React.js']},
  {t:'Backend & data', u:'REST APIs, auth and CRUD for my MERN apps.', c:['Node.js','Express.js','MongoDB','MySQL']},
  {t:'Tools', u:'Figma for rough layouts, Postman to test APIs before the UI exists.', c:['Git','GitHub','VS Code','Figma','Postman']},
  {t:'Cloud', u:'This site runs on AWS Amplify. Still learning, but I can deploy and read logs.', c:['AWS Amplify','AWS (basics)','Google Cloud (basics)','Render']},
  {t:'Core CS', u:'The part of my degree I enjoy most, and it makes me debug faster.', c:['DSA','OOP','DBMS','OS','Networks']}
];
const PROJECTS = [
  {n:'SevaLink', d:'Volunteer management platform that helps NGOs find and coordinate volunteers.', c:['MERN','Tailwind'], gh:'https://github.com/CodeAcers/SevaLink', live:'https://himanshisharma18-wq.github.io/NGO_Bridge/'},
  {n:'Blog Project', d:'Full-stack blog platform with user accounts and post management.', c:['Node','Express','MongoDB'], gh:'https://github.com/himanshisharma18-wq/blog-project', live:'https://blog-project-86ee.onrender.com'},
  {n:'Shield Neural Nexus', d:'AI-based security and neural network analysis project.', c:['AI','Security'], gh:'https://github.com/himanshisharma18-wq/SHEILD-NEURALNEXUS'},
  {n:'Mini Project 2', d:'Phase-by-phase functional build, deployed on Render.', c:['Web','Full stack'], gh:'https://github.com/himanshisharma18-wq/MINIPROJECT2', live:'https://miniproject2-p2rj.onrender.com'},
  {n:'Mini Project 1', d:'An early exploration where I practised the basics.', c:['HTML','CSS','JS'], gh:'https://github.com/himanshisharma18-wq/miniproject1', live:'https://himanshisharma18-wq.github.io/miniproject1/'},
  {n:'This site', d:'Plain HTML, CSS and JS on AWS Amplify, with the sorting puzzle above.', c:['AWS Amplify','JavaScript'], gh:'https://github.com/himanshisharma18-wq/portfolio-website'}
];
const STORY = [
  {y:'2023', t:'Scored 92.6% in 10th', x:'CBSE, and the year I got serious about computers.'},
  {y:'2025', t:'Finished 12th at 93.4%', x:'PCMB, then straight into engineering.'},
  {y:'2025', t:'Joined GGSIPU', x:'B.Tech CSE. Picked full stack as my focus.'},
  {y:'2025', t:'Fell for C++ and DSA', x:'100+ problems solved so far.'},
  {y:'2026', t:'Shipped SevaLink', x:'My first MERN app, built for NGOs.'},
  {y:'2026', t:'Started freelancing', x:'Websites for students and small businesses.'},
  {y:'Nov 2026', t:'Moved to AWS', x:'This portfolio, live on Amplify. Next: your idea?'}
];
const $ = s => document.querySelector(s), N = STORY.length;
const chips = a => a.map(x => `<span>${x}</span>`).join('');

$('#tools').innerHTML = TOOLS.map(o => `<div class="tool"><h3>${o.t}</h3><p>${o.u}</p><div class="chips">${chips(o.c)}</div></div>`).join('');
$('#projects').innerHTML = PROJECTS.map(p =>
  `<li><div><h3>${p.n}</h3><p>${p.d}</p><div class="chips">${chips(p.c)}</div></div>
   <div class="links"><a href="${p.gh}" target="_blank" rel="noopener">Code ↗</a>${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live ↗</a>` : ''}</div></li>`).join('');

/* --- Sort me out --- */
let arr = [], sel = -1, swaps = 0, busy = false, done = false;
const board = $('#board');

function minSwaps(a){ const seen = Array(N).fill(false); let cycles = 0;
  for(let i=0;i<N;i++){ if(!seen[i]){ cycles++; let j=i; while(!seen[j]){ seen[j]=true; j=a[j]; } } }
  return N - cycles; }
let startBest = 0, usedAuto = false;
function shuffle(){
  do { arr = [...Array(N).keys()]; for(let i=N-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } }
  while(arr.some((v,i)=>v===i));
  startBest = minSwaps(arr); sel=-1; swaps=0; busy=false; done=false; usedAuto=false;
  $('#win').hidden=true; $('#auto').disabled=false;
  $('#best').textContent = 'Fewest possible: ' + startBest;
  say('Tap a tile, then tap another to swap them.'); render();
}
function say(m){ $('#status').textContent = m; }
function render(){
  $('#moves').textContent = 'Swaps: ' + swaps;
  board.innerHTML = arr.map((v,i) => {
    const ok = v===i;
    if(ok){ const s=STORY[v]; return `<button class="tile locked" disabled aria-label="Position ${i+1}: ${s.t}. ${s.x}"><span class="yr">${s.y}</span><span class="ttl">${s.t}</span><span class="txt">${s.x}</span></button>`; }
    return `<button class="tile${i===sel?' sel':''}" data-i="${i}" aria-label="Tile ${v+1}, position ${i+1}, not in place yet"><span class="num">${v+1}</span><span class="q">?</span></button>`;
  }).join('');
  if(!done && arr.every((v,i)=>v===i)) win();
}
function swap(a,b){ [arr[a],arr[b]]=[arr[b],arr[a]]; swaps++; }
board.addEventListener('click', e => {
  const t = e.target.closest('.tile'); if(!t || busy || done || t.classList.contains('locked')) return;
  const i = +t.dataset.i;
  if(sel<0){ sel=i; say('Now tap the tile to swap it with.'); }
  else if(sel===i){ sel=-1; say('Selection cleared.'); }
  else { swap(sel,i); sel=-1; say(arr.filter((v,k)=>v===k).length+' of '+N+' in place.'); }
  render();
});
function win(){
  done = true; $('#win').hidden = false;
  $('#winMsg').textContent = usedAuto ? `Bubble sort needed ${swaps} swaps. The minimum was ${startBest}, so try it yourself and see if you can beat it.`
    : swaps <= startBest ? `You did it in ${swaps} swaps, the minimum possible. Efficient.` : `Done in ${swaps} swaps (the minimum was ${startBest}). Shuffle and try for fewer.`;
  say('All tiles sorted.');
  $('#win').scrollIntoView({behavior:'smooth', block:'nearest'});
}
$('#shuffle').onclick = () => shuffle();
$('#auto').onclick = async () => {
  if(busy || done) return; busy = true; usedAuto = true; sel = -1; $('#auto').disabled = true; say('Bubble sort running...');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  for(let pass=0; pass<N; pass++){
    let moved = false;
    for(let i=0;i<N-1-pass;i++){
      if(arr[i]>arr[i+1]){ swap(i,i+1); moved = true; render(); if(!reduce) await new Promise(r=>setTimeout(r,320)); }
    }
    if(!moved) break;
  }
  busy = false; render();
};
shuffle();
