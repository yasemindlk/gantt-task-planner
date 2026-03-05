import { useMemo, memo } from 'react';
import { Segmented } from 'antd';
import dayjs from 'dayjs';
import { Rnd } from 'react-rnd';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import type { RootState } from '../../store';
import type { Task } from '../../types/task.types';
import { useUI } from '../../hooks/useUI';
import { useDragResize } from '../../hooks/useDragResize';
import { getTaskTree, sortTaskTree } from '../../utils/sortHelpers';
import { getMainTaskRange } from '../../utils/dateHelpers';
import { getTimelineColumns, getTimelineRange, getMonthGroups } from '../../utils/timelineHelpers';
import {
  GanttWrap,
  GanttHeader,
  GanttGrid,
  GanttRow,
  GanttTimelineTrack,
  GanttBarTrack,
  TaskBar,
  TaskBarLabel,
  GanttColHeader,
  GanttColHeadersRow,
  GanttMonthHeader,
  draggableBarStyle,
  RESIZE_HORIZONTAL,
} from './GanttChart.styles';

const CELL_WIDTH = { day: 32, week: 80, month: 60 };

interface RowItem {
  task: Task;
  isSub: boolean;
  mainChildren?: Task[];
}

function GanttChartInner() {
  const theme = useTheme();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const { viewMode, setViewMode, expandedMainTaskIds, taskSortKey, taskSortOrder } = useUI();

  const tree = useMemo(() => {
    const t = getTaskTree(tasks);
    return sortTaskTree(t, taskSortKey, taskSortOrder);
  }, [tasks, taskSortKey, taskSortOrder]);

  const columns = useMemo(
    () => getTimelineColumns(viewMode, tasks),
    [viewMode, tasks]
  );

  const { start: rangeStart, end: rangeEnd } = useMemo(
    () => getTimelineRange(viewMode, tasks),
    [viewMode, tasks]
  );

  const rows: RowItem[] = useMemo(() => {
    const out: RowItem[] = [];
    for (const { main, children } of tree) {
      out.push({ task: main, isSub: false, mainChildren: children });
      if (expandedMainTaskIds.includes(main.id)) {
        for (const sub of children) {
          out.push({ task: sub, isSub: true });
        }
      }
    }
    return out;
  }, [tree, expandedMainTaskIds]);

  const monthGroups = useMemo(
    () => getMonthGroups(columns),
    [columns]
  );

  const showMonthRow = monthGroups.length > 0;
  const cellWidth = CELL_WIDTH[viewMode];
  const totalWidth = columns.length * cellWidth;

  const { handleDragStop, handleResizeStop, getBarPositionPx } = useDragResize({
    rangeStart,
    rangeEnd,
    trackWidthPx: totalWidth,
  });

  return (
    <GanttWrap>
      <GanttHeader>
        <Segmented
          value={viewMode}
          onChange={(v) => v && setViewMode(v as 'day' | 'week' | 'month')}
          options={[
            { label: 'Gün', value: 'day' },
            { label: 'Hafta', value: 'week' },
            { label: 'Ay', value: 'month' },
          ]}
        />
        <span style={{ fontSize: 12, color: 'var(--color-text-muted, #999)' }}>
          {dayjs(rangeStart).format('DD.MM.YYYY')} – {dayjs(rangeEnd).format('DD.MM.YYYY')}
        </span>
      </GanttHeader>

      <GanttGrid>
        <div style={{ minWidth: totalWidth }}>
          {showMonthRow && (
            <GanttColHeadersRow style={{ width: totalWidth, display: 'flex' }}>
              {monthGroups.map((g) => (
                <GanttMonthHeader
                  key={g.key}
                  style={{ width: g.colSpan * cellWidth, flexShrink: 0 }}
                >
                  {g.label}
                </GanttMonthHeader>
              ))}
            </GanttColHeadersRow>
          )}
          <GanttColHeadersRow style={{ width: totalWidth, display: 'flex' }}>
            {columns.map((col) => (
              <GanttColHeader
                key={col.key}
                $isWeekend={col.isWeekend}
                style={{ width: cellWidth, flexShrink: 0 }}
              >
                {col.label}
              </GanttColHeader>
            ))}
          </GanttColHeadersRow>

          {rows.map(({ task, isSub, mainChildren }) => {
            const { start, end } = isSub
              ? { start: task.startDate, end: task.endDate }
              : getMainTaskRange(task, mainChildren ?? []);

            const pos = getBarPositionPx(start, end);
            const tooltip = `${task.title} (${dayjs(start).format('DD.MM.YYYY')} – ${dayjs(end).format('DD.MM.YYYY')})`;

            if (!isSub) {
              return (
                <GanttRow key={task.id} $isSub={false} style={{ width: totalWidth }}>
                  <GanttTimelineTrack style={{ width: totalWidth }}>
                    <GanttBarTrack>
                      <TaskBar
                        $left={pos.x}
                        $width={pos.width}
                        $variant="main"
                        title={tooltip}
                      >
                        <TaskBarLabel>{task.title}</TaskBarLabel>
                      </TaskBar>
                    </GanttBarTrack>
                  </GanttTimelineTrack>
                </GanttRow>
              );
            }

            return (
              <GanttRow key={task.id} $isSub style={{ width: totalWidth }}>
                <GanttTimelineTrack style={{ width: totalWidth }}>
                  <GanttBarTrack>
                    <Rnd
                      size={{ width: pos.width, height: '100%' }}
                      position={{ x: pos.x, y: 0 }}
                      enableResizing={RESIZE_HORIZONTAL}
                      dragAxis="x"
                      bounds="parent"
                      style={draggableBarStyle(theme.colors.barSub)}
                      onDragStop={(_e, data) => handleDragStop(task.id, data.x)}
                      onResizeStop={(_e, _dir, ref, _delta, p) => handleResizeStop(task.id, p.x, ref.offsetWidth)}
                    >
                      <TaskBarLabel title={tooltip}>{task.title}</TaskBarLabel>
                    </Rnd>
                  </GanttBarTrack>
                </GanttTimelineTrack>
              </GanttRow>
            );
          })}
        </div>
      </GanttGrid>
    </GanttWrap>
  );
}

export const GanttChart = memo(GanttChartInner);
