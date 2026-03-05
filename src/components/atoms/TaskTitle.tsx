import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import type { TaskType } from '../../types/task.types';

const StyledTitle = styled.span<{ $isMain: boolean }>`
  font-weight: ${({ $isMain }) => ($isMain ? 600 : 400)};
`;

const EditInput = styled(Input)`
  width: 100%;
`;

interface TaskTitleProps {
  title: string;
  type: TaskType;
  editing?: boolean;
  onSave?: (newTitle: string) => void;
  onCancel?: () => void;
}

export function TaskTitle({ title, type, editing, onSave, onCancel }: TaskTitleProps) {
  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title);
  }, [title]);

  const commit = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== title) {
      onSave?.(trimmed);
    } else {
      setValue(title);
      onCancel?.();
    }
  };

  const cancel = () => {
    setValue(title);
    onCancel?.();
  };

  if (editing) {
    return (
      <EditInput
        size="small"
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        onPressEnter={commit}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Escape') cancel();
        }}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return <StyledTitle $isMain={type === 'main'}>{title}</StyledTitle>;
}
