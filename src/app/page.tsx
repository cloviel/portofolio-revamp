"use client";
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import Link from "next/link";
import Image from "next/image";

function useLenis(){useEffect(()=>{const l=new Lenis({duration:1.4,smoothWheel:true});const r=(t:number)=>{l.raf(t);requestAnimationFrame(r)};requestAnimationFrame(r);return()=>l.destroy()},[]);}

function Rev({children,className="",d=0}:{children:ReactNode;className?:string;d?:number}){
  return <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:false, amount:0.08}} transition={{duration:0.8,delay:d,ease:[0.22,1,0.36,1]}} className={className}>{children}</motion.div>;
}

function Cursor(){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const c=ref.current;if(!c)return;const mv=(e:MouseEvent)=>{c.style.left=e.clientX+"px";c.style.top=e.clientY+"px"};const en=()=>c.classList.add("big");const lv=()=>c.classList.remove("big");window.addEventListener("mousemove",mv);const w=()=>{document.querySelectorAll("a,button,[data-m]").forEach(el=>{el.addEventListener("mouseenter",en);el.addEventListener("mouseleave",lv)})};w();const obs=new MutationObserver(w);obs.observe(document.body,{childList:true,subtree:true});return()=>{window.removeEventListener("mousemove",mv);obs.disconnect()}},[]);return <div ref={ref} className="cur hidden md:block"/>;}

function Mag({children,className="",href,target,rel}:{children:ReactNode;className?:string;href?:string;target?:string;rel?:string}){const ref=useRef<HTMLAnchorElement>(null);const mv=useCallback((e:React.MouseEvent)=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.25}px,${(e.clientY-r.top-r.height/2)*0.25}px)`},[]);const lv=useCallback(()=>{if(ref.current)ref.current.style.transform="translate(0,0)"},[]);return <a ref={ref} href={href} target={target} rel={rel} onMouseMove={mv} onMouseLeave={lv} data-m className={`inline-flex items-center transition-transform duration-300 ${className}`}>{children}</a>;}

const roles=["Pengembang","Web3 Developer","Market Analyst","Fotografer","Penulis"];
function RoleText(){const[i,setI]=useState(0);useEffect(()=>{const t=setInterval(()=>setI(p=>(p+1)%roles.length),2400);return()=>clearInterval(t)},[]);return(<span className="inline-block h-[1.3em] overflow-hidden align-bottom"><AnimatePresence mode="wait"><motion.span key={i} initial={{y:36,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-36,opacity:0}} transition={{duration:0.35}} className="inline-block text-accent font-medium">{roles[i]}</motion.span></AnimatePresence></span>);}

/* ── WINDOW OPEN INTRO ── */
function WindowIntro({onDone}:{onDone:()=>void}){
  const[phase,setPhase]=useState(0); // 0=closed, 1=text, 2=opening
  useEffect(()=>{
    const a=setTimeout(()=>setPhase(1),400);
    const b=setTimeout(()=>setPhase(2),1800);
    const c=setTimeout(onDone,2600);
    return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c)};
  },[onDone]);
  return(
    <motion.div className="fixed inset-0 z-[100]" exit={{opacity:0}} transition={{duration:0.3}}>
      {/* Left shutter - with window frame aesthetic */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a] z-20 border-r border-white/10"
        animate={phase>=2?{x:"-100%"}:{}}
        transition={{duration:0.8,ease:[0.76,0,0.24,1]}}
      >
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/5"/>
        {/* Window handle */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-16 rounded-full bg-white/10"/>
      </motion.div>
      {/* Right shutter */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a] z-20 border-l border-white/10"
        animate={phase>=2?{x:"100%"}:{}}
        transition={{duration:0.8,ease:[0.76,0,0.24,1]}}
      >
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5"/>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-16 rounded-full bg-white/10"/>
      </motion.div>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
        <motion.div initial={{opacity:0}} animate={{opacity:phase>=1&&phase<2?1:0}} transition={{duration:0.5}} className="text-center">
          <p className="text-[11px] tracking-[0.5em] uppercase text-secondary/60 mb-3">Welcome to</p>
          <h1 className="text-2xl md:text-3xl font-serif italic text-fg/80">Clovie&apos;s World</h1>
        </motion.div>
      </div>
      {/* Behind shutters: preview of the hero image */}
      <div className="absolute inset-0 z-10">
        <Image src="/hero-bg-best.png" alt="" fill className="object-cover opacity-40" priority/>
        <div className="absolute inset-0 bg-bg/60"/>
      </div>
    </motion.div>
  );
}

function Nav(){const[open,setOpen]=useState(false);const[sc,setSc]=useState(false);useEffect(()=>{const h=()=>setSc(window.scrollY>60);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);const ls=["about","skills","work","education","contact"];
return(<nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${sc?"bg-bg/80 backdrop-blur-2xl border-b border-line":""}`}><div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16"><Link href="#" className="text-sm font-semibold tracking-wide text-fg" data-m>clovie</Link><div className="hidden md:flex gap-8">{ls.map(l=><Link key={l} href={`#${l}`} className="text-[13px] text-secondary hover:text-fg transition-colors capitalize" data-m>{l}</Link>)}</div><button className="md:hidden" onClick={()=>setOpen(!open)} aria-label="Menu"><div className="flex flex-col gap-[5px]"><motion.span className="w-5 h-px bg-fg block" animate={open?{rotate:45,y:3}:{}}/><motion.span className="w-5 h-px bg-fg block" animate={open?{rotate:-45,y:-3}:{}}/></div></button></div><AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="md:hidden bg-bg/95 backdrop-blur-2xl border-t border-line px-6 py-8 flex flex-col gap-6">{ls.map(l=><Link key={l} href={`#${l}`} onClick={()=>setOpen(false)} className="text-xl text-secondary hover:text-fg capitalize">{l}</Link>)}</motion.div>}</AnimatePresence></nav>);}

