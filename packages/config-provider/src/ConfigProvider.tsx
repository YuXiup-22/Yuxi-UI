import React, { createContext } from 'react';
interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customPrefixCls?: string) => string;
}
const DEFAULTPREFIXCLS = 'yuxi';
const defaultGetPrefixCls = (suffixCls?: string, customPrefixCls?: string) => {
  // 有自定义时，完全接纳
  if (customPrefixCls) {
    return customPrefixCls;
  }
  // 无自定义时,拼接前缀和组件名
  return suffixCls ? `${DEFAULTPREFIXCLS}-${suffixCls}` : DEFAULTPREFIXCLS;
};
export const ConfigContext = createContext<ConfigConsumerProps>({
  getPrefixCls: defaultGetPrefixCls,
});

export interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

ConfigProvider.displayName = 'ConfigProvider';
