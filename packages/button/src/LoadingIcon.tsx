import classnames from 'classnames';
import './style/_loadingIcon.scss';
import React, { useEffect, useRef, useState } from 'react';
interface LoadingIconProps {
  loading: boolean; //是否开启
  prefixCls: string;
  // isAfterFirstMount: boolean;
  customIcon?: React.ReactNode;
  customClassNames?: string;
  customStyle?: React.CSSProperties;
}
export const LoadingIcon = (props: LoadingIconProps) => {
  const { loading, prefixCls, customIcon, customClassNames, customStyle } =
    props;
  // 使得icon在第一次挂载后再执行动画,icon自己控制自己的挂载状态
  // 和动画的执行时机，不通过父组件传递；
  const [isVisible, setVisible] = useState(false);
  const isMountRef = useRef(true);
  useEffect(() => {
    if (isMountRef.current) {
      // 第一次挂载渲染完后，立即判断当前icon是否需要渲染
      if (loading) {
        setVisible(true);
      }
      isMountRef.current = false;
    } else {
      // 后面的挂载渲染通过loading判断
      setVisible(loading);
    }
  }, [loading]);
  // 使用css来处理显示图标，避免对dom频繁增删
  // 而且 CSS 动画（特别是 transform 和 opacity）可以由GPU（图形处理器）加速
  // 不占用主线程资源
  const cls = classnames(
    `${prefixCls}-loading-icon`,
    {
      [`${prefixCls}-loading-icon-visible`]: isVisible,
    },
    customClassNames,
  );
  return (
    <>
      {isVisible ? (
        <span className={cls} style={customStyle}>
          {customIcon ?? (
            <svg
              viewBox="0 0 1024 1024" //坐标系统 min-x min-y maxWidth maxHeight
              fill="currentColor" //继承父元素的color
              width="1em" //实际的宽度 1em相对父元素font-size的长度
              height="1em"
              aria-hidden="true" //无障碍属性，屏幕阅读器跳过，不去读，表示这只是一个视觉元素
            >
              <path d="M909.1 556.3C863.1 731.4 701.3 864 512 864c-186.3 0-337.8-132.3-337.8-295.5 0-16.7-13.6-30.3-30.3-30.3s-30.3 13.6-30.3 30.3C143.6 777.6 317.4 924 512 924c207.9 0 379.9-147.9 379.9-347.7 0-16.7-13.6-30.3-30.3-30.3s-30.3 13.6-30.3 30.3z" />
            </svg>
          )}
        </span>
      ) : null}
    </>
  );
};
