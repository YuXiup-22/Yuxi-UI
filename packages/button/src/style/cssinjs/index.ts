import { createStyles, type CSSObject } from 'antd-style';
import { ButtonBaseProps } from '../../types';
type ButtonStyleProps = Pick<
  ButtonBaseProps,
  'type' | 'size' | 'shape' | 'iconPosition' | 'prefixCls'
> & {
  innerLoading?: boolean;
};

export const useButtonStyles = createStyles<ButtonStyleProps>(
  ({ css, token, cx }, props: ButtonStyleProps) => {
    console.log(css, token, cx);
    const {
      type = 'default',

      prefixCls = 'yuxi',
    } = props;
    const { base, defaultSize, defaultRadios } = generateBaseStyles();
    const a = {
      [`.${prefixCls}`]: {
        ...base,
        ...defaultSize,
        ...defaultRadios,
      },
      [`.${prefixCls}-${type}`]: generateTypeStyle(type),
    };
    console.log(a, css(a));
    // return {
    //   root: css(a),
    // };
    return css(a);
  },
);
const generateBaseStyles = (): {
  base: CSSObject;
  defaultSize: CSSObject;
  defaultRadios: CSSObject;
} => {
  return {
    base: {
      fontWeight: 400,
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
      gap: '8px',
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
const generateTypeStyle = (type: ButtonBaseProps['type']): CSSObject => {
  let backgroundColor;
  let color;
  let hover;
  let active;
  switch (type) {
    case 'default':
    case 'dashed':
      backgroundColor = '#ffffff';
      color = 'rgb(0 0 0 / 88%)';
      hover = {
        color: '#4096ff',
        borderColor: '#4096ff',
      };
      active = {
        color: '#0958d9',
        borderColor: '#0958d9',
      };
      break;
    case 'primary':
      backgroundColor = '#1677ff';
      color = '#fff';
      hover = {
        backgroundColor: '#4096ff',
      };
      active = {
        backgroundColor: '#0958d9',
      };
      break;
    case 'link':
      backgroundColor = 'transparent';
      color = '#1677ff';
      hover = {
        color: '#69b1ff',
      };
      active = {
        color: '#0958d9',
      };
      break;
    default:
      backgroundColor = 'transparent';
      color = 'rgb(0 0 0 / 88%)';
      hover = {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      };
      active = {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      };
      break;
  }
  return {
    border: `1px ${type === 'dashed' ? 'dashed' : 'solid'} ${['dashed', 'default'].includes(type!!) ? '#d9d9d9' : 'transparent'}`,
    backgroundColor,
    color,
    ['&:not(:disabled):hover']: hover,
    ['&:not(:disabled):active']: active,
  };
};
