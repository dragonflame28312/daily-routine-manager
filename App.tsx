import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Calendar } from 'lucide-react';
import { ROUTINE_ITEMS, OVERVIEW_DATA, BACKGROUND_IMAGES } from './constants';
import { TimeFilterType, CategoryFilterType } from './types';
import { RoutineCard } from './components/RoutineCard';

const App: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterType>('all');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [showOverview, setShowOverview] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  // Filter Logic
  const filteredItems = useMemo(() => {
    return ROUTINE_ITEMS.filter((item) => {
      const matchesTime = timeFilter === 'all' || item.times.includes(timeFilter) || (timeFilter === 'allDay' && item.times.includes('allDay'));
      const matchesCategory = categoryFilter === 'all' || item.categories.includes(categoryFilter);
      return matchesTime && matchesCategory;
    });
  }, [timeFilter, categoryFilter]);

  // Set initial active item
  useEffect(() => {
    if (filteredItems.length > 0) {
      setTimeout(() => handleScroll(), 100);
    } else {
      setActiveItemId(null);
    }
  }, [filteredItems]);

  // Scroll detection
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
    
    let closestId = null;
    let minDistance = Infinity;

    filteredItems.forEach(item => {
      const element = itemsRef.current.get(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - elementCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestId = item.id;
        }
      }
    });

    if (closestId && closestId !== activeItemId) {
      setActiveItemId(closestId);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Background Logic - Determines key from active item's mainTime
  const activeBgKey = useMemo(() => {
    if (!activeItemId) return 'allDay';
    const activeItem = ROUTINE_ITEMS.find(i => i.id === activeItemId);
    return activeItem ? activeItem.mainTime : 'allDay';
  }, [activeItemId]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans">
      
      {/* BACKGROUND LAYERS - Stacked to prevent flickering */}
      <div className="absolute inset-0 z-0">
        {(Object.keys(BACKGROUND_IMAGES) as Array<keyof typeof BACKGROUND_IMAGES>).map((key) => (
          <div
            key={key}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${activeBgKey === key ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${BACKGROUND_IMAGES[key]}')` }}
          />
        ))}
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/10 via-slate-950/60 to-slate-950" />
      </div>

      {/* Main App Shell */}
      <div className="relative z-10 w-full max-w-[1600px] h-full flex flex-col md:justify-center p-4 md:p-8 lg:p-12 gap-6">
        
        {/* Header */}
        <header className="flex flex-col gap-4 text-center md:text-left md:flex-row md:items-end justify-between max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 mb-2 pb-2">
              Daily Routine
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm md:text-base font-medium drop-shadow-md">
              Swipe or use arrows to navigate. Cards auto-expand when centered.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
             <button 
               onClick={() => setShowOverview(true)}
               className="flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600/20 border border-emerald-500/50 hover:bg-emerald-600/40 text-emerald-200 transition-all text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-emerald-900/20"
             >
               <Calendar size={16} />
               View Full Schedule
             </button>
             <div className="px-4 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 backdrop-blur-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Face · Hair · Supplements
                </span>
             </div>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-slate-500 ml-3 mr-1">Time</span>
            {(['all', 'morning', 'midday', 'evening', 'allDay'] as TimeFilterType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeFilter(t)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap
                  ${timeFilter === t 
                    ? 'bg-sky-500/20 text-sky-200 border border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                `}
              >
                {t === 'allDay' ? 'Daily/Alt' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-2xl overflow-x-auto max-w-full no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-slate-500 ml-3 mr-1">Type</span>
            {(['all', 'supplements', 'face', 'hair', 'hands'] as CategoryFilterType[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`
                  px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap
                  ${categoryFilter === c 
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                `}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative w-full flex-1 min-h-[450px] flex flex-col justify-center">
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-slate-800/80 border border-slate-600 text-white hover:bg-sky-600 hover:border-sky-400 transition-all shadow-xl backdrop-blur-sm group"
          >
            <ArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-slate-800/80 border border-slate-600 text-white hover:bg-sky-600 hover:border-sky-400 transition-all shadow-xl backdrop-blur-sm group"
          >
            <ArrowRight className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 px-8 md:px-[calc(50vw-160px)] py-12 snap-x snap-mandatory scroll-smooth no-scrollbar w-full h-full items-center"
          >
            <LayoutGroup>
              <AnimatePresence mode='popLayout'>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div 
                      key={item.id} 
                      ref={el => {
                        if (el) itemsRef.current.set(item.id, el);
                        else itemsRef.current.delete(item.id);
                      }}
                      className="snap-center h-full flex items-center perspective-1000"
                    >
                      <RoutineCard item={item} isActive={activeItemId === item.id} />
                    </div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="w-full text-center text-slate-500 italic py-12"
                  >
                    No items found for this selection.
                  </motion.div>
                )}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
      </div>

      {/* Overview Modal */}
      <AnimatePresence>
        {showOverview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm"
            onClick={() => setShowOverview(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-800/50">
                <div>
                  <h2 className="text-2xl font-bold text-white">Daily Supplement & Routine Schedule</h2>
                  <p className="text-slate-400 text-sm mt-1">Full breakdown of doses and timing</p>
                </div>
                <button 
                  onClick={() => setShowOverview(false)}
                  className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* Table 1: Schedule */}
                <section>
                  <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <ClockIcon /> Daily Supplement Schedule
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-700">
                    <table className="w-full text-sm text-left text-slate-300">
                      <thead className="text-xs text-slate-400 uppercase bg-slate-800/80">
                        <tr>
                          <th className="px-4 py-3">Time</th>
                          <th className="px-4 py-3">Supplement</th>
                          <th className="px-4 py-3">Dose</th>
                          <th className="px-4 py-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                        {OVERVIEW_DATA.schedule.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30">
                            <td className="px-4 py-3 font-medium text-sky-300">{row.time}</td>
                            <td className="px-4 py-3 font-semibold text-white">{row.item}</td>
                            <td className="px-4 py-3">{row.dose}</td>
                            <td className="px-4 py-3 text-slate-400 italic">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Table 2: Daily Totals */}
                  <section>
                    <h3 className="text-lg font-bold text-sky-400 mb-4 flex items_center gap-2">
                      <PillIcon /> Total Daily Amounts
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-slate-700">
                      <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-800/80">
                          <tr>
                            <th className="px-4 py-3">Supplement</th>
                            <th className="px-4 py-3">Total Dose</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                          {OVERVIEW_DATA.totals.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/30">
                              <td className="px-4 py-3 font-medium text-white">{row.item}</td>
                              <td className="px-4 py-3 text-emerald-300">{row.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Table 3: Topical/Face */}
                  <section>
                    <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center gap-2">
                      <DropletIcon /> Topical Applications
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-slate-700">
                      <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-800/80">
                          <tr>
                            <th className="px-4 py-3">Item</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Frequency</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                          {OVERVIEW_DATA.topicals.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/30">
                              <td className="px-4 py-3 font-medium text-white">{row.item}</td>
                              <td className="px-4 py-3 text-sky-200">{row.amount}</td>
                              <td className="px-4 py-3 text-xs uppercase tracking-wide text-slate-400">{row.frequency}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>

              </div>
              <div className="p-4 bg-slate-800/50 border-t border-slate-800 text-center text-xs text-slate-500">
                Consult with a healthcare professional before starting any new supplement routine.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple Icons for the Modal headers
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const PillIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="6" x="4" y="9" rx="3"/><path d="M4 12h16"/></svg>
);
const DropletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-2-3-2-3q-3-3-5-6c-2 3-5 3-5 6 0 4 2 5 2 5a7 7 0 0 0 5 5z"/></svg>
);

export default App;
