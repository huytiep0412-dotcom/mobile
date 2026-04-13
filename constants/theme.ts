/**
 * Smart Garden Theme - Vườn Cây Thông Minh
 * Green nature-inspired color palette
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1B2E1B',
    textSecondary: '#5A6F5A',
    textLight: '#8FA38F',
    background: '#F5F9F0',
    backgroundCard: '#FFFFFF',
    backgroundInput: '#EDF4E8',
    tint: '#2E7D32',
    tintLight: '#66BB6A',
    tintDark: '#1B5E20',
    secondary: '#1565C0',
    secondaryLight: '#42A5F5',
    accent: '#FF8F00',
    accentLight: '#FFB74D',
    icon: '#5A6F5A',
    tabIconDefault: '#8FA38F',
    tabIconSelected: '#2E7D32',
    border: '#DCE8D4',
    borderLight: '#EDF4E8',
    success: '#2E7D32',
    warning: '#F57F17',
    danger: '#C62828',
    info: '#1565C0',
    shadow: 'rgba(46, 125, 50, 0.08)',
    gradientStart: '#2E7D32',
    gradientEnd: '#66BB6A',
    tabBar: '#FFFFFF',
    tabBarBorder: '#DCE8D4',
  },
  dark: {
    text: '#E8F5E9',
    textSecondary: '#A5D6A7',
    textLight: '#6B9B6E',
    background: '#0D1B0E',
    backgroundCard: '#1A2E1C',
    backgroundInput: '#1A2E1C',
    tint: '#66BB6A',
    tintLight: '#81C784',
    tintDark: '#388E3C',
    secondary: '#42A5F5',
    secondaryLight: '#64B5F6',
    accent: '#FFB74D',
    accentLight: '#FFCC02',
    icon: '#A5D6A7',
    tabIconDefault: '#6B9B6E',
    tabIconSelected: '#66BB6A',
    border: '#2E4A30',
    borderLight: '#1A2E1C',
    success: '#66BB6A',
    warning: '#FFB74D',
    danger: '#EF5350',
    info: '#42A5F5',
    shadow: 'rgba(0, 0, 0, 0.3)',
    gradientStart: '#1B5E20',
    gradientEnd: '#388E3C',
    tabBar: '#0D1B0E',
    tabBarBorder: '#2E4A30',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  hero: 40,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'ui-rounded',
    mono: 'Menlo',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
