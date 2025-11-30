import React, { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ROUTINE_ITEMS } from '../constants';
import { RoutineItem } from '../types';

interface CalendarPopupProps {
  onClose: () => void;
}

// Days of the week labels starting on Sunday
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Determine which hair oil to use on a given day of week.
// We cycle through Moringa, Rosemary, and Castor in order starting on Monday.
const getHairOilForDay = (dow: number): string => {
  // Define cycle: index 0 -> Moringa, 1 -> Rosemary, 2 -> Castor
  const cycle = ['Moringa Oil', 'Rosemary Oil', 'Castor Oil'];
  // For Monday (1) index 0, Tuesday (2) index 1, Wednesday (3) index 2, Thursday (4) index 0, etc.
  const index = dow === 0 ? 0 : ((dow - 1) % cycle.length);
  return cycle[index];
};

// Determine if this day of the week is a retinol night. We schedule retinol on Monday, Wednesday and Friday by default.
const isRetinolNight = (dow: number): boolean => {
  const retinolDays = [1, 3, 5]; // Monday, Wednesday, Friday
  return retinolDays.includes(dow);
};

// Compute tasks for a given date. Returns an object keyed by time of day with arrays of items.
const computeTasksForDate = (date: Date) => {
  const dow = date.getDay();
  const tasks: { [key: string]: RoutineItem[] } = {
    morning: [],
    midday: [],
    evening: [],
    allDay: [],
  };

  ROUTINE_ITEMS.forEach(item => {
    // Skip retinol nights on non‑scheduled days
    if (item.name === 'Retinol Nights' && !isRetinolNight(dow)) {
      return;
    }
    // Include only the appropriate hair oil for this day
    if (['Moringa Oil', 'Rosemary Oil', 'Castor Oil'].includes(item.name)) {
      const expected = getHairOilForDay(dow);
      if (item.name !== expected) {
        return;
      }
    }
    // Add item to each of its designated times
    item.times.forEach(time => {
      if (tasks[time]) {
        tasks[time].push(item);
      }
    });
  });

  // Sort each list by order property for consistent display
  Object.keys(tasks).forEach(key => {
    tasks[key].sort((a, b) => {
      const orderA = typeof a.order === 'number' ? a.order : Number(a.order);
      const orderB = typeof b.order === 'number' ? b.order : Number(b.order);
      return orderA - orderB;
    });
  });
  return tasks;
};

const CalendarPopup: React.FC<CalendarPopupProps> = ({ onClose }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Generate calendar days for the current month, including leading blanks
  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      result.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      result.push(new Date(year, month, d));
    }
    return result;
  }, [currentMonth]);

  const monthLabel = useMemo(() => {
    return currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' });
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
          <h2 className="text-lg font-bold text-gray-200">Monthly Schedule Planner</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        {/* Month controls */}
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-gray-300">{monthLabel}</span>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        {/* Calendar grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
            {DAY_LABELS.map((label, idx) => (
              <div key={idx}>{label}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-sm">
            {days.map((date, idx) => {
              if (!date) {
                return <div key={idx} className="h-12" />;
              }
              const day = date.getDate();
              const isToday = date.toDateString() === today.toDateString();
              const isRetinol = isRetinolNight(date.getDay());
              const hairOil = getHairOilForDay(date.getDay());
              return (
                <div
                  key={idx}
                  className={`relative h-12 flex items-center justify-center rounded-lg cursor-default transition-colors ${isToday ? 'bg-fuchsia-600/30 border border-fuchsia-500' : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'}`}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(prev => (prev && prev.getTime() === date.getTime() ? null : prev))}
                >
                  <span className="z-10 font-medium text-gray-200">{day}</span>
                  {/* Indicator dots for retinol and hair oil */}
                  <div className="absolute bottom-1 left-1 flex gap-0.5">
                    {isRetinol && <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" title="Retinol" />}
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" title={hairOil} />
                  </div>
                  {hoverDate && hoverDate.getTime() === date.getTime() && (
                    <TaskTooltip date={date} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tooltip component for showing tasks when hovering over a date
const TaskTooltip: React.FC<{ date: Date }> = ({ date }) => {
  const tasks = useMemo(() => computeTasksForDate(date), [date]);
  return (
    <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-left">
      <h4 className="text-sm font-semibold text-fuchsia-400 mb-1">
        {date.toLocaleDateString('default', { weekday: 'long', month: 'short', day: 'numeric' })}
      </h4>
      {Object.entries(tasks).map(([time, items]) => (
        items.length > 0 && (
          <div key={time} className="mb-2 last:mb-0">
            <p className="text-xs uppercase font-bold mb-1 text-teal-400">{time}</p>
            <ul className="space-y-0.5 list-disc list-inside text-gray-300">
              {items.map(i => (
                <li key={i.id} className="">
                  {i.name}
                </li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );
};

export default CalendarPopup;