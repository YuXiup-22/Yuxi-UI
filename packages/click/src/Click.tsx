import React from 'react';

export interface ClickProps {
  children: React.ReactNode;
}

export const Click = ({ children }: ClickProps) => {
  return <div className="click">{children}</div>;
};

Click.displayName = 'Click';
