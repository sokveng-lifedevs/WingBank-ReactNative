import { Platform, StyleSheet } from 'react-native';

// ─── Color Palette ────────────────────────────────────────────────────────────
export const Colors = {
  primary:       '#3aaa35',
  primaryDark:   '#1b6e18',
  primaryLight:  '#8DC63F',
  splashBg:      '#9ACD32',
  headerStart:   '#1b6e18',
  headerEnd:     '#7dc63f',

  accent:        '#1565C0',
  accentLight:   '#1976D2',
  danger:        '#E53935',
  warning:       '#FBC02D',
  success:       '#43A047',

  white:         '#FFFFFF',
  black:         '#0D0D0D',
  gray50:        '#FAFAFA',
  gray100:       '#F5F5F5',
  gray200:       '#EEEEEE',
  gray300:       '#E0E0E0',
  gray400:       '#BDBDBD',
  gray500:       '#9E9E9E',
  gray600:       '#757575',
  gray700:       '#616161',
  gray800:       '#424242',
  gray900:       '#212121',

  cardBg:        '#FFFFFF',
  screenBg:      '#F0F2F5',
  overlay:       'rgba(0,0,0,0.45)',
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const Font = {
  xs:      11,
  sm:      13,
  md:      15,
  lg:      17,
  xl:      20,
  xxl:     24,
  xxxl:    32,
  display: 44,
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const Space = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 28,
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────
export const Radius = {
  sm:  8,
  md:  14,
  lg:  18,
  xl:  24,
  full: 999,
} as const;

// ─── Shadows ──────────────────────────────────────────────────────────────────
export const Shadows = {
  sm: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 10 },
    android: { elevation: 5 },
  }),
  lg: Platform.select({
    ios:     { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.18, shadowRadius: 18 },
    android: { elevation: 10 },
  }),
  colored: (color: string) => Platform.select({
    ios:     { shadowColor: color, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12 },
    android: { elevation: 8 },
  }),
} as const;
