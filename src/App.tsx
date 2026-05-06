import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Cpu, 
  Globe, 
  Home, 
  Users, 
  Heart, 
  Moon, 
  Rocket, 
  Code2,
  ShieldCheck,
  Star
} from 'lucide-react';
import { cn } from './lib/utils';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  icon: React.ReactNode;
  color: string;
  keywords?: string[];
  notes?: string[];
}

const slides: Slide[] = [
  {
    id: 1,
    title: "2060: Hayalimdeki Hayat",
    subtitle: "Bir Konuşma Sınavı Sunumu",
    content: "Sevgili arkadaşlar, Saygıdeğer öğretmenim,\n\nBugün sizlere, Allah beni 2060 yılına kadar yaşatırsa hayalimdeki hayatı anlatacağım.",
    icon: <Star className="w-16 h-16" />,
    color: "from-blue-600 to-indigo-700",
    keywords: ["Giriş", "Hayaller", "Gelecek"],
    notes: ["Selamla başla", "Giriş cümlesini vurgula", "Gülümse"]
  },
  {
    id: 2,
    title: "48 Yaşında Bir Vizyon",
    content: "2060 yılında yaklaşık 48 yaşlarında olurum. Olgun, deneyimli ve idealleri için yaşayan bir birey olarak...",
    icon: <Rocket className="w-16 h-16" />,
    color: "from-indigo-600 to-purple-700",
    keywords: ["Yaş: 48", "Yıl: 2060", "Olgunluk"],
    notes: ["Yaş vurgusu yap", "Olgunluğu hissettir"]
  },
  {
    id: 3,
    title: "Seven_Code7: Silikon Vadisi",
    content: "Silicon Valley'de Google’ın tam yanında Seven_Code7 adlı bir şirketim var. Dünyanın teknoloji kalbinde, bize özgü yapay zeka modelimizle geleceği inşa ediyoruz.",
    icon: <Code2 className="w-16 h-16" />,
    color: "from-cyan-600 to-blue-700",
    keywords: ["Silikon Vadisi", "Yapay Zeka", "Seven_Code7"],
    notes: ["Şirket ismini gururla söyle", "Teknoloji vurgusu"]
  },
  {
    id: 4,
    title: "İslam Dünyasının Lideri",
    content: "Milyarlarca insanın kullandığı uygulamalara sahibiz. En önemli kuralımız: Şirketime hiç haram bulaştırmazdım. İslam dünyasının en büyük teknoloji şirketinin sahibiyim.",
    icon: <ShieldCheck className="w-16 h-16" />,
    color: "from-emerald-600 to-teal-700",
    keywords: ["Haram-sız Teknoloji", "Ümmet", "Etik Vizyon"],
    notes: ["Maneviyata dikkat çek", "Helal kazanç önemi"]
  },
  {
    id: 5,
    title: "Küresel Rekabet",
    content: "Rakiplerimiz sıradan değil; Google, Anthropic ve OpenAI gibi devlerle aynı ligde yarışıyoruz. Fakat biz hem teknik hem de ahlaki olarak öndeyiz.",
    icon: <Building2 className="w-16 h-16" />,
    color: "from-slate-700 to-slate-900",
    keywords: ["Google", "OpenAI", "Global Yarış"],
    notes: ["Rakipleri say", "Farkımızı belirt"]
  },
  {
    id: 6,
    title: "Huzurlu Bir Yuva",
    content: "İş sadece hayatın bir parçası. Sabah eşim beni ve çocuklarımı sabah namazına kaldırıyor. Güne maneviyatla başlıyoruz.",
    icon: <Moon className="w-16 h-16" />,
    color: "from-amber-600 to-orange-700",
    keywords: ["Sabah Namazı", "Aile", "Maneviyat"],
    notes: ["Huzurlu bir ses tonu", "Sabah namazı detayı"]
  },
  {
    id: 7,
    title: "Birlikte Geleceğe",
    content: "Çocuklarımla işe gidiyoruz, dönüyoruz. Güzel bir yemek hazır, ailece oturup yiyoruz. Arada bir anne ve babamın yanına gidip hayır dualarını alıyoruz.",
    icon: <Users className="w-16 h-16" />,
    color: "from-rose-600 to-pink-700",
    keywords: ["Birlik", "Vefa", "Huzur"],
    notes: ["Aile bağlarını hissettir", "Dua vurgusu"]
  },
  {
    id: 8,
    title: "Sonuç ve Dua",
    content: "Mutlu, güzel ve ümmete faydalı bir hayat... Allah bana ve size bu güzel hayatı yaşamayı nasip etsin. Dinlediğiniz için teşekkür ederim.",
    icon: <Heart className="w-16 h-16" />,
    color: "from-emerald-500 to-green-600",
    keywords: ["Ümmete Fayda", "Mutluluk", "Dua"],
    notes: ["Kapanış teşekkürü", "İçten bir dua"]
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlay) {
      interval = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          nextSlide();
        } else {
          setIsAutoPlay(false);
        }
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, currentSlide]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 's') setIsSidebarOpen(prev => !prev);
      if (e.key === 'n') setIsNotesOpen(prev => !prev);
      if (e.key === 'h' || e.key === '?') setIsHelpOpen(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-100 overflow-x-hidden flex flex-col selection:bg-blue-500/30">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          key={`bg-1-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className={cn(
            "absolute top-[-10%] left-[-5%] w-[70%] h-[70%] rounded-full blur-[120px] transition-colors duration-1000",
            slide.color.split(' ')[0].replace('from-', 'bg-').replace('-600', '-500/20')
          )}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* Navigation Top Bar */}
      <header className="relative z-50 px-4 sm:px-12 py-3 sm:py-6 flex justify-between items-center bg-[#020617]/40 backdrop-blur-md border-b border-white/5 shrink-0">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 sm:gap-5"
        >
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900/80 hover:bg-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/5 shadow-xl transition-all"
          >
            <div className="space-y-1">
              <div className="w-4 h-0.5 bg-blue-500 rounded-full" />
              <div className="w-5 h-0.5 bg-white/60 rounded-full" />
              <div className="w-3 h-0.5 bg-blue-500 rounded-full" />
            </div>
          </button>
          
          <div className="flex flex-col">
            <h1 className="font-display font-black text-lg sm:text-2xl tracking-tighter text-white">Seven_Code7</h1>
            <span className="text-[7px] sm:text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">VİZYON 2060</span>
          </div>
        </motion.div>

        {/* Center Timer (Hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl">
           <span className="text-[10px] font-mono font-bold text-blue-400/80 uppercase tracking-widest">Süre</span>
           <span className="text-base font-mono font-black text-white">{formatTime(timer)}</span>
        </div>

        <div className="flex items-center gap-4">
           <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Tasarım</span>
              <span className="text-xs font-black text-blue-500 tracking-widest uppercase">LEYS</span>
           </div>
        </div>
      </header>

      {/* Main Slide Stage */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-3 sm:p-8 lg:p-12 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-6xl h-full flex flex-col lg:flex-row shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden lg:max-h-[600px] border border-white/5"
          >
            {/* Left Image/Icon Side */}
            <div className="w-full lg:w-[38%] relative h-40 sm:h-64 lg:h-auto shrink-0 bg-slate-900">
               <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-1000", slide.color)} />
               <div className="absolute inset-0 bg-[#020617]/30 backdrop-blur-[1px]" />
               
               <div className="relative h-full flex flex-col items-center justify-center p-4">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl mb-4 sm:mb-8"
                  >
                    <div className="text-white scale-75 sm:scale-100">
                      {React.cloneElement(slide.icon as React.ReactElement, { className: "w-10 h-10 sm:w-16 sm:h-16" })}
                    </div>
                  </motion.div>

                  <div className="hidden sm:flex flex-wrap justify-center gap-2 max-w-[80%]">
                    {slide.keywords?.map((word, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 backdrop-blur-lg rounded-lg text-[9px] font-bold uppercase tracking-widest border border-white/10 text-white/80">
                        {word}
                      </span>
                    ))}
                  </div>
               </div>
            </div>

            {/* Right Content Side */}
            <div className="flex-1 bg-slate-900/60 backdrop-blur-3xl p-6 sm:p-12 lg:p-16 flex flex-col relative overflow-hidden">
                <div className="h-full overflow-y-auto custom-scrollbar pr-2 lg:pr-6">
                  {slide.subtitle && (
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className={cn("w-6 sm:w-10 h-0.5 rounded-full", slide.color.split(' ')[0].replace('from-', 'bg-'))} />
                      <span className="text-[8px] sm:text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">{slide.subtitle}</span>
                    </div>
                  )}

                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight mb-4 sm:mb-8 tracking-tighter">
                    {slide.title}
                  </h2>

                  <div className="relative">
                    <div className="absolute left-[-1.5rem] sm:left-[-2rem] top-1 bottom-1 w-1 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-40" />
                    <p className="text-sm sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-medium pl-2 sm:pl-0">
                      {slide.content}
                    </p>
                  </div>
                </div>

                {/* Mobile Page Indicator */}
                <div className="mt-4 lg:absolute lg:bottom-12 lg:right-12 flex items-baseline gap-1 font-display opacity-20">
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-white">{currentSlide + 1}</span>
                  <span className="text-xs sm:text-lg font-bold text-slate-500">/ {slides.length}</span>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer Dock */}
      <footer className="relative z-[100] bg-slate-950/80 backdrop-blur-2xl border-t border-white/5 py-3 sm:py-6 px-4 sm:px-12 flex items-center justify-between gap-4">
        {/* Progress Bar (Desktop only) */}
        <div className="hidden lg:flex flex-1 max-w-xs flex-col gap-2">
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">İlerleme</span>
           <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
           </div>
        </div>

        {/* Quick Nav Bubbles */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all border text-[9px] sm:text-xs font-black",
                i === currentSlide 
                  ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-110" 
                  : "bg-white/5 border-white/5 text-slate-500 hover:text-white"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Main Controls */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={cn(
              "w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all border",
              currentSlide === 0 ? "opacity-30 cursor-not-allowed" : "bg-slate-900 border-white/5 hover:bg-slate-800 text-white"
            )}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className={cn(
              "h-10 sm:h-14 px-4 sm:px-8 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 font-black text-[10px] sm:text-sm tracking-widest transition-all",
              currentSlide === slides.length - 1 
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-500/20" 
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/10"
            )}
          >
            <span>{currentSlide === slides.length - 1 ? "BİTTİ" : "SIRADAKİ"}</span>
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="hidden xl:flex flex-col items-end border-l border-white/5 pl-8">
            <span className="text-[10px] uppercase tracking-[0.5em] text-slate-600 font-black mb-2">Seven_Code7 Vizyonu</span>
            <div className="flex items-center gap-4">
               <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
               </div>
               <button 
                  onClick={() => setIsHelpOpen(true)}
                  className="text-[10px] uppercase tracking-widest text-blue-500/60 font-bold hover:text-blue-400 transition-colors"
                >
                  YARDIM (?)
                </button>
            </div>
        </div>
      </footer>

      {/* Sidebar Navigation Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-full max-w-sm bg-slate-900 border-r border-white/5 z-[101] p-10 flex flex-col shadow-[50px_0_100px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500">Slayt Navigasyonu</span>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-4 custom-scrollbar">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setDirection(i > currentSlide ? 1 : -1);
                      setCurrentSlide(i);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl transition-all border flex items-center gap-5 group",
                      i === currentSlide 
                        ? "bg-blue-600 border-blue-400 shadow-xl" 
                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-inner",
                      i === currentSlide ? "bg-white/20" : "bg-slate-800"
                    )}>
                      {React.cloneElement(s.icon as React.ReactElement, { className: "w-5 h-5" })}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        i === currentSlide ? "text-blue-100" : "text-slate-500"
                      )}>BÖLÜM {i + 1}</span>
                      <span className={cn(
                        "text-sm font-bold",
                        i === currentSlide ? "text-white" : "text-slate-300"
                      )}>{s.title}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-10 p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Sınav İpucu</p>
                 <p className="text-xs text-slate-300 leading-relaxed font-medium">Bu sunum Leys tarafından Gelecek Vizyonu 2060 için özel olarak tasarlanmıştır. Akıcı bir geçiş için klavyenizi kullanabilirsiniz.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Speaker Notes Overlay */}
      <AnimatePresence>
        {isNotesOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 sm:bottom-32 left-6 sm:left-12 w-[calc(100%-3rem)] sm:w-80 bg-slate-900/95 backdrop-blur-3xl p-6 sm:p-8 rounded-3xl border border-white/10 z-[80] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">Konuşmacı Notları</h3>
            </div>
            <ul className="space-y-4 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              {slide.notes?.map((note, i) => (
                <li key={i} className="flex gap-4 group">
                   <span className="text-blue-500 font-mono text-xs opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                   <p className="text-xs text-slate-300 font-medium leading-relaxed">{note}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Help */}
      <AnimatePresence>
        {isHelpOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[120]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 m-auto w-full max-w-md h-fit bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 z-[121] shadow-[0_50px_100px_rgba(0,0,0,0.8)] mx-4 sm:mx-auto"
            >
               <h2 className="text-2xl font-black text-white mb-8 tracking-tighter flex items-center gap-4">
                 <div className="w-2 h-8 bg-blue-600 rounded-full" />
                 Navigasyon Yardımı
               </h2>
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { k: "Ok Tuşları", v: "Gezinme" },
                   { k: "Boşluk", v: "Sonraki Slayt" },
                   { k: "S Tuşu", v: "Kenar Çubuğu" },
                   { k: "N Tuşu", v: "Konuşmacı Notları" },
                   { k: "H / ?", v: "Yardım Menüsü" },
                   { k: "Tıklama", v: "Hızlı Geçiş" }
                 ].map(item => (
                   <div key={item.k} className="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/5">
                      <span className="block text-[9px] sm:text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{item.k}</span>
                      <span className="text-xs sm:text-sm font-bold text-slate-300">{item.v}</span>
                   </div>
                 ))}
               </div>
               <button 
                onClick={() => setIsHelpOpen(false)}
                className="w-full mt-8 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all text-sm uppercase tracking-widest"
               >
                 Ayarları Kapat
               </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Global Progress Bar */}
      {showProgress && !isFinished && (
        <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-slate-950 overflow-hidden z-[200]">
          <motion.div 
            className={cn("h-full transition-all duration-1000", slide.color.split(' ')[1]?.replace('to-', 'bg-'))}
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}

      {/* Final Finish Overlay */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center p-6 text-center"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[150px] animate-pulse" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className="relative z-10"
            >
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block px-12 py-6 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] mb-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
              >
                <h2 className="text-8xl sm:text-[12rem] font-display font-black text-white leading-none tracking-tighter">
                  8/B
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl sm:text-4xl font-display font-black text-blue-500 uppercase tracking-[0.3em]">
                  Teşekkür Ederim
                </h3>
                <p className="text-lg sm:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                  Beni dinlediğiniz için teşekkür ederim. <br className="hidden sm:block" />
                  <span className="text-white/60 text-base mt-4 block">Gelecek Vizyonu 2060 — Seven_Code7</span>
                </p>
                
                <div className="pt-12 flex justify-center gap-4">
                  <button 
                    onClick={() => {
                      setIsFinished(false);
                      setCurrentSlide(0);
                    }}
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all font-black text-xs uppercase tracking-widest"
                  >
                    Sunumu Tekrarla
                  </button>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Holographic Decorations */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
               <div className="h-[1px] w-40 bg-gradient-to-r from-transparent via-white to-transparent" />
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


