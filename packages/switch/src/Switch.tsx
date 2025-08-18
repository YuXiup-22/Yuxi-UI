import React from 'react';

export interface SwitchProps {
  children: React.ReactNode;
}

export const Switch = ({ children }: SwitchProps) => {
  return <div className="switch">{children}</div>;
};

Switch.displayName = 'Switch';
