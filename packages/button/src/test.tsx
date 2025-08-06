import React, { useLayoutEffect, useMemo, useState } from 'react';
import { ButtonProps } from './types';
import './style/index.scss';
interface LoadingConfigDelay {
  loading: boolean;
  delay: number;
}
const getLoadingConfigDelay = (
  config: ButtonProps['loading'],
): LoadingConfigDelay => {
  if (typeof config === 'object') {
    let delay = config?.delay;
    delay = !Number.isNaN(delay) && typeof delay === 'number' ? delay : 0;
    // 注意当delay大于0时，表示当前状态loading是false!!
    return { delay, loading: delay <= 0 };
  }
  return {
    delay: 0,
    loading: !!config,
  };
};
export const Button = (props: ButtonProps) => {
  const { children, loading = false } = props;
  // =============loading============
  const loadingConfigDelay = useMemo<LoadingConfigDelay>(
    () => getLoadingConfigDelay(loading),
    [loading],
  );
  const [innerLoading, setInnerLoading] = useState<boolean>(
    loadingConfigDelay.loading,
  );
  // 为了避免多次点击时，loading无法有效拦截点击：放在
  useLayoutEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    if (loadingConfigDelay.delay > 0) {
      delayTimer = setTimeout(() => {
        setInnerLoading(true);
      }, loadingConfigDelay.delay);
    } else {
      //同步当前
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

  return (
    <button>
      {innerLoading ? 'loading' : ''}
      {children}
    </button>
  );
};
