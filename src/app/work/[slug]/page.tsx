"use client";
import { useEffect, useRef, use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

function Cursor(){const ref=useRef<HTMLDivElement>(null);useEffect(()=>{const c=ref.current;if(!c)return;const mv=(e:MouseEvent)=>{c.style.left=e.clientX+"px";c.style.top=e.clientY+"px"};const en=()=>c.classList.add("big");const lv=()=>c.classList.remove("big");window.addEventListener("mousemove",mv);const w=()=>{document.querySelectorAll("a,button,[data-m]").forEach(el=>{el.addEventListener("mouseenter",en);el.addEventListener("mouseleave",lv)})};w();const obs=new MutationObserver(w);obs.observe(document.body,{childList:true,subtree:true});return()=>{window.removeEventListener("mousemove",mv);obs.disconnect()}},[]);return <div ref={ref} className="cur hidden md:block"/>;}

const projects = {
  "clovai": { title: "Clov AI Analysis", cat: "Finance · AI", desc: "Asisten Artificial Intelligence pintar yang dirancang khusus untuk pemetaan data saham dan membaca laporan keuangan secara instan.", site: "https://clovai.lovable.app/" },
  "rena-ai": { title: "Rena AI Platform", cat: "AI · Productivity", desc: "Platform AI agentic untuk pembuatan dokumen, presentasi, dan gambar otomatis guna mempercepat alur kerja kreatif.", site: "https://rena-ai-theta.vercel.app/" },
  "clovnime": { title: "Clovnime", cat: "Entertainment · Streaming", desc: "Platform streaming anime modern yang dirancang untuk memberikan pengalaman menonton yang cepat dan nyaman. Dilengkapi dengan update harian untuk anime ongoing, database lengkap untuk anime yang sudah tamat, beserta jadwal rilis ter-update.", site: "https://clovnime.vercel.app/" },
  "clovflapy": { title: "Clovflapy", cat: "SaaS · API Gateway", desc: "Sebuah control plane API untuk Large Language Models (LLM) bergaya pay-as-you-go yang terasa seperti control room sungguhan. Menyediakan fitur manajemen API key, ledger untuk transparansi saldo (wallet), serta endpoint gateway yang sepenuhnya kompatibel dengan SDK OpenAI standar.", site: "https://clovflapy.vercel.app/" }
};

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const project = projects[slug as keyof typeof projects];
  
  if (!project) return notFound();

  return (
    <>
      <Cursor />
      <nav className="fixed top-0 w-full z-50 bg-bg/80 backdrop-blur-2xl border-b border-line">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
          <Link href="/" className="text-sm font-semibold tracking-wide text-fg" data-m>clovie</Link>
          <Link href="/#work" className="text-[13px] text-secondary hover:text-fg transition-colors" data-m>Back to Works</Link>
        </div>
      </nav>

      <div className="min-h-screen pt-40 px-6 md:px-12 lg:px-16 max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-[13px] tracking-[0.3em] uppercase text-accent font-mono mb-6">{project.cat}</p>
          <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-fg leading-tight mb-8">{project.title}</h1>
          <p className="text-xl text-secondary font-light leading-relaxed mb-12">{project.desc}</p>
        </div>
        
        <div className="glass p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-white/10 rounded-3xl">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full md:w-auto">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-tertiary font-mono mb-2">Status</h3>
              <p className="text-sm text-fg">Live Production</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-tertiary font-mono mb-2">Role</h3>
              <p className="text-sm text-fg">Lead Developer</p>
            </div>
          </div>
          <a href={project.site} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto h-12 px-8 flex items-center justify-center rounded-full bg-accent text-white text-sm font-medium hover:brightness-110 backdrop-blur-sm transition-all" data-m>
            Visit Project ↗
          </a>
        </div>
      </div>
    </>
  );
}
