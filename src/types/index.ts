// ─── Navigation Types ───────────────────────────────────────────────────────
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Cards: undefined;
  Transfer: undefined;
  More: undefined;
};

// ─── Data Types ──────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  balance: number;
  avatar: string;
}

export interface Transaction {
  id: string;
  name: string;
  time: string;
  amount: number;
  type: 'credit' | 'debit';
  icon: string;
  category: string;
}

export interface Card {
  id: string;
  number: string;
  name: string;
  expiry: string;
  type: 'VISA' | 'MASTERCARD';
  colors: string[];
  balance: number;
}

export interface PromoItem {
  id: string;
  title: string;
  colors: [string, string];
  emoji: string;
}

export interface QuickAction {
  id: string;
  icon: string;
  label: string;
  screen?: string;
}
