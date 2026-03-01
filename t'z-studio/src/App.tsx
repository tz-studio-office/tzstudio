import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'motion/react';
import { ArrowRight, Menu, X, ArrowUpRight } from 'lucide-react';

function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center p-6"
        >
          <div className="relative flex flex-col items-center gap-16 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-7xl md:text-9xl font-black tracking-[-0.08em] text-black text-center leading-none uppercase"
            >
              T'Z <br /> Studio
            </motion.div>
            
            <div className="w-full space-y-8">
              <div className="h-0.5 w-full bg-black/[0.05] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-black rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center font-sans text-[10px] text-black/80 font-black tracking-[0.4em] uppercase">
                <span>Loading Data</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Marquee() {
  return (
    <div className="py-10 md:py-16 overflow-hidden bg-white border-y border-black/[0.03] relative z-10">
      <div className="flex whitespace-nowrap">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-24 px-12"
          >
            <span className="font-sans text-3xl md:text-5xl font-black uppercase tracking-[-0.05em] text-black/[0.04]">Future Systems</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/[0.04]" />
            <span className="font-sans text-3xl md:text-5xl font-black uppercase tracking-[-0.05em] text-black/[0.04]">Computational IP</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/[0.04]" />
            <span className="font-sans text-3xl md:text-5xl font-black uppercase tracking-[-0.05em] text-black/[0.04]">Design Engineering</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/[0.04]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Vision', id: 'vision' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 px-6 md:px-12 py-8`}>
      <div 
        ref={headerRef}
        className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 ${isScrolled ? 'bg-white/98 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.01] p-4 md:p-5 rounded-full' : 'p-4 md:p-5'}`}
      >
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-2xl shadow-black/20"
          >
            <span className="text-white font-black text-lg tracking-tighter">T</span>
          </motion.div>
          <span className="font-sans text-xl font-black tracking-[-0.06em] text-black uppercase">T'Z Studio</span>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <motion.a 
              key={item.name} 
              href={`#${item.id}`} 
              whileHover={{ y: -2 }}
              className="text-[11px] font-black uppercase tracking-[0.25em] text-black/80 hover:text-black transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-black/20"
          >
            Connect
          </motion.a>
        </nav>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 bg-black/[0.05] rounded-full"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[999] p-12 flex flex-col justify-center items-center gap-10"
          >
            {['Vision', 'Services', 'Projects', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="font-sans text-5xl font-black tracking-tight text-black hover:scale-110 transition-all"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Removed BackgroundManager and HUD as requested for a cleaner, white-based aesthetic.

function Hero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={container} className="relative h-[120vh] flex items-center justify-center bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 text-center max-w-7xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <span className="text-[12px] font-black text-black uppercase tracking-[0.5em] border-l-2 border-black pl-6">Design & Engineering Lab</span>
          </motion.div>
          
          <h1 className="font-sans text-[16vw] md:text-[clamp(4rem,10vw,12rem)] font-black leading-[0.85] tracking-[-0.08em] text-black uppercase">
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Building <br />
              Intelligent <br />
              Systems.
            </motion.div>
          </h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="mt-24 flex flex-col items-center gap-12"
          >
            <p className="text-2xl md:text-4xl font-black text-black/80 max-w-5xl leading-[1.2] tracking-tight uppercase">
              For Human Potential. <br />
              <span className="text-black/40 text-xl md:text-2xl mt-8 block normal-case font-medium">
                教育、AI設計、IPブランディングを通じて<br />
                持続可能な成長構造を設計します。
              </span>
            </p>
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full border border-black/[0.08] flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black/60 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="py-32 md:py-64 px-6 md:px-12 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 bg-white rounded-[5rem] p-12 md:p-24 border-2 border-black/[0.05] shadow-[0_60px_150px_rgba(0,0,0,0.04)] relative overflow-hidden group"
          >
            <div className="relative z-10 space-y-20">
              <span className="text-[12px] font-black text-black uppercase tracking-[0.6em] border-l-4 border-black pl-6">01. PHILOSOPHY</span>
              <h2 className="font-sans text-6xl md:text-8xl lg:text-[clamp(4rem,6.5vw,8rem)] font-black leading-[0.85] tracking-[-0.08em] text-black uppercase">
                Designing <br />
                Systems <br />
                <span className="text-black/[0.1]">For Human</span> <br />
                Growth.
              </h2>
              <p className="text-2xl md:text-4xl font-black text-black max-w-4xl tracking-tight leading-[1.2] uppercase">
                教育、AI、IP設計を通じて、<br />
                人とアイデアが持続的に成長する構造をつくる。
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-white rounded-[4rem] p-12 md:p-16 border-2 border-black/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative flex flex-col justify-center overflow-hidden group"
            >
              <span className="absolute top-12 left-12 text-[11px] font-black text-black uppercase tracking-[0.6em]">APPROACH</span>
              <div className="relative z-10">
                <p className="text-xl md:text-[clamp(1.2rem,1.8vw,1.8rem)] font-black text-black tracking-tighter leading-[1.2] uppercase">
                  構造を設計し、<br />
                  人の可能性を最大化する。
                </p>
              </div>
              <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-black/[0.02] pointer-events-none">A</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 bg-black text-white rounded-[4rem] p-12 md:p-16 relative flex flex-col justify-center overflow-hidden shadow-2xl shadow-black/40 group"
            >
              <span className="absolute top-12 left-12 text-[11px] font-black text-white/60 uppercase tracking-[0.6em]">FOCUS</span>
              <div className="relative z-10 space-y-4">
                <p className="text-2xl md:text-[clamp(1.2rem,1.8vw,2rem)] font-black tracking-[-0.05em] leading-none uppercase hover:translate-x-2 transition-transform duration-500 cursor-default whitespace-nowrap">Education</p>
                <p className="text-2xl md:text-[clamp(1.2rem,1.8vw,2rem)] font-black tracking-[-0.05em] leading-none uppercase hover:translate-x-2 transition-transform duration-500 cursor-default whitespace-nowrap">AI Systems</p>
                <p className="text-2xl md:text-[clamp(1.2rem,1.8vw,2rem)] font-black tracking-[-0.05em] leading-none uppercase hover:translate-x-2 transition-transform duration-500 cursor-default whitespace-nowrap">IP Development</p>
              </div>
              <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-white/[0.03] pointer-events-none">F</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    id: "education",
    title: "Education Design",
    desc: "教育設計 / 英語指導 / 思考トレーニング。オンライン・対面レッスン、集団・マンツーマン対応。",
    detail: {
      title: "EDUCATION DESIGN",
      subtitle: "言語と思考の構造を設計する",
      description: "英語指導を単なる知識伝達ではなく、目標達成のための「構造設計」として捉えています。学習習慣の形成から成果達成まで、一人ひとりに最適な成長プロセスを設計します。",
      experienceTitle: "教育領域における実践経験",
      experienceDesc: "T'Z Studioの教育設計は、多様な教育現場での実践を基盤としています。",
      experiences: [
        "公文式教室 英語講師 / 教室運営",
        "RIZAP ENGLISH 正社員トレーナー",
        "武田塾 校舎長",
        "都内私立高校 英検対策指導",
        "中高一貫校 ESS活動顧問",
        "社会人向けマンツーマン指導"
      ],
      closing: "幼少期教育から受験、社会人教育まで、幅広い層への指導経験を通じて培われた設計思想が核となっています。教育は、才能を伸ばすための“環境設計”であると考えています。"
    }
  },
  {
    id: "production",
    title: "Production",
    desc: "写真撮影・画像編集・Virtual Staging。AI活用によるコンテンツ制作。ブランド世界観を実装レベルで構築。"
  },
  {
    id: "branding",
    title: "IP Branding",
    desc: "IP企画・設計、世界観構築、YouTube / デジタル展開設計、長期運営戦略。"
  }
];

function Services({ onServiceClick }: { onServiceClick: (service: any) => void }) {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[12px] font-black text-black mb-6 block uppercase tracking-[0.6em] border-l-4 border-black pl-6">02. CAPABILITIES</span>
            <h2 className="font-sans text-7xl md:text-[8vw] font-black tracking-[-0.1em] text-black uppercase leading-none">Services.</h2>
          </motion.div>
          <div className="max-w-xl">
            <p className="text-black font-black text-xl md:text-2xl leading-[1.3] tracking-tight uppercase">
              We engineer specialized <br /> computational design solutions <br /> for the next digital era.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onServiceClick(s)}
              className="group relative bg-white p-10 md:p-12 rounded-[3rem] border-2 border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.02)] cursor-pointer overflow-hidden transition-all duration-700 hover:border-black hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)]"
            >
              <div className="relative z-20 space-y-10 transition-colors duration-700 group-hover:text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black text-black/60 group-hover:text-white/60 uppercase tracking-[0.5em]">S-{i + 101}</span>
                  <div className="w-12 h-12 rounded-full border-2 border-black/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <ArrowUpRight size={20} className="text-black group-hover:text-black group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-black tracking-[-0.08em] uppercase leading-tight">
                  {s.title}
                </h3>
                
                <p className="leading-relaxed text-base font-black tracking-tight uppercase opacity-90">
                  {s.desc}
                </p>
              </div>
              
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
              
              <span className="absolute -bottom-4 -right-4 text-[8rem] font-black text-black/[0.02] group-hover:text-white/[0.04] transition-colors duration-700 leading-none pointer-events-none">
                {i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    name: "Experimental IP",
    type: "Digital IP Brand",
    image: "https://picsum.photos/seed/kittens/1200/800"
  },
  {
    name: "AI Publishing System",
    type: "Research & Dev",
    image: "https://picsum.photos/seed/ailab/1200/800"
  },
  {
    name: "Education Framework",
    type: "Concept Design",
    image: "https://picsum.photos/seed/future/1200/800"
  }
];

function Projects() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-24 md:py-32 bg-white overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[12px] font-black text-black uppercase tracking-[0.6em] border-l-4 border-black pl-6 mb-6 block">03. THE ARCHIVE</span>
          <h2 className="font-sans text-7xl md:text-[8vw] font-black tracking-[-0.1em] text-black uppercase leading-none">Projects.</h2>
        </motion.div>
      </div>
      
      <div className="relative" ref={constraintsRef}>
        <motion.div 
          drag="x"
          dragConstraints={constraintsRef}
          className="flex gap-8 px-6 md:px-12 cursor-grab active:cursor-grabbing w-fit"
        >
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              className="flex-shrink-0 w-[85vw] md:w-[40vw] group flex flex-col gap-6"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[16/10] bg-white border-2 border-black/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.03)] transition-all duration-700 group-hover:border-black">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                  <div className="bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] px-8 py-4 rounded-full shadow-2xl">
                    View Project
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 px-4">
                <span className="text-[10px] font-black text-black/60 uppercase tracking-[0.5em]">{p.type}</span>
                <div className="flex justify-between items-center">
                  <h3 className="font-sans text-2xl md:text-3xl font-black tracking-[-0.08em] text-black uppercase">
                    {p.name}
                  </h3>
                  <div className="w-12 h-12 rounded-full border-2 border-black/10 flex items-center justify-center group-hover:bg-black transition-all duration-500">
                    <ArrowUpRight size={18} className="text-black group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 flex items-center gap-4 text-black/40">
          <div className="w-10 h-0.5 bg-black/10" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Drag to explore</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-32 md:py-64 px-6 md:px-12 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] font-black text-black/60 uppercase tracking-[0.6em]"
          >
            04. THE STUDIO
          </motion.span>
          <h2 className="font-sans text-8xl md:text-[clamp(4rem,12vw,14rem)] font-black tracking-[-0.08em] text-black uppercase leading-[0.75]">
            The <br />
            <span className="text-black/[0.08]">Studio.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <p className="text-3xl md:text-5xl font-black leading-[1.3] text-black tracking-tight">
              T'Z Studioは、<br />
              検証し、改善し続けます。
            </p>
            <p className="text-xl md:text-2xl font-black text-black/60 leading-relaxed uppercase">
              教育、AI、IP。<br />
              異なる領域を横断しながら、<br />
              成長構造そのものを設計します。
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-10 rounded-[3rem] bg-white border border-black/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] font-black text-black/60 mb-4 block uppercase tracking-[0.4em]">FOUNDER</span>
              <p className="text-2xl font-black text-black tracking-[-0.06em] uppercase">Masashi Takano</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white border border-black/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] font-black text-black/60 mb-4 block uppercase tracking-[0.4em]">STRATEGY DIRECTOR</span>
              <p className="text-2xl font-black text-black tracking-[-0.06em] uppercase">Koz</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white border border-black/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] font-black text-black/60 mb-4 block uppercase tracking-[0.4em]">CREATIVE DIRECTOR</span>
              <p className="text-2xl font-black text-black tracking-[-0.06em] uppercase">Karen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-32 md:py-64 px-6 md:px-12 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-black/[0.01] shadow-[0_50px_150px_rgba(0,0,0,0.05)] p-12 md:p-32 rounded-[5rem] relative overflow-hidden">
          <div className="flex flex-col gap-20">
            <div className="space-y-8">
              <span className="text-[11px] font-black text-black/60 uppercase tracking-[0.6em]">05. CONNECT</span>
              <h2 className="font-sans text-7xl md:text-9xl font-black tracking-[-0.08em] leading-[0.8] text-black uppercase">
                Contact.
              </h2>
            </div>

            <div className="max-w-4xl w-full">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20">
                  <p className="text-6xl font-black tracking-[-0.08em] mb-6 text-black uppercase">Thank you.</p>
                  <p className="text-black/80 font-black text-3xl tracking-tight uppercase">We will respond shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                  <div className="relative group">
                    <input type="text" required className="w-full bg-black/[0.02] border-b-2 border-black/10 p-8 text-2xl font-black text-black focus:outline-none focus:border-black transition-all placeholder:text-black/40 tracking-tight uppercase" id="name" placeholder="Your Name" />
                  </div>
                  <div className="relative group">
                    <input type="email" required className="w-full bg-black/[0.02] border-b-2 border-black/10 p-8 text-2xl font-black text-black focus:outline-none focus:border-black transition-all placeholder:text-black/40 tracking-tight uppercase" id="email" placeholder="Email Address" />
                  </div>
                  <div className="relative group">
                    <textarea required rows={3} className="w-full bg-black/[0.02] border-b-2 border-black/10 p-8 text-2xl font-black text-black focus:outline-none focus:border-black transition-all placeholder:text-black/40 resize-none tracking-tight uppercase" id="message" placeholder="Your Message" />
                  </div>
                  <button 
                    disabled={status === 'submitting'} 
                    type="submit" 
                    className="group self-start flex items-center gap-10 bg-black text-white px-16 py-8 rounded-full hover:scale-105 transition-all disabled:opacity-50 shadow-2xl shadow-black/40"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">{status === 'submitting' ? 'Processing...' : 'Send Message'}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 relative overflow-hidden bg-white border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="font-sans text-2xl font-black tracking-tighter text-black">T'Z Studio</div>
        <div className="flex gap-10">
          <a href="#" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">Instagram</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">Twitter</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">LinkedIn</a>
        </div>
        <div className="text-xs font-black text-black/20 uppercase tracking-widest">
          © 2024 T'Z Studio.
        </div>
      </div>
    </footer>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('a, button, .group'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-black pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-center mix-blend-difference ${isHovered ? 'scale-[2.5] bg-white border-white' : 'scale-100'}`}
    >
      <div className={`w-1 h-1 bg-white rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}

