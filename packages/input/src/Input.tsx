import React, { useContext, useImperativeHandle, useRef } from 'react';
import type { InputProps } from './type';
import { useMergedValue } from '@yuxi-ui/util';
import { ConfigContext } from '@yuxi-ui/config-provider';
import classnames from 'classnames';
import { useInputStyle } from './cssinjs';
import { BaseInput } from './BaseInput';
export const Input = (props: InputProps) => {
  const {
    value,
    defaultValue,
    onChange,
    disabled,
    ref,
    prefix,
    suffix,
    styles,
    prefixCls: customPrefixCls,
    addonAfter,
    addonBefore,
    allowClear,
    ...rest
  } = props;
  // =============value==============
  const [mergedValue, triggerChange] = useMergedValue(defaultValue, {
    value: value,
  });
  // 可能存在value/defaultValue都不存在的情况，做最后的兜底
  const formatValue =
    mergedValue === undefined || mergedValue === null
      ? ''
      : String(mergedValue);
  const inputRef = useRef<HTMLInputElement>(null);
  // ============style=============
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('input', customPrefixCls);
  const { styles: hashId } = useInputStyle(prefixCls);
  const cls = classnames(prefixCls, {
    [`${prefixCls}-disabled`]: disabled ?? false,
  });
  const innerHandleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    triggerChange(e.target.value);
    // TODO:校验长度时，需要克隆事件，传递允许范围的值
    onChange?.(e);
  };
  // =============暴露方法==============
  useImperativeHandle(ref, () => {
    return {
      focus,
    };
  }, []);
  const focus = () => {
    inputRef.current?.focus();
  };
  const handleReset = (_e: React.MouseEvent<HTMLButtonElement>) => {
    triggerChange('');
    focus();
  };
  let element = (
    <BaseInput
      hashId={hashId}
      prefixCls={prefixCls}
      prefix={prefix}
      suffix={suffix}
      styles={styles}
      disabled={disabled}
      addonAfter={addonAfter}
      addonBefore={addonBefore}
      allowClear={allowClear}
      value={formatValue}
      handleReset={handleReset}
      triggerFocus={focus}
    >
      <input
        className={cls}
        ref={inputRef}
        value={formatValue}
        disabled={disabled ?? false}
        onChange={innerHandleChange}
        type="text"
        {...rest}
      ></input>
    </BaseInput>
  );
  return element;
};

Input.displayName = 'Input';
