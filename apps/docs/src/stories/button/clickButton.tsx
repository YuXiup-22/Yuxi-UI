import { useState } from 'react';
import { Button, type ButtonProps } from '../../../../../packages/button/src';
interface ButtonTestProps extends ButtonProps {
  isClickAction?: boolean;
}
export const ButtonTest = ({
  children = '点击我',
  onClick,
  isClickAction = false,
  ...rest
}: ButtonTestProps) => {
  const [count, setCount] = useState(0);
  const label =
    count === 0 || !isClickAction ? children : `已经点击${count}次啦`;
  return (
    <Button
      {...rest}
      onClick={(e) => {
        setCount((count) => count + 1);
        onClick?.(e);
      }}
    >
      {label}
    </Button>
  );
};
