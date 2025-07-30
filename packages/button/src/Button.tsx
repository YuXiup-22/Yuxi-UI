import React from 'react';
import { ButtonProps } from './types';
import classnames from 'classnames';
import './style/index.scss';
export const Button = (props: ButtonProps) => {
  const {
    type = 'default',
    size = 'middle',
    shape = 'default',
    children,
    href,
    htmlType = 'button',
    ...rest
  } = props;

  // =============render==============
  if (href !== undefined) {
    //
  }
  const prefixCls = 'yuxi-button';
  const classes = classnames(prefixCls, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${size}`]: size,
    [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
  });
  console.log(classes);
  return (
    <button className={classes} type={htmlType} {...rest}>
      {children}
    </button>
  );
};
