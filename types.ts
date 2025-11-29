export type TimeFilterType = 'all' | 'morning' | 'midday' | 'evening' | 'allDay';
export type CategoryFilterType = 'all' | 'supplements' | 'face' | 'hair' | 'hands';

export interface RoutineItem {
  id: string;
  name: string;
  tagline: string;
  times: TimeFilterType[]; // An item can belong to multiple time slots
  categories: CategoryFilterType[]; // An item can belong to multiple categories
  mainTime: TimeFilterType; // For sorting or primary badge color
  order: number;
  badges: {
    label: string;
    type: 'time' | 'cat' | 'special';
  }[];
  link?: {
    url: string;
    label: string;
  };
  details: string[]; // List of bullet points
}

// Overview Data Types
export interface ScheduleRow {
  time: string;
  item: string;
  dose: string;
  notes: string;
}

export interface DailyTotalRow {
  item: string;
  total: string;
}

export interface TopicalRow {
  item: string;
  amount: string;
  frequency: string;
}

export interface OverviewData {
  schedule: ScheduleRow[];
  totals: DailyTotalRow[];
  topicals: TopicalRow[];
}
