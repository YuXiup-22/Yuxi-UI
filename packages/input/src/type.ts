import type { InputHTMLAttributes, Ref } from 'react';

// 继承input原生属性
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>;
}
