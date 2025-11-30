import React, { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ROUTINE_ITEMS } from '../constants';
import { RoutineItem } from '../types';

interface CalendarPopupProps {
  onClose: () => void;
}

// Days of the week labels starting on Sunday
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Hair oils (moringa, rosemary and castor) are used every other day on a shared schedule.
// We designate specific days of the week as “hair oil days” (Sun, Mon, Wed, Fri). On those days,
// all three oils are applied together during the evening. On other days, they are omitted.

// Names of the hair oils defined in constants.tsx
const hairOils = ['Moringa Oil', 'Rosemary Oil', 'Castor Oil'];

// Days of week (0=Sunday, 1=Monday, 3=Wednesday, 5=Friday) when hair oils should be used.
const HAIR_OIL_DAYS = [0, 1, 3, 5];

/*
 * Note: Previously we rotated a single hair oil across days of the year, but the user
 * requested that all hair oils be used every other day. The HAIR_OIL_DAYS array ensures that
 * on these designated days the entire hair oil trio appears in the evening. Coconut oil
 * remains a daily AM/PM task and is handled via its times in constants.tsx.
 */

// Determine if this day of the week is a retinol night. We schedule retinol on two spaced days each week (Monday and Thursday).
// Monday = 1, Thursday = 4 (0 = Sunday).
const isRetinolNight = (dow: number): boolean => {
  const retinolDays = [1, 4];
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
    // Hair oils: include all hair oils on designated hair‑oil days (Sun, Mon, Wed, Fri). Skip them on other days.
    let timesList = item.times;
    if (hairOils.includes(item.name)) {
      // If today is not a hair‑oil day, skip this hair oil.
      if (!HAIR_OIL_DAYS.includes(dow)) {
        return;
      }
      // Force hair oils into the evening slot (since they are applied at night)
      timesList = ['evening'];
    }
    // Add item to each of its designated times
    timesList.forEach(time => {
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
  // Tracks the currently selected date for which to show the tooltip. Clicking a day toggles this state.
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate calendar days for the current month, including days from previous and next months
  // to fill a consistent 6-week grid. Each entry also indicates whether it belongs to the current month.
  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const result: { date: Date; isCurrentMonth: boolean }[] = [];
    // Prepend days from previous month
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      result.push({ date, isCurrentMonth: false });
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }
    // Append days from next month until we have a full 6-week (42 cell) grid
    while (result.length % 7 !== 0 || result.length < 42) {
      const lastDate = result[result.length - 1].date;
      const nextDate = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + 1);
      result.push({ date: nextDate, isCurrentMonth: false });
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setSelectedDate(null)}
    >
      {/* Remove max-w constraint so calendar uses the full viewport width on ultrawide screens */}
      <div
        className="w-full bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-visible"
        onClick={e => e.stopPropagation()}
      >
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
            {days.map(({ date, isCurrentMonth }, idx) => {
              const dayNum = date.getDate();
              const isToday = date.toDateString() === today.toDateString();
              // Determine tooltip position (above for bottom two rows)
              const rowIndex = Math.floor(idx / 7);
              const showAbove = rowIndex >= 4;
              return (
                <div
                  key={idx}
                  className={`relative h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
                    isToday
                      ? 'bg-fuchsia-600/30 border border-fuchsia-500'
                      : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50'
                  } ${!isCurrentMonth ? 'opacity-40' : ''}`}
                  onClick={() => {
                    if (selectedDate && selectedDate.getTime() === date.getTime()) {
                      setSelectedDate(null);
                    } else {
                      setSelectedDate(date);
                    }
                  }}
                >
                  <span className="z-10 font-medium text-gray-200">{dayNum}</span>
                  {/* Indicator dots for each time of day (morning, midday, evening) using new colors */}
                  <div className="absolute bottom-1 left-1 flex gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" title="Morning" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" title="Afternoon" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" title="Evening" />
                  </div>
                  {selectedDate && selectedDate.getTime() === date.getTime() && (
                    <TaskTooltip date={date} showAbove={showAbove} />
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

// Tooltip component for showing tasks when hovering over a date. The showAbove flag flips
// the tooltip above the cell instead of below when space is limited (e.g. bottom rows).
const TaskTooltip: React.FC<{ date: Date; showAbove?: boolean }> = ({ date, showAbove = false }) => {
  const tasks = useMemo(() => computeTasksForDate(date), [date]);
  // Decide positioning classes based on whether we want the tooltip to appear above or below
  const positionClass = showAbove ? 'bottom-full mb-2' : 'top-full mt-2';
  return (
    <div
      className={`absolute z-50 left-1/2 transform -translate-x-1/2 ${positionClass} w-80 max-h-64 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-3 text-left`}
    >
      <h4 className="text-sm font-semibold text-fuchsia-400 mb-1">
        {date.toLocaleDateString('default', { weekday: 'long', month: 'short', day: 'numeric' })}
      </h4>
      {Object.entries(tasks).map(([time, items]) => (
        items.length > 0 && (
          <div key={time} className="mb-2 last:mb-0">
            <p className="text-xs uppercase font-bold mb-1 text-teal-400">{time}</p>
            <ul className="space-y-0.5 list-disc list-inside text-gray-300">
              {items.map(i => (
                <li key={i.id}>{i.name}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );
};

export default CalendarPopup;