function Mq({items}:{items:string[]}){const d=[...items,...items,...items,...items];return(<div className="overflow-hidden py-5 border-y border-line"><div className="mq-track">{d.map((t,i)=><span key={i} className="text-[4rem] md:text-[7rem] font-serif italic text-fg/[0.03] whitespace-nowrap select-none">{t}</span>)}</div></div>);}

const skills=[
  {title:"Web3 Developer",desc:"Building decentralized applications and smart contracts."},
  {title:"Programmer",desc:"Vibe coding specialist, crafting aesthetic software."},
  {title:"Market Analyst",desc:"Fundamental-focused analysis across stocks and crypto."},
  {title:"Fotografer",desc:"Capturing moments with precision and mood."},
  {title:"Service Gadget",desc:"Hardware repair and troubleshooting."},
  {title:"Penulis & Editor",desc:"Crafting compelling narratives and refining content."},
];
const projects=[
  {n:"01",title:"Clovdmy Saham ID",cat:"Finance · Web App",desc:"Platform analisa saham khusus pasar modal Indonesia.",site:"https://clovdmy.lovable.app/",detail:"/work/clovdmy"},
  {n:"02",title:"Clov AI Analysis",cat:"Finance · AI",desc:"Asisten Artificial Intelligence untuk pemetaan data saham.",site:"https://clovai.lovable.app/",detail:"/work/clovai"},
  {n:"03",title:"Rena AI Platform",cat:"AI · Productivity",desc:"Platform AI agentic untuk pembuatan dokumen, presentasi, dan gambar otomatis.",site:"https://rena-ai-theta.vercel.app/",detail:"/work/rena-ai"},
  {n:"04",title:"YuVlaw Workspace",cat:"SaaS · CMS",desc:"Sistem manajemen konten terpadu untuk pengelolaan produk, kampanye, dan agen otomatis.",site:"https://yuvlaw.vercel.app/",detail:"/work/yuvlaw"},
];
const socials=[{label:"Email",href:"mailto:valencied@clovfla.my.id"},{label:"Instagram",href:"https://www.instagram.com/zerovlie"},{label:"X",href:"https://x.com/clovalencied"},{label:"Stockbit",href:"https://stockbit.com/clov"}];

