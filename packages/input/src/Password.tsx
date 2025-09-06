import { useEffect, useState } from 'react';
import { Input } from './Input';
import type { PasswordProps } from './type';
export const Password = (props: PasswordProps) => {
  const { visibilityToggle } = props;
  const visibilityControlled =
    typeof visibilityToggle === 'object' &&
    visibilityToggle.visible !== undefined;
  const [visible, setVisible] = useState(() =>
    visibilityControlled ? visibilityToggle.visible : false,
  );
  useEffect(() => {
    if (visibilityControlled) {
      setVisible(visibilityToggle.visible);
    }
  }, [visibilityControlled, visibilityToggle]);
  const type = visible ? 'text' : 'password';
  // const suffixIcon = visibilityToggle;
  return <Input type={type}></Input>;
};
