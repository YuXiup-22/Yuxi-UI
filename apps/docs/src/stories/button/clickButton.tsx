import { useState } from 'react';
import { Button, type ButtonProps } from '../../../../../packages/button/src';

export const ButtonTest = ({
  children = '点击我',
  onClick,
  ...rest
}: ButtonProps) => {
  const [count, setCount] = useState(0);
  const label = count === 0 ? children : `已经点击${count}次啦`;
  console.log(children);
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
