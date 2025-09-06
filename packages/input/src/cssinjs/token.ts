export interface InputDefaultToken {
  // base
  color: string;
  colorDisabled: string;
  fontSize: string;
  height: string;
  paddingBlock: string;
  paddingInline: string;
  borderRadios: string;
  borderColor: string;
  borderPrimayColor: string;
  backgroundColorDisabled: string;
  lineHeight: number;
}

export const DefaultTheme: InputDefaultToken = {
  color: 'rgba(0,0,0,0.88)',
  colorDisabled: 'rgba(0,0,0,0.25)',
  fontSize: '14px',
  height: '32px',
  paddingBlock: '4px',
  paddingInline: '11px',
  borderRadios: '6px',
  borderColor: '#d9d9d9',
  borderPrimayColor: '#1677ff',
  lineHeight: 1.57,
  backgroundColorDisabled: 'rgba(0,0,0,0.04)',
};
