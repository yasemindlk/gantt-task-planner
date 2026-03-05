import { forwardRef } from 'react';
import type { ReactNode, MouseEvent, Ref } from 'react';
import { Button } from 'antd';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  danger?: boolean;
  ariaLabel: string;
  className?: string;
}

export const IconButton = forwardRef(function IconButton(
  { icon, onClick, danger, ariaLabel, className }: IconButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <Button
      ref={ref}
      type="text"
      size="small"
      icon={icon}
      danger={danger}
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
    />
  );
});
