import type { Task } from '../types/task.types';
import { getTaskDurationDays } from './dateHelpers';

export type TaskSortKey = 'title' | 'startDate' | 'duration';
export type SortOrder = 'asc' | 'desc';

export interface MainWithChildren {
  main: Task;
  children: Task[];
}

export function getTaskTree(tasks: Task[]): MainWithChildren[] {
  const mains = tasks.filter((t) => t.type === 'main');
  const subs = tasks.filter((t) => t.type === 'sub');
  return mains.map((main) => ({
    main,
    children: subs.filter((s) => s.parentId === main.id),
  }));
}

function getSortValue(task: Task, key: TaskSortKey): string | number {
  if (key === 'startDate') return task.startDate;
  if (key === 'duration') return getTaskDurationDays(task.startDate, task.endDate);
  return task.title.toLowerCase();
}

function compare(a: string | number, b: string | number, order: SortOrder): number {
  if (a < b) return order === 'asc' ? -1 : 1;
  if (a > b) return order === 'asc' ? 1 : -1;
  return 0;
}

export function sortTaskTree(
  tree: MainWithChildren[],
  key: TaskSortKey,
  order: SortOrder,
): MainWithChildren[] {
  const sorter = (a: Task, b: Task) => compare(getSortValue(a, key), getSortValue(b, key), order);

  return [...tree]
    .sort((a, b) => sorter(a.main, b.main))
    .map((row) => ({
      main: row.main,
      children: [...row.children].sort(sorter),
    }));
}
