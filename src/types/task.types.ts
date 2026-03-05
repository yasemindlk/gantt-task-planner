

export type TaskType = 'main' | 'sub';

export type ViewMode = 'day' | 'week' | 'month';

export interface Task {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: TaskType;
  parentId?: string; // sub tasklar karışmasın diye maine baglama id si 
}

export interface MainTask extends Task {
  type: 'main';
  parentId?: never;
}

export interface SubTask extends Task {
  type: 'sub';
  parentId: string;
}