function ServiceDetail({ service, onClose }: { service: any, onClose: () => void }) {
  if (!service || !service.detail) return null;
  const d = service.detail;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[10001] bg-white overflow-y-auto p-6 md:p-12"
    >
      <div className="max-w-7xl mx-auto relative">
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 md:top-12 md:right-12 z-[10002] w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X size={32} />
        </button>

        <div className="pt-24 md:pt-32 space-y-24 pb-32">
          <div className="space-y-8">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[12px] font-black text-black uppercase tracking-[0.6em] border-l-4 border-black pl-6 block"
            >
              SERVICE DETAIL
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-6xl md:text-9xl font-black tracking-[-0.08em] text-black uppercase leading-[0.85]"
            >
              {d.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-black text-black/40 uppercase tracking-tight"
            >
              {d.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              <p className="text-2xl md:text-3xl font-black leading-relaxed text-black">
                {d.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12 bg-black/[0.02] p-12 rounded-[4rem] border border-black/[0.05]"
            >
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black/60 border-b border-black/10 pb-4">
                  {d.experienceTitle}
                </h3>
                <p className="text-lg font-black text-black/80">
                  {d.experienceDesc}
                </p>
                <ul className="space-y-6">
                  {d.experiences.map((exp: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-xl font-black text-black uppercase tracking-tight">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                      {exp}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-lg font-black text-black/60 leading-relaxed italic border-t border-black/5 pt-8">
                {d.closing}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedService]);

  return (
    <div className="relative bg-white selection:bg-black selection:text-white font-sans overflow-x-hidden">
      <CustomCursor />
      
      {/* Premium Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] grain mix-blend-multiply" />
      
      <Preloader />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[2000] bg-black"
        style={{ scaleX }}
      />
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <Vision />
        <Marquee />
        <Services onServiceClick={setSelectedService} />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetail 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
