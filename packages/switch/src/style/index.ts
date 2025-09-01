import { createStyles } from 'antd-style';
import type { SwitchProps } from '../type';
import { genCompoentStyle } from './genComponentStyle';
import { DefaultTheme } from './theme';
import { myDeepMerge, tokenToCSSVar } from '@yuxi-ui/util';
type SwitchPropsStyle = Pick<SwitchProps, 'prefixCls'>;
export const useSwitchStyles = createStyles<SwitchPropsStyle>(
  ({ css }, props: SwitchPropsStyle) => {
    const { prefixCls = 'yuxi' } = props;
    const token = { ...DefaultTheme };
    const { tokenVarMap, themeObject } = tokenToCSSVar(token, prefixCls);
    const switchStyles = genCompoentStyle(tokenVarMap, prefixCls);
    const cssTheme = themeObject;

    const finalSwitch = myDeepMerge({}, ...switchStyles);
    return css({
      ...cssTheme,
      ...finalSwitch,
    });
  },
);
