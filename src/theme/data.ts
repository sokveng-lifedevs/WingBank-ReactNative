import { User, Transaction, Card, PromoItem, QuickAction } from '../types';

export const CURRENT_USER: User = {
  id: '001',
  name: 'Ean SokVeng',
  email: 'eansokveng@wingbank.com.kh',
  accountNumber: '1234-5678-9012',
  balance: 12485.50,
  avatar: 'ES',
};

export const TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Salary Received',     time: 'Today, 09:00',      amount: 2500,  type: 'credit', icon: 'arrow-down',       category: 'Income' },
  { id: '2', name: 'ABA Bank Transfer',   time: 'Today, 14:32',      amount: 250,   type: 'debit',  icon: 'arrow-up',         category: 'Transfer' },
  { id: '3', name: 'Grab Food',           time: 'Yesterday, 19:15',  amount: 12.50, type: 'debit',  icon: 'fast-food-outline', category: 'Food' },
  { id: '4', name: 'Electric Bill',       time: 'Sep 28, 08:00',     amount: 45,    type: 'debit',  icon: 'flash-outline',     category: 'Bills' },
  { id: '5', name: 'Freelance Payment',   time: 'Sep 27, 10:30',     amount: 800,   type: 'credit', icon: 'laptop-outline',    category: 'Income' },
  { id: '6', name: 'Phnom Penh Water',    time: 'Sep 26, 11:00',     amount: 18,    type: 'debit',  icon: 'water-outline',     category: 'Bills' },
];

export const CARDS: Card[] = [
  { id: '1', number: '4821', name: 'EAN SOKVENG', expiry: '09/28', type: 'VISA',       colors: ['#1b6e18', '#3aaa35'], balance: 12485.50 },
  { id: '2', number: '9034', name: 'EAN SOKVENG', expiry: '12/27', type: 'MASTERCARD', colors: ['#1565C0', '#1976D2'], balance: 3200.00  },
];

export const PROMOS: PromoItem[] = [
  { id: '1', title: 'Hello JibJib',  colors: ['#43A047', '#81C784'], emoji: '🐦' },
  { id: '2', title: 'Mission',       colors: ['#1E88E5', '#64B5F6'], emoji: '🛵' },
  { id: '3', title: 'WingFlex',      colors: ['#7CB342', '#AED581'], emoji: '📱' },
  { id: '4', title: 'Custom Card',   colors: ['#1565C0', '#42A5F5'], emoji: '🎨' },
];

export const QUICK_ACTIONS: QuickAction[] = [
  { id: '1', icon: 'wallet-outline',         label: 'Account' },
  { id: '2', icon: 'phone-portrait-outline', label: 'Top-Up' },
  { id: '3', icon: 'receipt-outline',        label: 'Pay Bills' },
  { id: '4', icon: 'arrow-up-circle-outline',label: 'Transfer' },
];
