import type { Task, TaskType } from '../types/task.types';
import { hasSubTaskConflict } from './conflictChecker';

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateTitle(title: string): ValidationResult {
  if (!title.trim()) {
    return { valid: false, error: 'Görev adı boş bırakılamaz.' };
  }
  return { valid: true };
}

export function validateMainTaskUnique(title: string, tasks: Task[]): ValidationResult {
  const exists = tasks.some(
    (t) => t.type === 'main' && t.title.toLowerCase() === title.trim().toLowerCase(),
  );
  if (exists) {
    return { valid: false, error: 'Bu isimde bir ana görev zaten mevcut.' };
  }
  return { valid: true };
}

export function validateSubTaskConflict(
  parentId: string,
  startDate: string,
  endDate: string,
  tasks: Task[],
  excludeTaskId?: string,
): ValidationResult {
  if (hasSubTaskConflict(parentId, startDate, endDate, tasks, excludeTaskId)) {
    return { valid: false, error: 'Bu tarih aralığında aynı üst görevde zaten bir alt görev var.' };
  }
  return { valid: true };
}

export function validateParentRequired(type: TaskType, parentId?: string): ValidationResult {
  if (type === 'sub' && !parentId) {
    return { valid: false, error: 'Alt görev için üst görev seçilmeli.' };
  }
  return { valid: true };
}

export function titleFormRule() {
  return {
    validator(_: unknown, value: string) {
      const result = validateTitle(value);
      return result.valid ? Promise.resolve() : Promise.reject(new Error(result.error));
    },
  };
}

export function parentFormRule(getType: () => TaskType) {
  return {
    validator(_: unknown, value: string) {
      const result = validateParentRequired(getType(), value);
      return result.valid ? Promise.resolve() : Promise.reject(new Error(result.error));
    },
  };
}
