import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../../config-provider/src/index';
import { SwitchProps } from './type';
import { useSwitchStyles } from './style/index';
export const Switch = (props: SwitchProps) => {
  const { prefixCls: customPrefixCls, value, defaultValue, onChange } = props;
  const [mergedChecked, setMergedChecked] = useMergedValue(false, {
    value,
    defaultValue,
    onChange,
  });
  const handleChecked = () => {
    setMergedChecked(!mergedChecked);
  };
  /** 
  // 内部state只用于非受控模式
  const [isChecked, setChecked] = useState(defaultValue ?? false);
  const handleChecked = () => {
    // 非受控模式，自己控制状态
    if (value === undefined) {
      setChecked(!mergedChecked);
    }
    onChange?.(!mergedChecked);
  };
  const isControlled = value !== undefined;
  const wasControlled = useRef(isControlled);
  // 受控模式，父组件修改value后，则直接通过value作为渲染依据
  // 非受控模式，则使用内部的state
  const mergedChecked = isControlled ? value : isChecked;
  const controlValue = useRef(value);
  if (isControlled) {
    controlValue.current = value;
  }
  useEffect(() => {
    // 受控转向非受控，状态同步:当前非受控，上一次受控，且受控时有有效值
    if (!isControlled && wasControlled.current && controlValue.current) {
      setChecked(controlValue.current);
    }
    // 记录当前模式
    wasControlled.current = isControlled;
  }, [isControlled, wasControlled]);
  */
  // ==========style=============
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('switch', customPrefixCls);
  const { styles } = useSwitchStyles({
    prefixCls,
  });
  const trackCls = classnames(styles, prefixCls, {
    [`${prefixCls}-checked`]: mergedChecked,
  });
  return (
    <button
      type="button"
      role="switch"
      className={trackCls}
      aria-checked={mergedChecked}
      onClick={handleChecked}
    >
      <div className={`${prefixCls}-handle`}></div>
    </button>
  );
};

Switch.displayName = 'Switch';

interface MergedOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}
const useMergedValue = <T,>(
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
