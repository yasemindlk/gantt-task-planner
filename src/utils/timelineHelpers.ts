import dayjs from 'dayjs';
import type { ViewMode, Task } from '../types/task.types';
import type { TimelineColumn, MonthGroup } from '../types/timeline.types';

function getTasksDateRange(tasks: Task[]): { start: string; end: string } | null {
  if (tasks.length === 0) return null;

  let min = tasks[0].startDate;
  let max = tasks[0].endDate;

  for (const t of tasks) {
    if (t.startDate < min) min = t.startDate;
    if (t.endDate > max) max = t.endDate;
  }

  return { start: min, end: max };
}

function getEffectiveRange(tasks: Task[]): { start: dayjs.Dayjs; end: dayjs.Dayjs } {
  const now = dayjs();
  let start = now.startOf('year');
  let end = now.endOf('year');

  const range = getTasksDateRange(tasks);
  if (range) {
    const taskStart = dayjs(range.start).startOf('month');
    const taskEnd = dayjs(range.end).endOf('month');
    if (taskStart.isBefore(start)) start = taskStart;
    if (taskEnd.isAfter(end)) end = taskEnd;
  }

  return { start, end };
}

export function getTimelineColumns(viewMode: ViewMode, tasks: Task[]): TimelineColumn[] {
  const { start, end } = getEffectiveRange(tasks);

  if (viewMode === 'month') {
    const columns: TimelineColumn[] = [];
    let d = start.startOf('month');
    while (d.isBefore(end) || d.isSame(end, 'month')) {
      columns.push({
        key: `month-${d.format('YYYY-MM')}`,
        label: d.format('MM'),
        date: d.format('YYYY-MM-DD'),
        monthKey: d.format('YYYY'),
      });
      d = d.add(1, 'month');
    }
    return columns;
  }

  if (viewMode === 'week') {
    const columns: TimelineColumn[] = [];
    let d = start.startOf('week');
    while (d.isBefore(end) || d.isSame(end, 'day')) {
      const weekEnd = d.add(6, 'day');
      columns.push({
        key: `week-${d.format('YYYY-MM-DD')}`,
        label: `${d.format('DD')}-${weekEnd.format('DD')}`,
        date: d.format('YYYY-MM-DD'),
        monthKey: d.format('YYYY-MM'),
      });
      d = d.add(7, 'day');
    }
    return columns;
  }

  const columns: TimelineColumn[] = [];
  let d = start;
  while (d.isBefore(end) || d.isSame(end, 'day')) {
    columns.push({
      key: `day-${d.format('YYYY-MM-DD')}`,
      label: d.format('D'),
      date: d.format('YYYY-MM-DD'),
      isWeekend: d.day() === 0 || d.day() === 6,
      monthKey: d.format('YYYY-MM'),
    });
    d = d.add(1, 'day');
  }
  return columns;
}

export function getTimelineRange(viewMode: ViewMode, tasks: Task[]): { start: string; end: string } {
  const { start, end } = getEffectiveRange(tasks);

  if (viewMode === 'week') {
    return {
      start: start.startOf('week').format('YYYY-MM-DD'),
      end: end.endOf('week').format('YYYY-MM-DD'),
    };
  }
  if (viewMode === 'month') {
    return {
      start: start.startOf('month').format('YYYY-MM-DD'),
      end: end.endOf('month').format('YYYY-MM-DD'),
    };
  }
  return {
    start: start.format('YYYY-MM-DD'),
    end: end.format('YYYY-MM-DD'),
  };
}

export function getMonthGroups(columns: TimelineColumn[]): MonthGroup[] {
  return columns.reduce<MonthGroup[]>((groups, col) => {
    if (!col.monthKey) return groups;

    const last = groups.at(-1);
    if (last?.key === col.monthKey) {
      last.colSpan += 1;
    } else {
      const isYearKey = /^\d{4}$/.test(col.monthKey);
      groups.push({
        key: col.monthKey,
        label: isYearKey ? col.monthKey : dayjs(col.date).format('MMMM YYYY'),
        colSpan: 1,
      });
    }
    return groups;
  }, []);
}
