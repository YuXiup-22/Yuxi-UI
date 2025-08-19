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
      transition: 'all 0.2s', // 核心：为所有可动画的属性添加过渡效果，实现平滑动画
      userSelect: 'none', //防止用户在快速点击时意外选中文本（如“开”/“关”）
      ['&:hover']: {
        background: token.hoverBackground,
      },
      [`&.${prefixCls}-checked`]: {
        backgroundColor: token.checkedBackground,
        ['&:hover']: {
          backgroundColor: token.checkedHoverBackground,
        },
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
        background: token.handleBackground,
        width: token.handleSize,
        height: token.handleSize,
        borderRadius: '50%',
        position: 'absolute',
        top: token.trackPadding,
        insetInlineStart: token.trackPadding,
      },
      [`&.${prefixCls}-checked .${prefixCls}-handle`]: {
        insetInlineStart: 'auto',
        insetInlineEnd: token.trackPadding,
      },
    },
  };
};
export const genCompoentStyle = (
  token: stringifield<SwitchDefaultToken>,
  prefixCls: string = 'yuxi',
): Array<CSSObject> => {
  return [genSwitchStyle(token, prefixCls), genHandleStyle(token, prefixCls)];
};
