import type { Task } from '../types/task.types';
import dayjs from 'dayjs';

function rangesOverlap(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const s1 = dayjs(start1).startOf('day');
  const e1 = dayjs(end1).startOf('day');
  const s2 = dayjs(start2).startOf('day');
  const e2 = dayjs(end2).startOf('day');
  return !(e1.isBefore(s2) || e2.isBefore(s1));
}

export function hasSubTaskConflict(
  mainTaskId: string,
  startDate: string,
  endDate: string,
  tasks: Task[],
  excludeTaskId?: string
): boolean {
  const subs = tasks.filter(
    (t) => t.type === 'sub' && t.parentId === mainTaskId && t.id !== excludeTaskId
  );
  return subs.some((sub) =>
    rangesOverlap(startDate, endDate, sub.startDate, sub.endDate)
  );
}
