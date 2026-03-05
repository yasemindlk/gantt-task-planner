import { createContext } from 'react';
import type { ViewMode } from '../types/task.types';
import type { TaskSortKey, SortOrder } from '../utils/sortHelpers';

export interface UIState {
  drawerOpen: boolean;
  viewMode: ViewMode;
  selectedParentId: string | null;
  drawerMode: 'add' | 'edit';
  expandedMainTaskIds: string[];
  taskSortKey: TaskSortKey;
  taskSortOrder: SortOrder;
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
}

export const initialState: UIState = {
  drawerOpen: false,
  viewMode: 'week',
  selectedParentId: null,
  drawerMode: 'add',
  expandedMainTaskIds: [],
  taskSortKey: 'startDate',
  taskSortOrder: 'asc',
};

export const UIContext = createContext<UIContextValue | null>(null);