export default function Home(){
  const[ready,setReady]=useState(false);
  useLenis();
  const heroRef=useRef<HTMLDivElement>(null);
  const{scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]});
  const hOp=useTransform(scrollYProgress,[0,0.7],[1,0]);
  const hY=useTransform(scrollYProgress,[0,1],[0,150]);
  const imgScale=useTransform(scrollYProgress,[0,1],[1,1.15]);

  return(<>
    <AnimatePresence mode="wait">{!ready&&<WindowIntro key="i" onDone={()=>setReady(true)}/>}</AnimatePresence>
    <motion.div style={{ scaleX: useScroll().scrollYProgress }} className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[100]" />
    <div className={`transition-opacity duration-700 ${ready?"opacity-100":"opacity-0 pointer-events-none"}`}>
      <Cursor/><Nav/>

      {/* ═══ HERO — Full visual ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image with parallax */}
        <motion.div style={{scale:imgScale}} className="absolute inset-0 z-0">
          <Image src="/hero-bg-best.png" alt="" fill className="object-cover" priority/>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30"/>
          <div className="absolute inset-0 bg-gradient-to-r from-bg/50 to-transparent"/>
        </motion.div>

        <motion.div style={{y:hY,opacity:hOp}} className="relative z-10 w-full px-6 md:px-12 lg:px-16 pb-20 md:pb-28 max-w-5xl">
          <Rev><p className="text-[13px] tracking-[0.4em] uppercase text-secondary font-mono mb-6">Portfolio — 2026</p></Rev>
          <Rev d={0.1}><h1 className="font-serif italic text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-tight text-fg mb-6">Nendy Rosiano</h1></Rev>
          <Rev d={0.25}><p className="text-xl md:text-2xl text-secondary/90 font-light mb-3">Saya adalah <RoleText/></p></Rev>
          <Rev d={0.3}><p className="text-sm text-tertiary mb-8">(a.k.a Clov Valencied / Clovie)</p></Rev>
          <Rev d={0.4}><div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Mag href="#work" className="h-12 px-8 rounded-full bg-accent text-white text-sm font-medium hover:brightness-110 backdrop-blur-sm justify-center">View Projects</Mag>
            <Mag href="#contact" className="h-12 px-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-fg text-sm font-medium hover:bg-white/20 justify-center">Contact</Mag>
          </div></Rev>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"><motion.div animate={{y:[0,6,0]}} transition={{repeat:Infinity,duration:2}} className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1.5"><div className="w-0.5 h-1.5 bg-white/40 rounded-full"/></motion.div></div>
      </section>

      <Mq items={["Developer","Analyst","Photographer","Writer","Web3","Designer"]}/>

      {/* ═══ ABOUT — with accent image ═══ */}
      <section id="about" className="py-24 md:py-48 px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Rev><p className="text-[13px] tracking-[0.3em] uppercase text-accent font-mono mb-4">01 — Tentang Saya</p></Rev>
            <Rev><h2 className="font-serif italic text-4xl md:text-5xl text-fg leading-tight mb-10">Tentang Saya</h2></Rev>
            <div className="space-y-6 text-[16px] text-secondary font-light leading-[1.9]">
              <Rev><p>Saya adalah seorang profesional multidisiplin dengan beragam keahlian, mulai dari pengembangan Web3 dan analisis pasar, hingga fotografi dan penulisan.</p></Rev>
              <Rev d={0.1}><p>Di komunitas finansial dan kripto, saya dikenal luas dengan nama alias <span className="text-fg font-normal">Clov Valencied</span> (atau sekadar Clovie / Clov).</p></Rev>
              <Rev d={0.2}><p>Saya juga memiliki pengalaman praktis dalam reparasi gadget dan saat ini sedang memperluas wawasan di berbagai bidang baru.</p></Rev>
            </div>
            <Rev d={0.3}><blockquote className="mt-10 text-[15px] text-tertiary/70 italic leading-relaxed border-l border-accent/30 pl-5">&ldquo;Apapun itu diusahakan — saya tidak menjanjikan apapun, tapi saya mengusahakan apa yang sudah menjadi kewajiban.&rdquo;</blockquote></Rev>
          </div>
          <Rev d={0.1}>
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <Image src="/accent-bg.png" alt="Abstract art" fill className="object-cover"/>
              <div className="absolute inset-0 bg-bg/30"/>
              {/* Stats overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col gap-4 p-8 w-full max-w-[200px]">
                  {[{v:"7+",l:"Keahlian Utama"},{v:"W3",l:"Fokus Web3"},{v:"∞",l:"Rasa Ingin Tahu"}].map(s=>(
                    <div key={s.l} className="glass p-4 text-center backdrop-blur-xl">
                      <span className="text-2xl font-serif italic text-fg block">{s.v}</span>
                      <span className="text-[10px] text-secondary uppercase tracking-wider">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Rev>
        </div>
      </section>

      <div className="h-px bg-line"/>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" className="relative py-24 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="/skills-bg.png" alt="" fill className="object-cover opacity-25"/><div className="absolute inset-0 bg-bg/60"/></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <Rev><p className="text-[13px] tracking-[0.3em] uppercase text-accent font-mono mb-4">02 — Keahlian</p></Rev>
          <Rev><h2 className="font-serif italic text-4xl md:text-5xl text-fg leading-tight mb-16">Keahlian yang saya miliki.</h2></Rev>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((s,i)=>(
              <Rev key={s.title} d={i*0.06}>
                <div className="glass p-7 group hover:scale-[1.02] transition-transform h-full cursor-default">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 mb-5 flex items-center justify-center group-hover:bg-accent/20 transition-colors"><div className="w-2 h-2 rounded-full bg-accent"/></div>
                  <h3 className="text-base font-semibold text-fg mb-2">{s.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-line"/>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="work" className="relative py-24 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="/portfolio-bg.png" alt="" fill className="object-cover opacity-20"/><div className="absolute inset-0 bg-bg/65"/></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <Rev><p className="text-[13px] tracking-[0.3em] uppercase text-accent font-mono mb-4">03 — Portfolio</p></Rev>
          <Rev><h2 className="font-serif italic text-4xl md:text-5xl text-fg leading-tight mb-16">Selected Works.</h2></Rev>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p,i)=>(
              <Rev key={p.title} d={i*0.08}>
                <div className="glass p-8 group hover:scale-[1.01] transition-transform h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-tertiary">{p.cat}</span>
                    <span className="text-5xl font-serif italic text-fg/[0.06] leading-none select-none">{p.n}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-fg mb-3 group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed mb-6 flex-grow">{p.desc}</p>
                  <div className="flex gap-6 pt-4 border-t border-line">
                    <a href={p.detail} className="text-[13px] text-tertiary hover:text-fg transition-colors" data-m>Details →</a>
                    <a href={p.site} target="_blank" rel="noopener noreferrer" className="text-[13px] text-tertiary hover:text-fg transition-colors" data-m>Visit ↗</a>
                  </div>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-line"/>

      {/* ═══ EDUCATION ═══ */}
      <section id="education" className="relative py-24 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="/accent-bg.png" alt="" fill className="object-cover opacity-15"/><div className="absolute inset-0 bg-bg/75"/></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Rev><p className="text-[13px] tracking-[0.3em] uppercase text-accent font-mono mb-4">04 — Pendidikan</p></Rev>
          <Rev><h2 className="font-serif italic text-4xl md:text-5xl text-fg leading-tight mb-16">Education.</h2></Rev>
          <div className="relative ml-4">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-line"/>
            {[{period:"2023 — Present",school:"Universitas Terbuka",degree:"Ilmu Hukum",desc:"Expanding analytical and legal frameworks."},
              {period:"Graduated",school:"SMK Multimedia",degree:"Multimedia",desc:"Foundational skills in digital media and technology."}
            ].map((ed,i,arr)=>(<Rev key={ed.school} d={i*0.1}><div className={`relative pl-10 group ${i !== arr.length - 1 ? 'pb-16' : ''}`}><div className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full bg-accent border-2 border-bg group-hover:scale-150 transition-transform"/><span className="text-[11px] font-mono uppercase tracking-[0.2em] text-tertiary block mb-2">{ed.period}</span><h3 className="text-xl font-semibold text-fg mb-1">{ed.school}</h3><p className="text-sm text-accent/60 mb-1">{ed.degree}</p><p className="text-[15px] text-secondary">{ed.desc}</p></div></Rev>))}
          </div>
        </div>
      </section>

      <div className="h-px bg-line"/>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="relative py-24 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0"><Image src="/accent-bg.png" alt="" fill className="object-cover opacity-15"/><div className="absolute inset-0 bg-bg/80"/></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <Rev><h2 className="font-serif italic text-4xl md:text-6xl text-fg leading-tight mb-6">Ada sesuatu yang ingin kita kerjakan bersama?</h2></Rev>
          <Rev d={0.1}><p className="text-lg text-secondary font-light mb-16 max-w-xl mx-auto">Jangan ragu untuk menghubungi saya melalui platform mana pun di bawah ini.</p></Rev>
          <Rev d={0.2}><div className="flex flex-wrap justify-center gap-3">{socials.map(s=>(<Mag key={s.label} href={s.href} target={s.href.startsWith("mailto")?undefined:"_blank"} rel={s.href.startsWith("mailto")?undefined:"noopener noreferrer"} className="h-12 px-8 rounded-full border border-white/15 text-[13px] font-medium text-secondary hover:text-white hover:bg-accent hover:border-accent backdrop-blur-sm transition-all duration-300">{s.label}</Mag>))}</div></Rev>
        </div>
      </section>

      <footer className="border-t border-line py-8 max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-tertiary">
        <div className="flex items-center gap-3"><span className="font-serif italic text-fg">Nendy Rosiano</span><span>© {new Date().getFullYear()}</span></div>
        <div className="flex items-center gap-4"><span>Built with Next.js</span></div>
      </footer>
    </div>
  </>);
}
