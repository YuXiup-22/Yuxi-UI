import React, { useState, useRef, useEffect, useCallback } from 'react';
interface MergedOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}
export const useMergedValue = <T>(
  defaultInitalValue: T,
  options?: MergedOptions<T>,
  // // 使用 React.Dispatch 和 React.SetStateAction 来确保类型与 useState 完全一致
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const { value, defaultValue, onChange } = options || {};
  // 判断模式
  const isControlled = value !== undefined;
  // 不同模式初始值来源不同
  const [innerValue, setInnerValue] = useState(() => {
    if (isControlled) return value;
    return defaultValue ?? defaultInitalValue;
  });
  // 受控模式：value;非受控模式，state
  const mergedValue = isControlled ? value : innerValue;
  // 不同模式更新方式不同
  const triggerChange = useCallback(
    (newVal: T | ((prevValue: T) => T)) => {
      // setState(t=>!t)
      const finalValue =
        typeof newVal === 'function'
          ? (newVal as (prev: T) => T)(mergedValue)
          : newVal;
      if (!isControlled) {
        setInnerValue(finalValue);
      }
      onChange?.(finalValue);
    },
    [isControlled, onChange, mergedValue],
  );
  const isFirstRender = useRef(true);
  // 补充：受控到非受控时，
  // 1.状态保持一致版：需要同步受控时的状态给当前的state,避免模式改变时，状态发生变化
  // 2.防御版本：状态为默认，被剥夺控制权后，重置状态
  // 为了安全性，选择防御版本：
  useEffect(() => {
    if (!isControlled && !isFirstRender.current) {
      // 在明知道vlaue为undefined时，为什么还要设置？
      // 若不设置，innerValue可能出现一个错误的，设置为undefined中性，
      // 只是为了避免可能导致bug的错误innerValue的出现，毕竟多次输入或者切换，不知道此时innerValue为何值
      setInnerValue(value!);
    }
    isFirstRender.current = false;
  }, [value, isControlled]);
  return [mergedValue, triggerChange];
};
