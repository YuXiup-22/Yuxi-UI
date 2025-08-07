import React from 'react';

// 设置只读属性：as const,确定单一数据源，只可以在此处更改，不可以在定义后再去删除添加或者修改
const _ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const;
type ButtonTypes = (typeof _ButtonTypes)[number];
const _ButtonSizes = ['large', 'middle', 'small'] as const;
/**默认middle */
type ButtonSizes = (typeof _ButtonSizes)[number];
const _ButtonShapes = ['default', 'circle', 'round'] as const;
type ButtonShapes = (typeof _ButtonShapes)[number];
const _ButtonHtmlTypes = ['submit', 'button', 'reset'] as const;
type ButtonHtmlTypes = (typeof _ButtonHtmlTypes)[number];
const _ButtonIconPosition = ['start', 'end'] as const;
type ButtonIconPosition = (typeof _ButtonIconPosition)[number];
export interface LoadingConfig {
  delay?: number;
  icon?: React.ReactNode;
}
interface ButtonBaseProps {
  type?: ButtonTypes;
  size?: ButtonSizes;
  shape?: ButtonShapes;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean | LoadingConfig;
  icon?: React.ReactNode;
  iconPosition?: ButtonIconPosition;
}
type MergedHTMLAttributes = Omit<
  // 这是最基础、最通用的类型。
  // 它包含了所有标准 HTML 元素共有的属性，
  // 比如 id, className, style, title, lang, 以及 data-* 自定义属性等
  React.HtmlHTMLAttributes<HTMLElement> &
    React.AudioHTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement>, //
  'type' | 'color'
>;
export interface ButtonProps extends ButtonBaseProps, MergedHTMLAttributes {
  href?: string;
  htmlType?: ButtonHtmlTypes;
}
