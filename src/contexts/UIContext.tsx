import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { ViewMode } from '../types/task.types';
import type { TaskSortKey, SortOrder } from '../utils/sortHelpers';
import {
  UIContext,
  initialState,
  type UIState,
  type UIContextValue,
  type OpenDrawerPayload,
  type ActivePanel,
} from './uiContextConfig';

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UIState>(initialState);

  const openDrawer = useCallback((payload?: OpenDrawerPayload) => {
    setState((prev) => ({
      ...prev,
      drawerOpen: true,
      selectedParentId: payload?.parentId ?? null,
      drawerMode: payload?.mode ?? 'add',
    }));
  }, []);

  const closeDrawer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      drawerOpen: false,
      selectedParentId: null,
    }));
  }, []);

  const setViewMode = useCallback((viewMode: ViewMode) => {
    setState((prev) => ({ ...prev, viewMode }));
  }, []);

  const toggleMainTaskExpanded = useCallback((mainTaskId: string) => {
    setState((prev) => ({
      ...prev,
      expandedMainTaskIds: prev.expandedMainTaskIds.includes(mainTaskId)
        ? prev.expandedMainTaskIds.filter((id) => id !== mainTaskId)
        : [...prev.expandedMainTaskIds, mainTaskId],
    }));
  }, []);

  const setTaskSort = useCallback((taskSortKey: TaskSortKey, taskSortOrder: SortOrder) => {
    setState((prev) => ({ ...prev, taskSortKey, taskSortOrder }));
  }, []);

  const setActivePanel = useCallback((activePanel: ActivePanel) => {
    setState((prev) => ({ ...prev, activePanel }));
  }, []);

  const value = useMemo<UIContextValue>(
    () => ({
      ...state,
      openDrawer,
      closeDrawer,
      setViewMode,
      toggleMainTaskExpanded,
      setTaskSort,
      setActivePanel,
    }),
    [state, openDrawer, closeDrawer, setViewMode, toggleMainTaskExpanded, setTaskSort, setActivePanel]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
