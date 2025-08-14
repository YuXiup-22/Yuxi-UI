import { createStyles } from 'antd-style';
import { ButtonBaseProps } from '../../types';
import { genCompoentStyle } from './genComponentStyle';
import { DefaultTheme } from './theme';
import { tokenToCSSVar } from './tokenToCSSVar';
type ButtonStyleProps = Pick<ButtonBaseProps, 'prefixCls'>;

export const useButtonStyles = createStyles<ButtonStyleProps>(
  ({ css }, props: ButtonStyleProps) => {
    const { prefixCls = 'yuxi' } = props;
    const customToken = { ...DefaultTheme };
    const { themeObject, tokenVarMap } = tokenToCSSVar(customToken, prefixCls);
    const cssObj = genCompoentStyle(tokenVarMap, { prefixCls });
    return css({
      ...themeObject,
      ...cssObj,
    });
  },
);
