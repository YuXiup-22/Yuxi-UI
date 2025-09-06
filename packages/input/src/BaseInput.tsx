import React, { type ReactElement } from 'react';
import type { BaseInputProps } from './type';
import classnames from 'classnames';
export const BaseInput = (props: BaseInputProps) => {
  const {
    prefix,
    suffix,
    prefixCls,
    children,
    hashId,
    disabled,
    styles,
    addonAfter,
    addonBefore,
    allowClear,
    value,
    handleReset,
    triggerFocus,
  } = props;
  // ========affix==================
  const hasAffix = prefix ?? suffix ?? allowClear ?? false;
  if (hasAffix) {
    let clearNode: React.ReactNode = null;
    if (allowClear) {
      // TODO:value存在即出现和suffix同时存在
      const needClear = !disabled && value;
      const clearNodeCls = prefixCls + '-clear-icon';
      const cls = classnames(clearNodeCls, {
        [`${clearNodeCls}-hidden`]: !needClear,
        [`${clearNodeCls}-has-suffix`]: !!suffix,
      });
      clearNode = (
        <button
          type="button"
          className={cls}
          onClick={(e) => {
            handleReset(e);
          }}
        >
          x
        </button>
      );
    }
    const affixWrapperPrefixCls = prefixCls + '-affix-wrapper';
    const affixWrapperCls = classnames(
      affixWrapperPrefixCls,
      {
        [`${affixWrapperPrefixCls}-disabled`]: disabled,
        [`${prefixCls}-disabled`]: disabled,
      },
      hashId,
    );
    return (
      <span
        className={affixWrapperCls}
        onClick={() => {
          triggerFocus?.();
        }}
      >
        {prefix && (
          <span
            className={classnames(prefixCls + '-prefix')}
            style={styles?.prefix}
          >
            {prefix}
          </span>
        )}
        {children}
        {suffix && (
          <span
            className={classnames(prefixCls + '-suffix')}
            style={styles?.prefix}
          >
            {clearNode}
            {suffix}
          </span>
        )}
      </span>
    );
  }
  if (addonAfter || addonBefore) {
    // TODO:省略
  }
  return React.cloneElement(children as ReactElement<any>, {
    className: classnames(
      (children as ReactElement<any>).props.className,
      hashId,
    ),
  });
};
