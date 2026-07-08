import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Flame,
  UserCheck,
  Percent,
  Menu,
  X,
  Calendar
} from 'lucide-react';
import { 
  BENEFITS, 
  CHAPTERS, 
  BONUSES, 
  PLANS, 
  TESTIMONIALS, 
  FAQS, 
  GALLERY_IMAGES, 
  Plan 
} from './data/landingData';
import CheckoutModal from './components/CheckoutModal';
import ClientPortal from './components/ClientPortal';
import Toast from './components/Toast';
import heroMealPrep from './assets/images/hero_meal_prep_1783385436603.jpg';

export default function App() {
  // Authentication & State
  const [purchasedPlan, setPurchasedPlan] = useState<'none' | 'plan_base' | 'plan_completo'>(() => {
    const saved = localStorage.getItem('purchased_plan');
    return (saved as 'none' | 'plan_base' | 'plan_completo') || 'none';
  });
  const [userName, setUserName] = useState(() => localStorage.getItem('student_name') || '');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('student_email') || '');
  const [isClientAreaOpen, setIsClientAreaOpen] = useState(() => {
    return localStorage.getItem('purchased_plan') ? true : false;
  });

  // Modal & Selection state
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<Plan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Quick Login popup (for reviewers)
  const [showReviewerLogin, setShowReviewerLogin] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
  };

  const handleCheckoutClick = (plan: Plan) => {
    if (plan.checkoutUrl) {
      window.open(plan.checkoutUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedPlanForCheckout(plan);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = (name: string, email: string) => {
    if (!selectedPlanForCheckout) return;
    
    const planType = selectedPlanForCheckout.id as 'plan_base' | 'plan_completo';
    setPurchasedPlan(planType);
    setUserName(name);
    setUserEmail(email);
    
    localStorage.setItem('purchased_plan', planType);
    localStorage.setItem('student_name', name);
    localStorage.setItem('student_email', email);
    
    setIsCheckoutOpen(false);
    setIsClientAreaOpen(true);
    showToast(`¡Pago procesado con éxito! Bienvenido, ${name}.`);
  };

  const handleLogout = () => {
    setPurchasedPlan('none');
    setUserName('');
    setUserEmail('');
    localStorage.removeItem('purchased_plan');
    localStorage.removeItem('student_name');
    localStorage.removeItem('student_email');
    setIsClientAreaOpen(false);
    showToast('Sesión cerrada correctamente. Volviendo a la página de ventas.');
  };

  const handleReviewerQuickAccess = (planType: 'plan_base' | 'plan_completo') => {
    const name = planType === 'plan_completo' ? 'Evaluador Premium' : 'Evaluador Esencial';
    const email = 'revisor@aistudio.com';
    setPurchasedPlan(planType);
    setUserName(name);
    setUserEmail(email);
    localStorage.setItem('purchased_plan', planType);
    localStorage.setItem('student_name', name);
    localStorage.setItem('student_email', email);
    setIsClientAreaOpen(true);
    setShowReviewerLogin(false);
    showToast(`Acceso directo como Alumno (${planType === 'plan_completo' ? 'Plan Completo' : 'Plan Base'}).`);
  };

  // Helper component to render Titles with italic formatting
  const renderFormattedTitle = (text: string, className = "text-brand-text") => {
    // Regex matches text inside [brackets]
    const parts = text.split(/\[(.*?)\]/g);
    return (
      <span className={className}>
        {parts.map((part, index) => {
          // Odd indexes are inside brackets
          if (index % 2 === 1) {
            return (
              <span key={index} className="font-display italic text-brand-gold font-normal">
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  };

  // Switch between Landing Page and Client Portal
  if (isClientAreaOpen) {
    return (
      <>
        <ClientPortal 
          userName={userName}
          userEmail={userEmail}
          userPlan={purchasedPlan === 'none' ? 'plan_completo' : purchasedPlan}
          onLogout={handleLogout}
          onShowToast={showToast}
        />
        <Toast 
          message={toastMessage} 
          isVisible={isToastVisible} 
          onClose={() => setIsToastVisible(false)} 
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-brand-base flex flex-col selection:bg-brand-gold selection:text-white" id="main-landing">
      
      {/* 1. STICKY TOP BAR */}
      <div className="sticky top-0 z-40 bg-brand-green h-[38px] flex items-center justify-center text-white text-[11px] font-sans font-semibold uppercase tracking-wider px-4 shadow-sm border-b border-brand-gold/10">
        <div className="overflow-hidden whitespace-nowrap text-center text-[10px] md:text-[11px]">
          EDICIÓN LIMITADA · OFERTA VÁLIDA HOY · ACCESO VITALICIO · +100 RECETAS · GARANTÍA 15 DÍAS
        </div>
      </div>

      {/* Landing Header */}
      <nav className="bg-brand-base py-5 px-6 md:px-12 flex justify-between items-center max-w-7xl w-full mx-auto border-b border-brand-gold/10">
        <div className="flex items-center gap-2">
          <span className="font-display italic text-brand-gold text-2xl font-bold">Cocina</span>
          <span className="font-sans font-bold tracking-wider text-base uppercase text-brand-text">Inteligente</span>
        </div>
      </nav>

      {/* SECTION 1 — HERO */}
      <section className="bg-brand-base py-12 md:py-20 px-6 md:px-12 max-w-7xl w-full mx-auto" id="hero-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Title */}
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-[68px] leading-[1.08] text-brand-text tracking-tight">
              {renderFormattedTitle("¿Llegas cansada [sin saber] qué cocinar esta noche?")}
            </h1>

            {/* Description */}
            <p className="font-sans text-brand-soft text-base md:text-lg max-w-[540px] leading-relaxed">
              Descubre el método de cocina inteligente y batch cooking que te permitirá dejar listas <strong>+100 recetas deliciosas y congelables</strong> en solo 2 horas el fin de semana. Recupera tu tiempo libre y come espectacular todos los días.
            </p>

            {/* CTA & Pricing Area */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#precios-section"
                  className="inline-flex justify-center items-center gap-2 bg-brand-green hover:bg-brand-green/95 text-white font-sans font-bold text-sm tracking-wider uppercase px-8 py-4 rounded transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-150"
                  id="hero-cta"
                >
                  QUIERO LAS RECETAS <ArrowRight className="w-4 h-4 text-brand-gold" />
                </a>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-brand-soft line-through">PRECIO NORMAL: $49.90 USD</span>
                  <span className="text-sm text-brand-text font-bold">
                    Desde <span className="text-xl text-brand-green font-mono font-extrabold">$3.90 USD</span> pago único
                  </span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-brand-soft text-[11px] font-medium pt-3 border-t border-brand-gold/15">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  🔒 COMPRA SEGURA
                </span>
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  🛡️ GARANTÍA 15 DÍAS
                </span>
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  ♾️ ACCESO VITALICIO
                </span>
              </div>
            </div>
          </div>

          {/* Hero Right Image & Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square md:max-w-md mx-auto overflow-hidden rounded bg-brand-gold/5 border border-brand-gold/10 shadow-lg">
              <img 
                src={heroMealPrep} 
                alt="Mujer organizando contenedores de vidrio con comida fresca y saludable en una cocina iluminada" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Floating circular badge */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-brand-gold text-white font-display font-bold flex flex-col items-center justify-center rounded-full shadow-lg border border-white/10 rotate-12 shrink-0">
                <span className="text-xs tracking-wider uppercase font-sans">MÉTODO</span>
                <span className="text-lg leading-tight">100+</span>
                <span className="text-[10px] tracking-wide font-sans uppercase">Recetas</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — BENEFICIOS */}
      <section className="bg-brand-base border-t border-brand-gold/15 py-16 md:py-24 px-6 md:px-12" id="beneficios-section">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          
          {/* Header */}
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight text-brand-text max-w-3xl text-left">
            {renderFormattedTitle("Una cocina que [trabaja] a tu favor — no en tu contra.")}
          </h2>

          {/* Grid Beneficios (fiel al modelo visual sin íconos, solo tipografía) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {BENEFITS.map((benefit) => (
              <div 
                key={benefit.id} 
                className="space-y-3 pb-6 border-b border-brand-gold/15 hover:border-brand-gold/45 transition-colors duration-200"
              >
                <span className="font-mono text-sm font-bold tracking-widest text-brand-gold block">
                  {benefit.number}
                </span>
                <h4 className="font-sans font-bold text-lg text-brand-text">
                  {benefit.title}
                </h4>
                <p className="font-sans text-brand-soft text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Centered CTA */}
          <div className="text-center pt-10">
            <a 
              href="#precios-section" 
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/95 text-white font-sans font-bold text-xs tracking-wider uppercase px-8 py-4 rounded transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-150"
            >
              VER PLANES Y OFERTAS DISPONIBLES <ArrowRight className="w-4 h-4 text-brand-gold" />
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 3 — UVP / MÉTODO (Sección Verde Oscura) */}
      <section className="bg-brand-green text-white py-16 md:py-24 px-6 md:px-12" id="metodo-section">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Gallery 2x2 of realistic meal prep, sharp layout */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3" id="uvp-gallery-container">
            {[
              { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=350&h=350&q=80', alt: 'Ensalada fresca y colorida para meal prep' },
              { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=350&h=350&q=80', alt: 'Bowl vegetariano balanceado en porciones' },
              { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=350&h=350&q=80', alt: 'Contenedores organizados de comida saludable' },
              { url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=350&h=350&q=80', alt: 'Salmón glaseado con brócoli' }
            ].map((img, idx) => (
              <div key={idx} className="aspect-square bg-white/5 overflow-hidden rounded shadow">
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>

          {/* Right: Method Description */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">
              {renderFormattedTitle("Congelar no es renunciar al [sabor].", "text-white")}
            </h2>
            
            <p className="font-sans text-white/80 text-base leading-relaxed max-w-xl">
              Nuestra metodología rompe con el mito de que la comida guardada pierde gracia. Con técnicas específicas de enfriamiento express y blanqueado vegetal, bloqueamos las propiedades para que disfrutes platos crujientes y aromáticos.
            </p>

            {/* List 01-06 rules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
              {[
                { n: '01', t: 'Blanqueado de Vegetales', d: 'Fija el color clorofila y la firmeza.' },
                { n: '02', t: 'Contenedores de Vidrio Templado', d: 'Seguridad térmica de -20°C a 200°C.' },
                { n: '03', t: 'Etiquetado Inteligente', d: 'Evita misterios en el freezer.' },
                { n: '04', t: 'Enfriamiento Rápido', d: 'Previene bacterias y humedad excedente.' },
                { n: '05', t: 'Rotación Sistemática', d: 'Menús dinámicos siempre frescos.' },
                { n: '06', t: 'Porciones Individuales', d: 'Descongela solo lo que vas a comer.' }
              ].map((item, i) => (
                <div key={i} className="py-2.5 border-b border-white/10 flex gap-3">
                  <span className="font-mono font-bold text-brand-gold shrink-0">{item.n}</span>
                  <div>
                    <span className="font-semibold text-white block">{item.t}</span>
                    <span className="text-[11px] text-white/60">{item.d}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Outline CTA */}
            <div className="pt-4">
              <a 
                href="#precios-section" 
                className="inline-block py-3.5 px-8 border-[1.5px] border-white text-white hover:bg-white hover:text-brand-green font-sans font-bold text-xs tracking-wider uppercase transition-all rounded"
              >
                QUIERO MI EJEMPLAR →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4 — ENTREGABLES / CAPÍTULOS */}
      <section className="bg-brand-base py-16 md:py-24 px-6 md:px-12" id="capitulos-section">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          
          {/* Header 2 columns layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-4 border-b border-brand-gold/15">
            <div className="lg:col-span-7">
              <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-text leading-tight">
                {renderFormattedTitle("Lo que incluye [el sistema].")}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-xs md:text-sm text-brand-soft leading-relaxed">
                Un manual exhaustivo de cocina práctica y organizada diseñado para resolver la alimentación diaria. Desde los fundamentos químicos del frío hasta listas dinámicas preparadas para la acción.
              </p>
            </div>
          </div>

          {/* Grid Chapters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CHAPTERS.map((chap) => (
              <div 
                key={chap.id} 
                className="pt-6 border-t border-brand-gold/25 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-brand-gold block">
                    {chap.numLabel}
                  </span>
                  <h4 className="font-display font-semibold text-xl text-brand-text leading-tight">
                    {chap.title}
                  </h4>
                  <span className="block text-[9px] font-sans font-bold tracking-wider text-brand-soft uppercase">
                    {chap.subtitle}
                  </span>
                  <p className="font-sans text-brand-soft text-xs leading-relaxed pt-1">
                    {chap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered CTA */}
          <div className="text-center pt-10">
            <a 
              href="#precios-section" 
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/95 text-white font-sans font-bold text-xs tracking-wider uppercase px-8 py-4 rounded transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-150"
            >
              ADQUIRIR EL SISTEMA COMPLETO <ArrowRight className="w-4 h-4 text-brand-gold" />
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 5 — GALERÍA DE FOTOS (12 fotos, a sangre, gap 4px, cuadradas, sin radius) */}
      <section className="bg-brand-base border-t border-brand-gold/15 py-12 px-4 md:px-12" id="galeria-section">
        <div className="max-w-7xl w-full mx-auto space-y-6">
          
          {/* Gallery Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="font-display font-bold text-2xl text-brand-text">
              {renderFormattedTitle("Un adelanto de lo que [vas a preparar].")}
            </h3>
            <span className="text-[11px] font-sans font-semibold text-brand-soft uppercase tracking-widest shrink-0">
              GALERÍA · 12 DESTACADOS
            </span>
          </div>

          {/* Masonry / uniform grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
            {GALLERY_IMAGES.map((img, idx) => (
              <div 
                key={idx} 
                className="aspect-square relative group overflow-hidden bg-brand-gold/5"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                {/* Subtle dark overlay hover */}
                <div className="absolute inset-0 bg-brand-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-white font-bold leading-snug">
                    {img.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6 — BONOS */}
      <section className="bg-brand-base border-t border-brand-gold/15 py-16 md:py-24 px-6 md:px-12" id="bonos-section">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-text">
              {renderFormattedTitle("Compra hoy y recibe [bonos exclusivos].")}
            </h2>
            <p className="text-xs font-sans text-brand-soft uppercase tracking-wider">
              VALORADOS EN $45 USD · DISPONIBLES GRATIS POR TIEMPO LIMITADO
            </p>
          </div>

          {/* Bonus Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {BONUSES.map((bonus, idx) => (
              <div 
                key={bonus.id}
                className="bg-white border border-brand-gold/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
              >
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="bg-brand-green text-white text-[9px] uppercase font-bold px-2 py-0.5 tracking-wider rounded">
                      GRATIS HOY
                    </span>
                    <span className="text-xs font-mono font-medium text-brand-soft line-through">
                      VALOR: {bonus.value}
                    </span>
                  </div>

                  {/* Visual mockup representation of the book/PDF */}
                  <div className="h-96 bg-brand-base rounded flex items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4853A_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    {/* Render custom mockup if matching the index, otherwise render stylized cover representation */}
                    {idx === 0 ? (
                      <img 
                        src="https://i.postimg.cc/7hnGDLwP/Mockup-Planificador-Semanal.webp" 
                        alt="Bono 1: Planificador de Menú Semanal"
                        className="h-full w-auto object-contain z-10 rounded shadow-sm hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : idx === 1 ? (
                      <img 
                        src="https://i.postimg.cc/fTXZVP9C/Mockup-Guia-Gestion-del-Congelador.webp" 
                        alt="Bono 2: Guía de Gestión del Congelador"
                        className="h-full w-auto object-contain z-10 rounded shadow-sm hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <img 
                        src="https://i.postimg.cc/g03G1TYr/Mockup-Guia-Plan-de-Viandas.webp" 
                        alt="Bono 3: Plan de Viandas Organizadas"
                        className="h-full w-auto object-contain z-10 rounded shadow-sm hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-sans font-bold text-base text-brand-text">
                      {bonus.title}
                    </h4>
                    <span className="block text-[10px] font-sans font-semibold text-brand-gold uppercase tracking-wider">
                      {bonus.subtitle}
                    </span>
                    <p className="font-sans text-brand-soft text-xs leading-relaxed pt-1">
                      {bonus.description}
                    </p>
                  </div>

                  {/* Bullet list using em dashes — */}
                  <ul className="text-[11px] text-brand-soft space-y-1.5 pt-2 border-t border-brand-base">
                    {bonus.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1">
                        <span className="text-brand-gold font-bold">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>

          {/* Centralized Mockup Visual representing the whole package */}
          <div className="bg-white/50 border border-brand-gold/15 p-6 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 h-80 md:h-96 bg-white rounded overflow-hidden shadow-sm flex items-center justify-center p-2">
              <img 
                src="https://i.postimg.cc/0y9wZF7J/Banner-Premium-Cook-Zone-Hotmar-Club-(2).webp" 
                alt="Banner Premium Cook Zone Hotmart Club"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="md:col-span-6 text-left space-y-4">
              <div>
                <span className="text-[10px] font-sans font-bold text-brand-gold uppercase tracking-wider">BIBLIOTECA COMPLETA UNIFICADA</span>
                <h4 className="font-display font-semibold text-xl text-brand-text mt-1">Todo tu ecosistema listo para descargar en un clic</h4>
              </div>
              <p className="font-sans text-brand-soft text-xs leading-relaxed">
                Obtén acceso inmediato al manual completo, el recetario interactivo, el planificador semanal y todas las guías de bonificación premium.
              </p>
              <div className="pt-1">
                <a
                  href="#precios-section"
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/95 text-white font-sans font-bold text-xs tracking-wider uppercase px-6 py-3 rounded transition-all shadow-sm"
                >
                  VER PLANES DISPONIBLES <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7 — PRECIOS */}
      <section className="bg-brand-base border-t border-brand-gold/15 py-16 md:py-24 px-6 md:px-12" id="precios-section">
        <div className="max-w-4xl w-full mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-text">
              {renderFormattedTitle("Elige tu [edición].")}
            </h2>
            <p className="text-xs font-sans text-brand-soft uppercase tracking-wider max-w-md mx-auto">
              Pago único, acceso vitalicio, garantía incondicional de 15 días.
            </p>
          </div>

          {/* Cards (2 in row, max-width 860px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* CARD PLAN BASE */}
            <div className="bg-white border border-brand-gold/20 rounded-lg p-8 shadow-sm flex flex-col justify-between space-y-8 relative">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-sans font-bold text-brand-soft uppercase tracking-wider block">PLAN BASE</span>
                  <h3 className="font-display font-bold text-2xl text-brand-text mt-1">Kit Cocina Esencial</h3>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-brand-text tracking-widest block border-b border-brand-base pb-1">ENTREGABLES INCLUIDOS:</span>
                  <ul className="text-xs text-brand-soft space-y-2.5">
                    {PLANS[0].deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bonos no incluidos */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase font-bold text-brand-soft/40 tracking-widest block">BONOS EXTRA:</span>
                  <p className="text-xs text-brand-soft/40 italic line-through">— Planificador de Menú Semanal</p>
                  <p className="text-xs text-brand-soft/40 italic line-through">— Guía de Gestión del Congelador</p>
                  <p className="text-xs text-brand-soft/40 italic line-through">— Plan de Viandas Organizadas</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-base">
                <div className="flex flex-col">
                  <span className="text-xs text-brand-soft line-through">VALOR ORIGINAL: $19.90 USD</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-sans font-bold text-4xl text-brand-text">$3.90</span>
                    <span className="text-xs font-semibold text-brand-soft">USD pago único</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckoutClick(PLANS[0])}
                  className="w-full py-3.5 bg-brand-text hover:bg-brand-dark text-white font-sans font-bold text-xs tracking-wider uppercase rounded transition-all shadow"
                  id="buy-base-plan"
                >
                  ADQUIRIR PLAN BASE →
                </button>

                <p className="text-[10px] text-brand-soft text-center">🔒 Pago procesado en servidor cifrado SSL</p>
              </div>
            </div>

            {/* CARD PLAN COMPLETO (DESTACADA) */}
            <div className="bg-brand-green text-white border border-brand-green rounded-lg p-8 shadow-xl flex flex-col justify-between space-y-8 relative overflow-hidden">
              {/* Badge "Más elegido" */}
              <div className="absolute top-0 right-6 bg-brand-gold text-white text-[9px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-b shadow-sm shrink-0">
                MÁS ELEGIDO
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-sans font-bold text-white/70 uppercase tracking-wider block">PLAN COMPLETO</span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">Sistema Inteligente Premium</h3>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-white/90 tracking-widest block border-b border-white/10 pb-1">ENTREGABLES INCLUIDOS:</span>
                  <ul className="text-xs text-white/80 space-y-2.5">
                    {PLANS[1].deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bonos incluidos */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">BONOS EXCLUSIVOS DESBLOQUEADOS:</span>
                  <ul className="text-xs text-white/95 space-y-2 font-medium">
                    {PLANS[1].bonuses.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-brand-gold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 line-through">VALOR ORIGINAL: $49.90 USD</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-sans font-bold text-4xl text-white">$5.90</span>
                    <span className="text-xs font-semibold text-white/80">USD pago único</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCheckoutClick(PLANS[1])}
                  className="w-full py-4 bg-brand-gold hover:bg-brand-gold/90 text-white font-sans font-extrabold text-xs tracking-wider uppercase rounded transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                  id="buy-complete-plan"
                >
                  ADQUIRIR SISTEMA COMPLETO →
                </button>

                <p className="text-[10px] text-white/60 text-center">🛡️ Satisfacción garantizada por 15 días</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8 — TESTIMONIOS */}
      <section className="bg-brand-base border-t border-brand-gold/15 py-16 md:py-24 px-6 md:px-12" id="testimonios-section">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          
          {/* Header */}
          <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-text text-left">
            {renderFormattedTitle("Lo que dicen quienes ya [cocinaron].")}
          </h2>

          {/* Grid Open Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {TESTIMONIALS.map((test) => (
              <div key={test.id} className="space-y-4 flex flex-col justify-between text-left">
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold shrink-0" />
                    ))}
                  </div>
                  <p className="font-sans text-brand-soft text-sm italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center gap-3 pt-3">
                  <img 
                    src={test.avatar} 
                    alt={test.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-brand-gold/20" 
                  />
                  <div>
                    <span className="font-sans font-bold text-sm text-brand-text block">
                      {test.name}
                    </span>
                    <span className="font-sans text-brand-soft text-xs">
                      {test.city}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="bg-brand-base border-t border-brand-gold/15 py-16 md:py-24 px-6 md:px-12" id="faq-section">
        <div className="max-w-4xl w-full mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-left space-y-2">
            <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-text">
              {renderFormattedTitle("Preguntas [frecuentes].")}
            </h2>
            <p className="text-xs font-sans text-brand-soft uppercase tracking-wider">
              TODO LO QUE NECESITAS SABER SOBRE EL MÉTODO ANTES DE ADQUIRIRLO
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-2 border-t border-brand-gold/15">
            {FAQS.map((faq) => {
              const isOpen = expandedFaqId === faq.id;
              
              return (
                <div key={faq.id} className="border-b border-brand-gold/15">
                  <button
                    onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                    className="w-full py-5 flex justify-between items-center text-left gap-4 hover:text-brand-green transition-colors"
                  >
                    <div className="flex gap-3 items-baseline">
                      <span className="font-mono text-xs font-bold text-brand-gold">{faq.number}</span>
                      <span className="font-display font-bold text-base md:text-lg text-brand-text leading-tight">
                        {faq.question}
                      </span>
                    </div>
                    <span className="shrink-0 text-brand-gold">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pl-7 pr-4 animate-fade-in">
                      <p className="text-xs md:text-sm text-brand-soft leading-relaxed font-sans">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 10 — FOOTER */}
      <footer className="bg-brand-dark text-white py-16 px-6 md:px-12 border-t border-brand-gold/10">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Brand */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-display italic text-brand-gold text-3xl font-bold">Cocina</span>
                <span className="font-sans font-bold tracking-wider text-xl uppercase">Inteligente</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed max-w-sm">
                Un sistema enfocado en la salud digestiva, el ahorro inteligente y la planificación familiar realista. Come de forma soberana todos los días.
              </p>
            </div>

            {/* Column 2: Links */}
            <div className="md:col-span-4 space-y-3 text-xs">
              <span className="font-sans font-bold tracking-widest text-[10px] text-brand-gold uppercase block">SISTEMA</span>
              <ul className="space-y-2 text-white/70">
                <li><a href="#beneficios-section" className="hover:text-brand-gold transition-colors">Beneficios del método</a></li>
                <li><a href="#metodo-section" className="hover:text-brand-gold transition-colors">La Ciencia del Frío</a></li>
                <li><a href="#capitulos-section" className="hover:text-brand-gold transition-colors">Capítulos del manual</a></li>
                <li><a href="#bonos-section" className="hover:text-brand-gold transition-colors">Bonos de adquisición</a></li>
              </ul>
            </div>

            {/* Column 3: Legal & Access */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <span className="font-sans font-bold tracking-widest text-[10px] text-brand-gold uppercase block">ÁREA PRIVADA</span>
              <p className="text-white/60 text-xs">¿Ya eres alumno? Accede de forma directa a tu portal.</p>
              <button 
                onClick={() => handleReviewerQuickAccess('plan_completo')}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:border-brand-gold hover:text-brand-gold rounded text-xs tracking-wider uppercase font-semibold transition-all"
              >
                Ingresar al Portal
              </button>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
            <p>© {new Date().getFullYear()} Cocina Inteligente. Todos los derechos reservados. Diseñado bajo estándares de alta costura culinaria.</p>
            <div className="flex gap-4">
              <span className="hover:text-brand-gold cursor-pointer transition-colors">Términos de Uso</span>
              <span className="hover:text-brand-gold cursor-pointer transition-colors">Políticas de Privacidad</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          plan={selectedPlanForCheckout}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {/* Floating Toast Notification */}
      <Toast 
        message={toastMessage} 
        isVisible={isToastVisible} 
        onClose={() => setIsToastVisible(false)} 
      />

    </div>
  );
}
