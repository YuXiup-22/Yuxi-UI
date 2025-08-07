import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ButtonProps } from './types';
import { LoadingIcon } from './LoadingIcon';
import classnames from 'classnames';
import './style/index.scss';
interface LoadingConfigDelay {
  loading: boolean;
  delay: number;
  icon: React.ReactNode;
}
const getLoadingConfigDelay = (
  config: ButtonProps['loading'],
): LoadingConfigDelay => {
  if (typeof config === 'object') {
    let delay = config?.delay;
    delay = !Number.isNaN(delay) && typeof delay === 'number' ? delay : 0;
    // 注意当delay大于0时，表示当前状态loading是false!!
    return { delay, loading: delay <= 0, icon: config?.icon };
  }
  return {
    delay: 0,
    loading: !!config,
    icon: null,
  };
};
export const Button = (props: ButtonProps) => {
  const {
    type = 'default',
    size = 'middle',
    shape = 'default',
    children,
    href,
    htmlType = 'button',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'start',
    onClick,
    ...rest
  } = props;
  // debugger;
  // =============loading============
  const loadingConfigDelay = useMemo<LoadingConfigDelay>(
    () => getLoadingConfigDelay(loading),
    [loading],
  );
  // 使用useState管理内部的loading状态，loading有父组件决定，delay由组件决定何时渲染，
  // 通过setState机制修改当前组件的UI
  const [innerLoading, setInnerLoading] = useState<boolean>(
    loadingConfigDelay.loading,
  );
  // 为了避免多次点击时，loading无法有效拦截点击,出现闪烁
  // useEffect是异步，第一次react更新dom后浏览器绘制；
  // 绘制完毕后，useEffect再次触发更新dom,又绘制一次UI
  // 极短时间内，绘制两次UI,且有细微差别，会导致闪烁
  // useLayoutEffect使得绘制前，所有dom是最终的结果。
  useLayoutEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    if (loadingConfigDelay.delay > 0) {
      delayTimer = setTimeout(() => {
        setInnerLoading(true);
      }, loadingConfigDelay.delay);
    } else {
      //同步当前的loading,既没有延迟的loading改变
      setInnerLoading(loadingConfigDelay.loading);
    }
    // 清理计时器，避免内存泄漏
    function clearTimer() {
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
    }
    return clearTimer;
  }, [loadingConfigDelay.delay, loadingConfigDelay.loading]);
  // 为了避免button组件在第一次挂载的时候就渲染图标动画，
  // 在loading为true时
  // useEffect保证了所有的dom已经挂载完,
  // 而且已经赋值给ref后，才执行
  /**是否是第一次挂载后状态 */
  const isAfterFirstMountRef = useRef(false);
  useEffect(() => {
    isAfterFirstMountRef.current = true;
    return () => {
      isAfterFirstMountRef.current = false;
    };
  }, []); //只执行一次，第一次挂载时。

  let iconNode =
    icon && !innerLoading ? (
      <span>{icon}</span>
    ) : (
      <LoadingIcon
        loading={innerLoading}
        customIcon={loadingConfigDelay.icon}
        prefixCls="yuxi-button"
      ></LoadingIcon>
    );
  // ==========click==============
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (innerLoading || disabled) {
        // 阻止点击事件
        e.preventDefault();
        return;
      }
      // 触发点击回调
      onClick?.(e);
    },
    [innerLoading, disabled, onClick],
  );
  // =============render==============
  if (href !== undefined) {
    //
  }
  const prefixCls = 'yuxi-button';
  const classes = classnames(prefixCls, {
    // shape默认的样式不用给出类名，已经放在基础中，且type和shape默认是一样的，避免冲突shape没有默认的类名
    [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-icon-${iconPosition}`]: iconPosition !== 'start',
  });
  return (
    <button
      className={classes}
      disabled={disabled}
      type={htmlType}
      onClick={handleClick}
      {...rest}
    >
      {iconNode}
      {children}
    </button>
  );
};
