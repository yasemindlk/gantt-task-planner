import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { message } from 'antd';
import type { RootState } from '../store';
import { updateTask } from '../store/slices/taskSlice';
import { hasSubTaskConflict } from '../utils/conflictChecker';

interface UseDragResizeParams {
  rangeStart: string;
  rangeEnd: string;
  trackWidthPx: number;
}

function createConverter(rangeStart: string, rangeEnd: string, trackWidthPx: number) {
  const totalDays = dayjs(rangeEnd).diff(dayjs(rangeStart), 'day') + 1;
  return {
    pxToDate: (px: number) =>
      dayjs(rangeStart).add(Math.round((px / trackWidthPx) * totalDays), 'day').format('YYYY-MM-DD'),
    dateToPx: (date: string) =>
      (dayjs(date).diff(dayjs(rangeStart), 'day') / totalDays) * trackWidthPx,
  };
}

const CONFLICT_MSG = 'Bu tarih aralığında zaten başka bir alt görev var.';

export function useDragResize({ rangeStart, rangeEnd, trackWidthPx }: UseDragResizeParams) {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const { pxToDate, dateToPx } = useMemo(
    () => createConverter(rangeStart, rangeEnd, trackWidthPx),
    [rangeStart, rangeEnd, trackWidthPx],
  );

  const handleDragStop = useCallback(
    (taskId: string, newX: number) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task?.parentId) return;

      const duration = dayjs(task.endDate).diff(dayjs(task.startDate), 'day');
      const newStart = pxToDate(newX);
      const newEnd = dayjs(newStart).add(duration, 'day').format('YYYY-MM-DD');

      if (hasSubTaskConflict(task.parentId, newStart, newEnd, tasks, task.id)) {
        message.warning(CONFLICT_MSG);
        return;
      }
      dispatch(updateTask({ id: taskId, updates: { startDate: newStart, endDate: newEnd } }));
    },
    [tasks, pxToDate, dispatch],
  );

  const handleResizeStop = useCallback(
    (taskId: string, newX: number, newWidthPx: number) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task?.parentId) return;

      const newStart = pxToDate(newX);
      const newEnd = dayjs(pxToDate(newX + newWidthPx)).subtract(1, 'day').format('YYYY-MM-DD');

      if (dayjs(newEnd).isBefore(dayjs(newStart))) return;

      if (hasSubTaskConflict(task.parentId, newStart, newEnd, tasks, task.id)) {
        message.warning(CONFLICT_MSG);
        return;
      }
      dispatch(updateTask({ id: taskId, updates: { startDate: newStart, endDate: newEnd } }));
    },
    [tasks, pxToDate, dispatch],
  );

  const getBarPositionPx = useCallback(
    (startDate: string, endDate: string) => {
      const left = dateToPx(startDate);
      const right = dateToPx(dayjs(endDate).add(1, 'day').format('YYYY-MM-DD'));
      return { x: left, width: right - left };
    },
    [dateToPx],
  );

  return { handleDragStop, handleResizeStop, getBarPositionPx };
}
