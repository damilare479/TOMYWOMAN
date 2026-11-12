(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const song=$('#song'),pp=$('#pp'),mu=$('#mu'),pg=$('#pg');
let hasAudio=true;song.addEventListener('error',()=>{hasAudio=false;$('#player').hidden=true});
// loader
const hideLoader=()=>{const l=$('#loader');if(l)l.classList.add('off')};setTimeout(hideLoader,900);addEventListener('load',hideLoader);
// hide missing photos gracefully
$$('figure img').forEach(i=>{const hide=()=>{const f=i.closest('figure');if(f)f.style.display='none'};i.addEventListener('error',hide);if(i.complete&&!i.naturalWidth)hide()});
$('.cutout').addEventListener('error',e=>e.target.style.display='none');
// content
const R=[["Your smile","because it has a way of making an ordinary moment feel extraordinary."],["Your beautiful heart","because who you are matters just as much as how beautiful you look."],["Your presence","because some people make everything feel a little better simply by being there."],["Your strength","because there is something admirable about the person you continue to become."],["Your uniqueness","because there is nobody quite like you."],["Your laughter","because it is one of those sounds I never get tired of."],["Your little ways","because sometimes the smallest things about you mean the most."],["Your dreams","because I genuinely hope life gives you every opportunity to pursue them."],["Your beautiful soul","because your value goes far beyond what the eyes can see."],["Simply YOU","because even without a list, you are enough reasons to be celebrated."]];
$('#cards').innerHTML=R.map(r=>`<button class="card r" aria-label="${r[0]}: reveal"><span class="f">${r[0]}</span><span class="b">${r[0]} — ${r[1]}</span></button>`).join('');
$$('.card').forEach(c=>c.onclick=()=>c.classList.toggle('flip'));
const W=["A lifetime of happiness.","A heart that never runs out of hope.","Opportunities that exceed your expectations.","Good health and genuine peace.","The courage to pursue every dream.","People who appreciate and celebrate you.","Beautiful surprises when you least expect them.","Success in everything you genuinely desire.","Love that feels safe, sincere and reassuring.","A life filled with countless reasons to smile."];
$('#wl').innerHTML=W.map(w=>`<li class="r">${w}</li>`).join('');
const L=`Dear Aisha,

Happy birthday, my beautiful woman.

I wish I could find the perfect combination of words to explain just how special you are, but somehow, every sentence feels too small.

Today is about celebrating you. The beautiful person you are, your smile, your presence, your strength, your little ways of making moments special and all the wonderful things that make you uniquely you.

Sometimes, I look at our pictures and realise that the most beautiful memories are often made in the simplest moments. A smile, a conversation, a shared laugh, a random picture or just having you around.

I hope this new chapter brings you everything your heart has quietly prayed for. I hope you experience opportunities that excite you, happiness that stays, peace that grounds you, love that reassures you and beautiful reasons to smile every single day.

May you never have to question your worth. May you always remember how extraordinary you are. May life be gentle with you, and may the dreams you carry in your heart find their way into reality.

Thank you for being you.

If I could make one birthday wish for you, it would be that you see yourself, even for a moment, through the eyes of someone who thinks the world is a little more beautiful because you are in it.

Happy birthday, Aisha.

With all my affection.`;
let typed=false;
$('#env').onclick=e=>{const b=e.currentTarget;b.classList.add('open');b.setAttribute('aria-expanded','true');const p=$('#paper'),t=$('#lt');p.hidden=false;if(typed)return;typed=true;
 if(calm){t.textContent=L;$('.end').hidden=false;return}
 let i=0;(function s(){t.textContent=L.slice(0,i+=2);if(i<L.length)setTimeout(s,22);else $('.end').hidden=false})()};
// music
const fmt=()=>pp.textContent=song.paused?'▶':'❚❚';
pp.onclick=()=>{song.paused?song.play().catch(()=>{}):song.pause()};
mu.onclick=()=>{song.muted=!song.muted;mu.style.opacity=song.muted?.4:1};
song.onplay=song.onpause=fmt;
song.ontimeupdate=()=>pg.style.width=(song.currentTime/(song.duration||1))*100+'%';
// open
$('#open').onclick=()=>{
 $('#intro').classList.add('gone');document.body.classList.remove('locked');$('#main').hidden=false;
 if(hasAudio){$('#player').hidden=false;song.preload='auto';song.play().catch(()=>{})}
 scrollTo(0,0);observe();nav();burst(40);
};
$('#replay').onclick=()=>{$('#intro').classList.remove('gone');document.body.classList.add('locked');$('#main').hidden=true;scrollTo(0,0)};
// reveal
let io;function observe(){io=io||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.classList.contains('sign'))burst(120);io.unobserve(e.target)}}),{threshold:.15});
 $$('.r').forEach((el,i)=>{el.style.transitionDelay=(el.closest('#cards,#wl')?(i%10)*.08:0)+'s';io.observe(el)})}
// nav dots + top + parallax
function nav(){const n=$('#dots');if(n.children.length)return;$$('.sec').forEach(s=>{const a=document.createElement('a');a.href='#'+s.id;a.title=s.dataset.title;a.setAttribute('aria-label',s.dataset.title);n.append(a)});
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)[...n.children].forEach((a,i)=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{threshold:.5});$$('.sec').forEach(s=>so.observe(s))}
addEventListener('scroll',()=>{const y=scrollY;$('#top').hidden=y<600||$('#main').hidden;if(!calm&&y<innerHeight*1.5)$('.hero-bg').style.transform=`translateY(${y*.25}px)`},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
// lightbox
$$('figure').forEach(f=>f.onclick=()=>{const i=f.querySelector('img');$('#lb img').src=i.src;$('#lb img').alt=i.alt;$('#lb').hidden=false});
$('#lb').onclick=()=>$('#lb').hidden=true;addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').hidden=true});
// cursor
addEventListener('pointermove',e=>{$('#cursor').style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
// particles (golden dust + confetti), paused when tab hidden
const cv=$('#fx'),cx=cv.getContext('2d');let P=[],raf;
const size=()=>{cv.width=innerWidth;cv.height=innerHeight};size();addEventListener('resize',size);
const N=calm?0:(innerWidth<600?24:50);
for(let i=0;i<N;i++)P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.8+.4,v:Math.random()*.3+.1,a:Math.random()*.6+.2,d:0});
function burst(n){if(calm)return;for(let i=0;i<n;i++)P.push({x:Math.random()*innerWidth,y:-10,r:Math.random()*3+1.5,v:Math.random()*2+1,a:1,d:1,life:300})}
function draw(){cx.clearRect(0,0,cv.width,cv.height);
 P=P.filter(p=>{p.y+=p.v;p.x+=p.d?Math.sin(p.y/30):0;if(p.d){if(--p.life<0)return false}else if(p.y>cv.height){p.y=-5;p.x=Math.random()*cv.width}
 cx.globalAlpha=p.a*(p.d?Math.min(1,p.life/60):1);cx.fillStyle=p.d?'#D8B779':'#F8E6B8';cx.beginPath();cx.arc(p.x,p.y,p.r,0,7);cx.fill();return true});
 raf=requestAnimationFrame(draw)}
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(!document.hidden)draw()});draw();
})();
