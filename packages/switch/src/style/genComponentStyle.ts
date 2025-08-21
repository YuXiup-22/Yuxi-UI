import { SwitchDefaultToken } from './theme';
import { CSSObject } from 'antd-style';
type stringifield<T> = {
  [k in keyof T]: string;
};
const genSwitchStyle = (
  token: stringifield<SwitchDefaultToken>,
  prefixCls: string,
): CSSObject => {
  return {
    [`&.${prefixCls}`]: {
      boxSizing: 'border-box',
      /* 清除 <button> 等元素自带的margin/padding/border */
      margin: 0,
      padding: 0,
      border: 0,
      display: 'inline-block',
      listStyle: 'none', // 以防万一，清除列表样式（虽然 button 一般不会有）
      /* 2. 视觉外观与主题化 (Visual & Theming) */
      color: token.color,
      fontWeight: token.fontWeight,
      fontSize: token.fontSize,
      background: token.backgroundUnchecked,
      borderRadius: '100px',
      /* 3.布局与尺寸 */
      position: 'relative', //创建定位上下文，子元素可以相对当前元素布局
      minWidth: token.trackMinWidth,
      height: token.trackHeight,
      lineHeight: token.trackHeight, //使得里面的文字居中
      verticalAlign: 'middle', //当开关和文字并排时，让它在垂直方向上居中对齐
      /* 4. 交互与动画 (Interaction & Animation) */
      cursor: 'pointer', // 鼠标悬浮时显示“小手”光标，提示用户这是可点击的
      // transition: 'all 0.2s', // 核心：为所有可动画的属性添加过渡效果，实现平滑动画
      userSelect: 'none', //防止用户在快速点击时意外选中文本（如“开”/“关”）
      outline: 'none',
      transition: 'box-shadow 0.2s ease-in-out, background 0.2s ease',
      ['&:not(:disabled):hover']: {
        background: token.hoverBackground,
      },
      [`&.${prefixCls}-checked`]: {
        backgroundColor: token.checkedBackground,
        ['&:not(:disabled):hover']: {
          backgroundColor: token.checkedHoverBackground,
        },
      },
      // 键盘选中后持续出现的效果
      ['&:not(:disabled):focus-visible']: {
        boxShadow: '0 0 0 4px rgba(22, 119, 255, 0.2)',
      },
      [`&:not(:disabled):active`]: {
        boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  };
};
const genHandleStyle = (
  token: stringifield<SwitchDefaultToken>,
  prefixCls: string,
): CSSObject => {
  return {
    [`&.${prefixCls}`]: {
      [`.${prefixCls}-handle`]: {
        // background: token.handleBackground,
        width: token.handleSize,
        height: token.handleSize,
        // borderRadius: '50%',
        position: 'absolute',
        top: token.trackPadding,
        insetInlineStart: token.trackPadding,
        transition: 'all 0.2s ease-in-out',
        ['&::before']: {
          content: '""',
          position: 'absolute',
          insetInlineStart: 0,
          insetInlineEnd: 0,
          top: 0,
          bottom: 0,
          background: token.handleBackground,
          borderRadius: `calc(${token.handleSize} / 2)`,
          transition: 'all 0.2s ease-in-out',
        },
      },
      [`&.${prefixCls}-checked .${prefixCls}-handle`]: {
        insetInlineStart: `calc(100% - ${token.trackPadding} - ${token.handleSize})`,
      },
      // 点击时宽度增加
      ['&:not(:disabled):active']: {
        [`.${prefixCls}-handle::before`]: {
          insetInlineEnd: `calc(${token.handleActiveInset} * -1)`,
          insetInlineStart: 0,
        },
        [`&.${prefixCls}-checked .${prefixCls}-handle::before`]: {
          insetInlineStart: `calc(${token.handleActiveInset} * -1)`,
          insetInlineEnd: 0,
        },
      },
    },
  };
};
const genDisabledStyle = (
  token: stringifield<SwitchDefaultToken>,
  prefixCls: string,
): CSSObject => {
  return {
    [`&.${prefixCls}&.${prefixCls}-disabled`]: {
      cursor: 'not-allowed',
      opacity: token.disabledOpacity,
    },
  };
};
const genInnerStyle = (
  token: stringifield<SwitchDefaultToken>,
  prefixCls: string,
): CSSObject => {
  return {
    [`&.${prefixCls}`]: {
      [`.${prefixCls}-inner`]: {
        display: 'block',
        height: token.trackHeight,
        lineHeight: token.trackHeight,
        borderRadius: '100px',
        overflow: 'hidden',
        // 默认关闭情况下，左侧是handle,右侧是文字/图标，
        paddingInlineStart: token.innerMaxMargin,
        paddingInlineEnd: token.innerMinMargin,
        transition:
          'padding-inline-start 0.2s ease-in-out,padding-inline-end 0.2s ease-in-out',
        [`.${prefixCls}-inner-checked,.${prefixCls}-inner-unchecked`]: {
          display: 'block',
          fontSize: '12px',
          color: token.innerTextColor,
          transition:
            'margin-inline-start 0.2s ease-in-out,margin-inline-end 0.2s ease-in-out',
        },
        // 默认关闭情况，只有右侧的文字/图标，左侧移除当前范围
        [`.${prefixCls}-inner-checked`]: {
          marginInlineStart: `calc(-100% + calc(${token.handleSize} + ${token.trackPadding} * 2) - calc(${token.innerMaxMargin} * 2))`,
          marginInlineEnd: `calc(100% - calc(${token.handleSize} + ${token.trackPadding} * 2) + calc(${token.innerMaxMargin} * 2))`,
        },
        [`.${prefixCls}-inner-unchecked`]: {
          marginInlineStart: 0,
          marginInlineEnd: 0,
          marginTop: `calc(${token.trackHeight}*-1)`,
        },
      },
    },
    [`&.${prefixCls}.${prefixCls}-checked`]: {
      [`.${prefixCls}-inner`]: {
        paddingInlineStart: token.innerMinMargin,
        paddingInlineEnd: token.innerMaxMargin,
        [`.${prefixCls}-inner-checked`]: {
          marginInlineStart: 0,
          marginInlineEnd: 0,
        },
        [`.${prefixCls}-inner-unchecked`]: {
          marginInlineEnd: `calc(-100% + calc(${token.handleSize} + ${token.trackPadding} * 2) - calc(${token.innerMaxMargin} * 2))`,
          marginInlineStart: `calc(100% - calc(${token.handleSize} + ${token.trackPadding} * 2) + calc(${token.innerMaxMargin} * 2))`,
        },
      },
    },
  };
};
const genLoadingStyle = (
  token: stringifield<SwitchDefaultToken>,
  prefixCls: string = 'yuxi',
): CSSObject => {
  return {
    [`&.${prefixCls}-loading`]: {
      [`.${prefixCls}-handle`]: {
        [`.${prefixCls}-loading-icon`]: {
          display: 'inline-block',
          width: '1rem',
          height: '1rem',
          position: 'relative',
          top: `calc( calc(${token.handleSize} - ${token.fontSize}) / 2 )`,
          verticalAlign: 'top',
          animation: `spin 1s linear infinite`,
          [`.${prefixCls}-loading-icon-wrap`]: {
            width: '1rem',
            height: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        [`@keyframes spin`]: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: ' rotate(360deg)',
          },
        },
      },
      [`&.${prefixCls}-checked`]: {
        color: token.checkedBackground,
      },
    },
  };
};
export const genCompoentStyle = (
  token: stringifield<SwitchDefaultToken>,
  prefixCls: string = 'yuxi',
): Array<CSSObject> => {
  return [
    genSwitchStyle(token, prefixCls),
    genHandleStyle(token, prefixCls),
    genDisabledStyle(token, prefixCls),
    genInnerStyle(token, prefixCls),
    genLoadingStyle(token, prefixCls),
  ];
};
