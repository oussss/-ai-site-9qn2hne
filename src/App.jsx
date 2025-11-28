import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowRight, Zap, Box, Code, Menu, X, Globe, MoveUpRight, Eye } from 'lucide-react';

// --- Components ---

const Button = ({ children, secondary, className, onClick }) => (
  <motion.button
    whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0px 0px #000' }}
    whileTap={{ x: 2, y: 2, boxShadow: '0px 0px 0px 0px #000' }}
    onClick={onClick}
    className={`
      px-6 py-3 font-display font-bold text-sm md:text-lg uppercase tracking-wider border-2 border-brand-black transition-all duration-200
      ${secondary ? 'bg-brand-black text-brand-yellow shadow-neo' : 'bg-brand-yellow text-brand-black shadow-neo'}
      ${className}
    `}
  >
    {children}
  </motion.button>
);

const Section = ({ children, className, id }) => (
  <section id={id} className={`px-4 py-20 md:px-12 md:py-32 border-b-4 border-brand-black ${className}`}>
    {children}
  </section>
);

const Marquee = ({ text, reverse }) => (
  <div className="relative flex overflow-hidden py-6 bg-brand-black text-brand-yellow border-y-4 border-brand-black">
    <div className={`animate-marquee whitespace-nowrap flex gap-8 ${reverse ? 'flex-row-reverse' : ''}`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">
          {text} •
        </span>
      ))}
    </div>
    <div className={`absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 ${reverse ? 'flex-row-reverse' : ''}`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">
          {text} •
        </span>
      ))}
    </div>
  </div>
);

