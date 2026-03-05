import styled from 'styled-components';
import type { TaskType } from '../../types/task.types';

const StyledTitle = styled.span<{ $isMain: boolean }>`
  font-weight: ${({ $isMain }) => ($isMain ? 600 : 400)};
`;

interface TaskTitleProps {
  title: string;
  type: TaskType;
}

export function TaskTitle({ title, type }: TaskTitleProps) {
  return <StyledTitle $isMain={type === 'main'}>{title}</StyledTitle>;
}
