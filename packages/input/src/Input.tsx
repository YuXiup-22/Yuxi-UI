import React from 'react';
import type { InputProps } from './type';
import { useMergedValue } from '@yuxi-ui/util';
export const Input = (props: InputProps) => {
  const { value, defaultValue, onChange, ref, ...rest } = props;
  const [mergedValue, triggerChange] = useMergedValue(defaultValue, {
    value: value,
  });
  // 可能存在value/defaultValue都不存在的情况，做最后的兜底
  const formatValue =
    mergedValue === undefined || mergedValue === null
      ? ''
      : String(mergedValue);
  const innerHandleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    triggerChange(e.target.value);
    // TODO:校验长度时，需要克隆事件，传递允许范围的值
    onChange?.(e);
  };
  return (
    <input
      ref={ref}
      value={formatValue}
      onChange={innerHandleChange}
      {...rest}
    ></input>
  );
};

Input.displayName = 'Input';
