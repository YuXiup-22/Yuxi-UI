import type {
  CSSProperties,
  InputHTMLAttributes,
  Ref,
  ReactNode,
  ReactElement,
  MouseEvent,
} from 'react';

interface InputHandleProps {
  focus: () => void;
}
// 继承input原生属性
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  ref?: Ref<InputHandleProps>;
  prefixCls?: string;
  /**带有前缀图标的 input */
  prefix?: ReactNode;
  /**带有后缀图标的 input */
  suffix?: ReactNode;
  styles?: {
    prefix?: CSSProperties;
    suffix?: CSSProperties;
  };
  /**前置标签 */
  addonBefore?: ReactNode;
  /**后置标签 */
  addonAfter?: ReactNode;
  /**允许清空 */
  allowClear?: boolean;
}

export interface BaseInputProps extends InputProps {
  children: ReactElement;
  hashId: string;
  handleReset: (e: MouseEvent<HTMLButtonElement>) => void;
  triggerFocus: () => void;
}
