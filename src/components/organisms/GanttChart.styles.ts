import styled from 'styled-components';
import { media } from '../../styles/theme';

export const GanttWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 200px;
  overflow: hidden;
`;

export const GanttHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0 12px;
  flex-shrink: 0;

  ${media.mobile} {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const GanttGrid = styled.div`
  flex: 1;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
`;

export const GanttRow = styled.div<{ $isSub?: boolean }>`
  display: flex;
  align-items: stretch;
  min-height: 36px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $isSub }) => ($isSub ? theme.colors.backgroundSecondary : theme.colors.background)};

  &:last-child {
    border-bottom: none;
  }
`;

export const GanttTimelineTrack = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
`;

export const GanttBarTrack = styled.div`
  position: absolute;
  inset: 2px 0;
  min-height: 26px;
`;

export const TaskBar = styled.div<{
  $left: number;
  $width: number;
  $variant: 'main' | 'sub';
}>`
  position: absolute;
  left: ${({ $left }) => $left}px;
  width: ${({ $width }) => $width}px;
  top: 0;
  bottom: 0;
  min-width: 20px;
  border-radius: 12px;
  background: ${({ $variant, theme }) => ($variant === 'main' ? theme.colors.barMain : theme.colors.barSub)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  overflow: hidden;
`;

export const TaskBarLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.3;
  letter-spacing: 0.01em;
`;

export const draggableBarStyle = (color: string): React.CSSProperties => ({
  background: color,
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 8px',
  overflow: 'hidden',
  cursor: 'grab',
  minWidth: 20,
});

export const RESIZE_HORIZONTAL = {
  left: true,
  right: true,
  top: false,
  bottom: false,
  topLeft: false,
  topRight: false,
  bottomLeft: false,
  bottomRight: false,
} as const;

export const GanttColHeader = styled.div<{ $isWeekend?: boolean }>`
  padding: 4px 6px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme, $isWeekend }) => ($isWeekend ? theme.colors.backgroundSecondary : 'transparent')};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  min-width: 24px;

  ${media.mobile} {
    padding: 3px 4px;
    font-size: 10px;
    min-width: 20px;
  }
`;

export const GanttColHeadersRow = styled.div`
  display: flex;
  flex-shrink: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const GanttMonthHeader = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.mobile} {
    padding: 3px 4px;
    font-size: 11px;
  }
`;

