import { CSSObject } from 'antd-style';
import { ButtonDefaultToken } from './theme';
import { stringifield } from './tokenToCSSVar';
import { ButtonStyleProps } from './styleProvider';

const generateBaseStyles = (
  token: stringifield<ButtonDefaultToken>,
): {
  base: CSSObject;
  defaultSize: CSSObject;
  defaultRadios: CSSObject;
} => {
  return {
    base: {
      fontWeight: token.fontWeigth,
      // 继承父元素的字体样式
      fontFamily: 'inherit',
      // 移除文本的装饰线，例如超链接的下划线。
      textDecoration: 'none',
      // 避免因文字内容自动换行，尽管没有设置宽度，但是触发到边界的时也会换行
      whiteSpace: 'nowrap',
      // 水平居中
      textAlign: 'center',
      backgroundImage: 'none',
      cursor: 'pointer',
      // 移除掉浏览器默认的focus样式，最好自己添加focus自定义
      outline: 'none',
      // 使得按钮在 :hover、:active、loading 或 disabled 状态之间切换时，视觉上更加流畅
      transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',
      display: 'flex',
      alignItems: 'center',
      // 若存在icon，给icon和button内容提供间距
      gap: token.iconGap,
    },
    defaultSize: {
      height: '32px',
      fontSize: '14px',
      padding: '0 15px',
    },
    defaultRadios: {
      borderRadius: '6px',
    },
  };
};
const generateTypeStyle = (
  type: ButtonStyleProps['type'],
  token: stringifield<ButtonDefaultToken>,
): CSSObject => {
  let backgroundColor;
  let color;
  let hover;
  let active;
  switch (type) {
    case 'default':
    case 'dashed':
      backgroundColor = token.defaultBackgroundColor;
      color = token.defaultColor;
      hover = {
        color: token.defaultHoverColor,
        borderColor: token.defaultHoverBorderColor,
      };
      active = {
        color: token.defaultActiveColor,
        borderColor: token.defaultActiveBorderColor,
      };
      break;
    case 'primary':
      backgroundColor = token.primaryBackgroundColor;
      color = token.primaryColor;
      hover = {
        backgroundColor: token.primaryHoverBackgroundColor,
      };
      active = {
        backgroundColor: token.primaryActiveBackgroundColor,
      };
      break;
    case 'link':
      backgroundColor = 'transparent';
      color = token.linkColor;
      hover = {
        color: token.linkHoverColor,
      };
      active = {
        color: token.linkActiveColor,
      };
      break;
    default:
      backgroundColor = 'transparent';
      color = token.defaultColor;
      hover = {
        backgroundColor: token.textHoverBackgroundColor,
      };
      active = {
        backgroundColor: token.textActiveBackgroundColor,
      };
      break;
  }
  return {
    border: `1px ${type === 'dashed' ? 'dashed' : 'solid'} ${['dashed', 'default'].includes(type!!) ? token.defaultBorderColor : 'transparent'}`,
    backgroundColor,
    color,
    ['&:not(:disabled):hover']: hover,
    ['&:not(:disabled):active']: active,
  };
};

export const genCompoentStyle = (
  token: stringifield<ButtonDefaultToken>,
  props: ButtonStyleProps,
): CSSObject => {
  const { prefixCls = 'yuxi' } = props;

  const { base, defaultSize, defaultRadios } = generateBaseStyles(token);
  return {
    [`&.${prefixCls}`]: {
      ...base,
      ...defaultSize,
      ...defaultRadios,
    },
    [`&.${prefixCls}-primary`]: generateTypeStyle('primary', token),
    [`&.${prefixCls}-default`]: generateTypeStyle('default', token),
    [`&.${prefixCls}-text`]: generateTypeStyle('text', token),
    [`&.${prefixCls}-link`]: generateTypeStyle('link', token),
    [`&.${prefixCls}-dashed`]: generateTypeStyle('dashed', token),
  };
};
