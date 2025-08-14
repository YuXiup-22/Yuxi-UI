export interface ButtonDefaultToken {
  // base:
  fontWeigth: number;
  iconGap: string;
  borderLineWidth: string;
  // type:border/backgroundColor/color/hover/active
  defaultBorderColor: string;
  defaultHoverBorderColor: string;
  defaultActiveBorderColor: string;
  // backgroundColor
  defaultBackgroundColor: string;
  primaryBackgroundColor: string;
  textHoverBackgroundColor: string;
  textActiveBackgroundColor: string;
  primaryHoverBackgroundColor: string;
  primaryActiveBackgroundColor: string;
  // color
  defaultColor: string;
  primaryColor: string;
  linkColor: string;
  defaultHoverColor: string;
  linkHoverColor: string;
  defaultActiveColor: string;
  linkActiveColor: string;
  // size
  // shape
}
export const DefaultTheme: ButtonDefaultToken = {
  fontWeigth: 400,
  iconGap: '8px',
  borderLineWidth: '1px',

  defaultBorderColor: '#d9d9d9',
  defaultHoverBorderColor: '#4096ff',
  defaultActiveBorderColor: '#0958d9',

  defaultBackgroundColor: '#ffffff',
  primaryBackgroundColor: '#1677ff',
  textHoverBackgroundColor: 'rgba(0, 0, 0, 0.04)',
  textActiveBackgroundColor: 'rgba(0, 0, 0, 0.1)',
  primaryHoverBackgroundColor: '#4096ff',
  primaryActiveBackgroundColor: '#0958d9',

  defaultColor: 'rgba(0, 0, 0,0.88)',
  primaryColor: '#ffffff',
  linkColor: '#1677ff',
  defaultHoverColor: '#4096ff',
  defaultActiveColor: '#0958d9',
  linkActiveColor: '#0958d9',
  linkHoverColor: '#69b1ff',
};
// TODO:可以将硬编码再分类
