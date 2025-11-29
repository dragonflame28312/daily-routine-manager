import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, Clock, Tag } from 'lucide-react';
import { RoutineItem } from '../types';

interface RoutineCardProps {
  item: RoutineItem;
  isActive: boolean;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({ item, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to determine border/accent color based on item type or time
  const getAccentColor = (type: string) => {
    switch (type) {
      case 'time': return 'border-sky-500/50 text-sky-300 bg-sky-950/30';
      case 'special': return 'border-emerald-500/50 text-emerald-300 bg-emerald-950/30';
      default: return 'border-slate-600/50 text-slate-400 bg-slate-800/50';
    }
  };

  // Logic for the colored dot based on mainTime
  const getTimeColorClass = (time: string) => {
    switch(time) {
      case 'morning': return 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'; // Sunrise/Morning
      case 'midday': return 'bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]';    // Day
      case 'evening': return 'bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]'; // Night
      case 'allDay': return 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]'; // Nature/All Day
      default: return 'bg-slate-400';
    }
  };

  return (
    <motion.div
      layout
      animate={{
        scale: isActive ? 1.1 : 0.95,
        opacity: isActive ? 1 : 0.6,
        y: isActive ? -10 : 0,
        filter: isActive ? 'grayscale(0%)' : 'grayscale(40%) blur(1px)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        /* Increase default card width for better mobile readability */
        relative w-[320px] md:w-[380px] flex-shrink-0 
        bg-slate-900/60 backdrop-blur-xl border 
        ${isActive ? 'border-sky-500/50 shadow-2xl shadow-sky-900/20' : 'border-slate-700/50 shadow-xl'}
        rounded-2xl overflow-hidden
        transition-colors duration-300 group
      `}
    >
      {/* Glossy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="p-5 relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {item.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mt-1">
                    {item.tagline}
                </p>
            </div>
            {/* Visual indicator of Time of Day */}
            <div className={`w-2.5 h-2.5 rounded-full ${getTimeColorClass(item.mainTime)}`} />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4 mt-2">
          {item.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`
                text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full border
                flex items-center gap-1
                ${getAccentColor(badge.type)}
              `}
            >
              {badge.type === 'time' && <Clock size={10} />}
              {badge.type !== 'time' && <Tag size={10} />}
              {badge.label}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          {/* Link if available */}
          {item.link && (
            <a
              href={item.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
            >
              <ExternalLink size={12} />
              {item.link.label}
            </a>
          )}

          {/* Toggle Details Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 px-3 py-2 rounded-lg transition-colors border border-slate-700"
          >
            <span>{isOpen ? 'Hide Details' : 'Details / How to use'}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Expandable Details Section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 pb-1 text-sm text-slate-300 space-y-1 border-t border-slate-700/50 mt-3 border-dashed">
                {item.details.map((line, idx) => (
                  <p key={idx} className="flex gap-2 leading-relaxed">
                    <span className="text-sky-500/50 mt-1.5">•</span>
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};