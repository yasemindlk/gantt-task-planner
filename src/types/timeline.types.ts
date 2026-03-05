export interface TimelineColumn {
  key: string;
  label: string;
  date: string;
  isWeekend?: boolean;
  monthKey?: string;
}

export interface MonthGroup {
  key: string;
  label: string;
  colSpan: number;
}
