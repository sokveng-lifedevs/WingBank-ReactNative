import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Font, Radius, Shadows } from '../theme';
import { CARDS, TRANSACTIONS } from '../theme/data';
import type { Card } from '../types';

const { width } = Dimensions.get('window');

const SPEND_DATA = [
  { label: 'Food & Dining', amount: 124.5,  pct: 0.65, color: '#FF7043' },
  { label: 'Transport',     amount: 38.0,   pct: 0.30, color: '#42A5F5' },
  { label: 'Shopping',      amount: 210.0,  pct: 0.80, color: '#AB47BC' },
  { label: 'Bills',         amount: 63.0,   pct: 0.42, color: '#26A69A' },
];

export default function CardsScreen(): React.JSX.Element {
  const [activeCard, setActiveCard] = useState<string>(CARDS[0].id);
  const [hidden,     setHidden]     = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <View style={s.header}>
        <Text style={s.title}>My Cards</Text>
        <TouchableOpacity style={s.addBtn}>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Card Carousel */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 16, paddingBottom: 6 }}>
          {CARDS.map((card: Card) => {
            const active = activeCard === card.id;
            return (
              <TouchableOpacity key={card.id} onPress={() => setActiveCard(card.id)} activeOpacity={0.9}>
                <LinearGradient colors={card.colors as [string, string]} style={[s.bankCard, active && s.bankCardActive]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  {/* Decorative circles */}
                  <View style={s.circle1} />
                  <View style={s.circle2} />

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 }}>
                    <Text style={s.cBrand}>🐦 Wing Bank</Text>
                    <Text style={s.cType}>{card.type}</Text>
                  </View>
                  <Text style={s.cNum}>•••• •••• •••• {card.number}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={s.cSubLabel}>CARD HOLDER</Text>
                      <Text style={s.cSubVal}>{card.name}</Text>
                    </View>
                    <View>
                      <Text style={s.cSubLabel}>EXPIRES</Text>
                      <Text style={s.cSubVal}>{card.expiry}</Text>
                    </View>
                    <View>
                      <Text style={s.cSubLabel}>BALANCE</Text>
                      <TouchableOpacity onPress={() => setHidden(h => !h)}>
                        <Text style={s.cSubVal}>{hidden ? '••••' : `$${card.balance.toLocaleString()}`}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Dots indicator */}
        <View style={s.dots}>
          {CARDS.map(c => (
            <View key={c.id} style={[s.dot, activeCard === c.id && s.dotActive]} />
          ))}
        </View>

        {/* Card Actions */}
        <View style={s.actionsCard}>
          {[
            { icon: 'lock-closed-outline', label: 'Freeze',   color: Colors.accent },
            { icon: 'settings-outline',    label: 'Settings', color: Colors.primary },
            { icon: 'swap-horizontal',     label: 'Limits',   color: Colors.warning },
            { icon: 'help-circle-outline', label: 'Support',  color: Colors.danger },
          ].map(a => (
            <TouchableOpacity key={a.label} style={s.actionItem} activeOpacity={0.75}>
              <View style={[s.actionIcon, { backgroundColor: a.color + '18' }]}>
                <Ionicons name={a.icon as any} size={22} color={a.color} />
              </View>
              <Text style={s.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spending Overview */}
        <View style={s.section}>
          <Text style={s.sTitle}>Spending This Month</Text>
          {SPEND_DATA.map(sp => (
            <View key={sp.label} style={s.spendCard}>
              <View style={s.spendTop}>
                <Text style={s.spendLabel}>{sp.label}</Text>
                <Text style={s.spendAmt}>${sp.amount.toFixed(2)}</Text>
              </View>
              <View style={s.progBg}>
                <View style={[s.progFill, { width: `${sp.pct * 100}%`, backgroundColor: sp.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Recent card transactions */}
        <View style={s.section}>
          <Text style={s.sTitle}>Card Transactions</Text>
          {TRANSACTIONS.slice(0, 3).map(tx => (
            <View key={tx.id} style={s.txRow}>
              <View style={[s.txIcon, { backgroundColor: tx.type === 'credit' ? '#E8F5E9' : '#FFEBEE' }]}>
                <Ionicons name={tx.icon as any} size={16} color={tx.type === 'credit' ? Colors.success : Colors.danger} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.txName}>{tx.name}</Text>
                <Text style={s.txTime}>{tx.time}</Text>
              </View>
              <Text style={[s.txAmt, { color: tx.type === 'credit' ? Colors.success : Colors.danger }]}>
                {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const CARD_W = width - 48;
const s = StyleSheet.create({
  root:           { flex: 1, backgroundColor: Colors.screenBg },
  header:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14 },
  title:          { fontSize: Font.xxl, fontWeight: '800', color: Colors.gray900 },
  addBtn:         { width: 40, height: 40, backgroundColor: Colors.gray100, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  bankCard:       { width: CARD_W, borderRadius: 22, padding: 22, overflow: 'hidden', ...Shadows.lg },
  bankCardActive: { transform: [{ scale: 1.02 }] },
  circle1:        { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -40 },
  circle2:        { position: 'absolute', width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.06)', bottom: -30, left: 20 },
  cBrand:         { color: Colors.white, fontSize: Font.lg, fontWeight: '800' },
  cType:          { color: 'rgba(255,255,255,0.85)', fontWeight: '700', fontSize: Font.sm },
  cNum:           { color: Colors.white, fontSize: Font.lg, letterSpacing: 3, fontWeight: '600', marginBottom: 22 },
  cSubLabel:      { color: 'rgba(255,255,255,0.6)', fontSize: Font.xs, marginBottom: 2 },
  cSubVal:        { color: Colors.white, fontSize: Font.sm, fontWeight: '700' },
  dots:           { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12, marginBottom: 4 },
  dot:            { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.gray300 },
  dotActive:      { width: 18, backgroundColor: Colors.primary },
  actionsCard:    { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.white, marginHorizontal: 16, marginTop: 14, borderRadius: 18, padding: 20, ...Shadows.sm },
  actionItem:     { alignItems: 'center', gap: 6 },
  actionIcon:     { width: 50, height: 50, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  actionLabel:    { fontSize: Font.xs, color: Colors.gray700, fontWeight: '500' },
  section:        { padding: 16, marginTop: 4 },
  sTitle:         { fontSize: Font.lg, fontWeight: '700', color: Colors.gray900, marginBottom: 12 },
  spendCard:      { backgroundColor: Colors.white, borderRadius: Radius.md, padding: 16, marginBottom: 10, ...Shadows.sm },
  spendTop:       { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  spendLabel:     { fontSize: Font.md, fontWeight: '600', color: Colors.gray900 },
  spendAmt:       { fontSize: Font.md, fontWeight: '700', color: Colors.gray900 },
  progBg:         { height: 8, backgroundColor: Colors.gray100, borderRadius: 4, overflow: 'hidden' },
  progFill:       { height: 8, borderRadius: 4 },
  txRow:          { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.md, padding: 14, marginBottom: 8, ...Shadows.sm },
  txIcon:         { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txName:         { fontSize: Font.md, fontWeight: '600', color: Colors.gray900 },
  txTime:         { fontSize: Font.xs, color: Colors.gray500, marginTop: 2 },
  txAmt:          { fontSize: Font.md, fontWeight: '700' },
});
