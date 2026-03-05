import { createContext } from 'react';
import type { ViewMode } from '../types/task.types';
import type { TaskSortKey, SortOrder } from '../utils/sortHelpers';

export type ActivePanel = 'tasks' | 'gantt';

export interface UIState {
  drawerOpen: boolean;
  viewMode: ViewMode;
  selectedParentId: string | null;
  drawerMode: 'add' | 'edit';
  expandedMainTaskIds: string[];
  taskSortKey: TaskSortKey;
  taskSortOrder: SortOrder;
  activePanel: ActivePanel;
}

export interface OpenDrawerPayload {
  parentId?: string;
  mode?: 'add' | 'edit';
}

export interface UIContextValue extends UIState {
  openDrawer: (payload?: OpenDrawerPayload) => void;
  closeDrawer: () => void;
  setViewMode: (mode: ViewMode) => void;
  toggleMainTaskExpanded: (mainTaskId: string) => void;
  setTaskSort: (key: TaskSortKey, order: SortOrder) => void;
  setActivePanel: (panel: ActivePanel) => void;
}

export const initialState: UIState = {
  drawerOpen: false,
  viewMode: 'week',
  selectedParentId: null,
  drawerMode: 'add',
  expandedMainTaskIds: [],
  taskSortKey: 'startDate',
  taskSortOrder: 'asc',
  activePanel: 'tasks',
};

export const UIContext = createContext<UIContextValue | null>(null);
