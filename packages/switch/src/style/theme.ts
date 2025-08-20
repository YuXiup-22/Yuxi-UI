export interface SwitchDefaultToken {
  // base
  color: string;
  fontWeight: number;
  fontSize: string;
  trackMinWidth: string;
  trackHeight: string;
  backgroundUnchecked: string;
  hoverBackground: string;
  checkedBackground: string;
  checkedHoverBackground: string;
  disabledOpacity: number;
  // handle
  handleBackground: string;
  handleSize: string;
  trackPadding: string;
}
export const DefaultTheme: SwitchDefaultToken = {
  // base
  color: 'rgba(0, 0, 0, 0.88)',
  fontWeight: 400,
  fontSize: '14px',
  trackMinWidth: '44px',
  trackHeight: '22px',
  backgroundUnchecked: 'rgba(0,0,0,0.25)',
  hoverBackground: 'rgba(0,0,0,0.45)',
  checkedBackground: '#1677ff',
  checkedHoverBackground: '#4096ff',
  disabledOpacity: 0.65,
  // handle
  handleBackground: '#ffffff',
  handleSize: '18px',
  trackPadding: '2px',
};
