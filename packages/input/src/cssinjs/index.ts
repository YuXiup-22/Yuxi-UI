import { createStyles, type CSSObject } from 'antd-style';
import { DefaultTheme, type InputDefaultToken } from './token';
import { tokenToCSSVar, type stringifield, myDeepMerge } from '@yuxi-ui/util';
export const useInputStyle = createStyles(({ css }, prefixCls: string) => {
  const token = { ...DefaultTheme };
  const { themeObject, tokenVarMap } = tokenToCSSVar(token, prefixCls);
  const inputStyles = genCompoentStyle(tokenVarMap, prefixCls);
  const finalInputStyles = myDeepMerge({}, ...inputStyles);
  return css({
    ...themeObject,
    ...finalInputStyles,
  });
});

const genCompoentStyle = (
  token: stringifield<InputDefaultToken>,
  prefixCls: string,
): Array<CSSObject> => {
  return [
    genInputBaseStyle(token, prefixCls),
    getAffixWrapperStyle(token, prefixCls),
  ];
};
const genBaseStyle = (
  token: stringifield<InputDefaultToken>,
  prefixCls: string,
): CSSObject => {
  return {
    position: 'relative',
    display: 'inline-block',
    margin: 0,
    color: token.color,
    fontFamily:
      " AlibabaSans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    fontSize: token.fontSize,
    width: '100%',
    padding: `${token.paddingBlock} ${token.paddingInline}`,
    borderRadius: token.borderRadios,
    lineHeight: token.lineHeight,
    transition: 'all 0.2s',
    outline: 'none',

    border: `1px solid ${token.borderColor}`,
    backgroundColor: '#ffffff',
    // 伪元素，给这个占位符元素的
    ['::placeholder']: {
      color: token.borderColor,
    },
    // 伪类，有placeholder属性且value值为空时就出现,是个这个输入框的
    ['&:placeholder-shown']: {
      // 超出文本用 '...'结尾，在不可换行且超出部分隐藏时出现
      textOverflow: 'ellipsis',
    },
    [`&:not(.${prefixCls}-disabled):hover`]: {
      borderColor: token.borderPrimayColor,
    },
  };
};
const genInputBaseStyle = (
  token: stringifield<InputDefaultToken>,
  prefixCls: string,
): CSSObject => {
  return {
    [`&.${prefixCls},.${prefixCls}`]: {
      ...genBaseStyle(token, prefixCls),
    },
    [`&.${prefixCls}-disabled,.${prefixCls}-disabled`]: genDisabledStyle(
      token,
      prefixCls,
    ),
    [`&.${prefixCls}:focus`]: {
      ...genFocusStyle(token, prefixCls),
    },
  };
};
const genDisabledStyle = (
  token: stringifield<InputDefaultToken>,
  _prefixCls: string,
): CSSObject => {
  return {
    cursor: 'not-allowed',
    color: token.colorDisabled,
    backgroundColor: token.backgroundColorDisabled,
  };
};
const genFocusStyle = (
  token: stringifield<InputDefaultToken>,
  _prefixCls: string,
): CSSObject => {
  return {
    borderColor: token.borderPrimayColor,
    boxShadow: '0 0 0 2px rgba(5, 145, 255, 0.1)',
  };
};
const getAffixWrapperStyle = (
  token: stringifield<InputDefaultToken>,
  prefixCls: string,
): CSSObject => {
  const affixCls = prefixCls + '-affix-wrapper';
  return {
    [`&.${affixCls}`]: {
      ...genBaseStyle(token, prefixCls),
      gap: '4px',
      display: 'inline-flex',
      [`> input.${prefixCls}`]: {
        // width: '100%',
        // display: 'inline-flex',
        border: 'none',
        outline: 'none',
        padding: '0',
        [`&.${prefixCls}-disabled`]: {
          cursor: 'not-allowed',
          ['::placeholder']: {
            color: token.colorDisabled,
            userSelect: 'none',
          },
        },
      },
      [`.${prefixCls}-prefix,.${prefixCls}-suffix`]: {
        display: 'flex',
        alignItems: 'center',

        ...genClearIconStyle(token, prefixCls),
      },
      [':focus-within']: {
        ...genFocusStyle(token, prefixCls),
      },
    },
    [`&.${affixCls}-disabled`]: genDisabledStyle(token, prefixCls),
  };
};
const genClearIconStyle = (
  _token: stringifield<InputDefaultToken>,
  prefixCls: string,
): CSSObject => {
  const clearIconCls = prefixCls + '-clear-icon';
  return {
    [`.${clearIconCls}`]: {
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0.25)',
      border: 'none',
      fontSize: '8px',
      borderRadius: '50%',
      color: '#fff',
      width: '12px',
      height: '12px',
      display: 'inline-flex',
      justifyContent: 'center',
      transition: 'background-color 0.3s',
      [`&:hover`]: {
        backgroundColor: 'rgba(0,0,0,0.45)',
      },
      [`&.${clearIconCls}-hidden`]: {
        // display: 'none',
        visibility: 'hidden', //不改变布局
      },
      [`&.${clearIconCls}-has-suffix`]: {
        marginRight: '4px',
      },
    },
  };
};