const Card = ({ title, description, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group bg-brand-white border-4 border-brand-black p-6 shadow-neo-lg hover:shadow-neo-xl transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-2 bg-brand-black text-brand-yellow border-l-4 border-b-4 border-brand-black">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-display font-bold mb-4 uppercase">{title}</h3>
    <p className="font-body text-sm md:text-base leading-relaxed mb-6">{description}</p>
    <div className="w-full h-4 bg-brand-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </motion.div>
);

const ProjectCard = ({ title, desc, tag, i }) => (
  <motion.div
    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative bg-brand-black text-brand-white p-1 border-4 border-brand-black shadow-neo-lg hover:scale-[1.02] transition-transform duration-300"
  >
    <div className="bg-brand-yellow h-48 md:h-64 border-2 border-brand-white flex items-center justify-center overflow-hidden relative group">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
       <h4 className="text-brand-black font-display font-black text-4xl uppercase opacity-20 group-hover:opacity-100 transition-opacity duration-300 rotate-[-10deg]">{tag}</h4>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl md:text-2xl font-display font-bold uppercase text-brand-yellow">{title}</h3>
        <MoveUpRight className="text-brand-yellow" />
      </div>
      <p className="font-body text-sm text-gray-300 mb-4">{desc}</p>
      <div className="inline-block px-3 py-1 bg-brand-white text-brand-black font-bold font-body text-xs uppercase border border-brand-white">
        {tag}
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const navLinks = ["Home", "Services", "Work", "About", "Contact"];

  return (
    <div ref={containerRef} className="bg-brand-yellow min-h-screen text-brand-black selection:bg-black selection:text-brand-yellow overflow-x-hidden">
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-brand-black origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-normal border-b-4 border-brand-black bg-brand-yellow/95 backdrop-blur-sm">
        <div className="font-display font-black text-2xl md:text-3xl tracking-tighter uppercase">
          Pixel<span className="text-brand-white stroke-text">_&_</span>Co
        </div>
        
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-body font-bold text-lg uppercase hover:underline decoration-4 underline-offset-4 decoration-brand-black">
              {link}
            </a>
          ))}
        </div>

        <button 
          className="md:hidden p-2 border-2 border-brand-black bg-brand-black text-brand-yellow shadow-neo active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          className="fixed inset-0 z-40 bg-brand-yellow border-l-4 border-brand-black flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`} 
              onClick={() => setMenuOpen(false)}
              className="font-display font-black text-4xl uppercase stroke-text hover:text-brand-black transition-colors"
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}

      {/* Hero Section */}
      <Section id="home" className="min-h-screen flex flex-col justify-center items-start pt-32 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="max-w-7xl mx-auto w-full"
        >
          <h1 className="font-display font-black text-6xl md:text-9xl leading-[0.85] mb-8 tracking-tighter">
            SMASH <br/> THE <span className="text-brand-white stroke-text">ORDINARY.</span>
          </h1>
          <p className="font-body text-lg md:text-2xl max-w-2xl mb-12 font-bold border-l-4 border-brand-black pl-6">
            We craft raw, high-contrast digital worlds for tech startups and e-commerce rebels.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button onClick={() => window.location.href='#contact'}>Ignite Vision</Button>
            <Button secondary onClick={() => window.location.href='#work'}>View Chaos</Button>
          </div>
        </motion.div>
      </Section>

      <Marquee text="BOLD • RAW • UNFILTERED • DISRUPT • DOMINATE" />

      {/* About Section */}
      <Section id="about" className="bg-brand-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-black translate-x-4 translate-y-4 border-4 border-brand-black"></div>
            <div className="relative bg-brand-yellow border-4 border-brand-black p-8 md:p-12">
              <h2 className="font-display font-black text-4xl md:text-6xl mb-6 uppercase leading-none">
                Born in <br/> Chaos
              </h2>
              <p className="font-body text-sm md:text-base font-medium leading-relaxed">
                Pixel & Co isn't your average agency. We started as a rebellion against bland digital drudgery. 
                We deliver unapologetic digital firepower for brands ready to dominate.
              </p>
            </div>
          </div>
          <div>
             <ul className="space-y-6">
               {[
                 "Raw neobrutalist aesthetics",
                 "Immersive animations (3x engagement)",
                 "Tailored strategies for rebels",
                 "Directness: No fluff, just results"
               ].map((item, i) => (
                 <motion.li 
                   key={i}
                   initial={{ opacity: 0, x: 50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="flex items-center gap-4 font-display font-bold text-lg md:text-xl uppercase"
                 >
                   <div className="w-4 h-4 bg-brand-black shrink-0" />
                   {item}
                 </motion.li>
               ))}
             </ul>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services" className="bg-brand-yellow">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase leading-none">Our <span className="bg-brand-black text-brand-white px-2">Arsenal</span></h2>
            <p className="font-body font-bold mt-4 md:mt-0">Tools to conquer the online arena.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              title="Bold Branding"
              description="High-contrast logos and identities that scream authenticity. Built for startups ready to disrupt."
              icon={Eye}
              delay={0.1}
            />
            <Card 
              title="Web Design"
              description="Immersive layouts with glitch effects and bold typography. Optimized for conversion and scalability."
              icon={Box}
              delay={0.2}
            />
            <Card 
              title="Motion Graphics"
              description="Explosive animations that bring your vision to life. Looping hero videos and interactive elements."
              icon={Zap}
              delay={0.3}
            />
          </div>
        </div>
      </Section>

      <Marquee text="GLITCH • MOTION • CHAOS • IMPACT • SPEED" reverse />

      {/* Portfolio Section */}
      <Section id="work" className="bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase mb-16 text-center">Disruptive <br/> Wins</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { t: "TechForge", d: "150% traffic surge with brutal contrasts.", tag: "Branding" },
              { t: "EcomRush", d: "40% conversion uplift via glitch UI.", tag: "Commerce" },
              { t: "InnoWave", d: "300% download spike with raw motion.", tag: "App" },
              { t: "ViralVault", d: "Boosted retention by 60%.", tag: "Fintech" },
              { t: "PulseGear", d: "200% sales growth in launch month.", tag: "Web" },
            ].map((p, i) => (
              <ProjectCard key={i} title={p.t} desc={p.d} tag={p.tag} i={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-brand-black text-brand-yellow">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display font-black text-5xl md:text-8xl mb-8 uppercase">Ready to Break <br/> The Mold?</h2>
          <p className="font-body text-xl mb-12 max-w-2xl mx-auto text-gray-400">Whether it's a wild idea or a full-scale digital takeover, let's make your brand impossible to ignore.</p>
          
          <form className="max-w-2xl mx-auto space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group relative">
                <input type="text" placeholder="NAME" className="w-full bg-brand-black border-4 border-brand-yellow p-4 text-brand-white placeholder-brand-yellow/50 font-body outline-none focus:shadow-[8px_8px_0px_0px_#FFD60A] transition-shadow" />
              </div>
              <div className="group relative">
                <input type="email" placeholder="EMAIL" className="w-full bg-brand-black border-4 border-brand-yellow p-4 text-brand-white placeholder-brand-yellow/50 font-body outline-none focus:shadow-[8px_8px_0px_0px_#FFD60A] transition-shadow" />
              </div>
            </div>
            <textarea rows="4" placeholder="YOUR REBELLIOUS IDEA" className="w-full bg-brand-black border-4 border-brand-yellow p-4 text-brand-white placeholder-brand-yellow/50 font-body outline-none focus:shadow-[8px_8px_0px_0px_#FFD60A] transition-shadow" />
            <button type="button" className="w-full bg-brand-yellow text-brand-black font-display font-black text-2xl uppercase py-6 border-4 border-transparent hover:bg-brand-white hover:border-brand-yellow transition-all shadow-[8px_8px_0px_0px_#FFFFFF] hover:shadow-none hover:translate-x-2 hover:translate-y-2">
              Fire Away — Start Chaos
            </button>
          </form>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-brand-yellow border-t-4 border-brand-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display font-black text-2xl uppercase">
            Pixel & Co © 2024
          </div>
          <div className="flex gap-6">
            {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map(social => (
              <a key={social} href="#" className="font-body font-bold uppercase hover:bg-brand-black hover:text-brand-yellow px-2 transition-colors">
                {social}
              </a>
            ))}
          </div>
          <div className="font-body font-bold text-sm">
            San Francisco // Silicon Valley
          </div>
        </div>
      </footer>

    </div>
  );
}