import React, { useContext } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../../config-provider/src/index';
import { SwitchProps } from './type';
import { useSwitchStyles } from './style/index';
export const Switch = (props: SwitchProps) => {
  const { prefixCls: customPrefixCls } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('switch', customPrefixCls);
  const { styles } = useSwitchStyles({
    prefixCls,
  });
  const trackCls = classnames(styles, prefixCls, {
    [`${prefixCls}-checked`]: true,
  });
  return (
    <button type="button" role="switch" className={trackCls}>
      <div className={`${prefixCls}-handle`}></div>
    </button>
  );
};

Switch.displayName = 'Switch';
