import styled from 'styled-components';

const Wrapper = styled.span`
  cursor: pointer;
  user-select: none;
`;

interface SortableHeaderProps {
  label: string;
  active: boolean;
  direction: 'asc' | 'desc';
  onClick: () => void;
}

export function SortableHeader({ label, active, direction, onClick }: SortableHeaderProps) {
  return (
    <Wrapper role="button" tabIndex={0} onClick={onClick} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      {label} {active && (direction === 'asc' ? '↑' : '↓')}
    </Wrapper>
  );
}
