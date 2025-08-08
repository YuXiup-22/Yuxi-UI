import React from 'react';

export interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  return <div className="config-provider">{children}</div>;
};

ConfigProvider.displayName = 'ConfigProvider';
