import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Animated, Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Font, Radius, Shadows } from '../theme';
import { CURRENT_USER, TRANSACTIONS, PROMOS, QUICK_ACTIONS } from '../theme/data';
import type { Transaction, PromoItem, QuickAction } from '../types';

const { width } = Dimensions.get('window');

// ─── Sub-components ───────────────────────────────────────────────────────────
function QuickBtn({ item }: { item: QuickAction }): React.JSX.Element {
  return (
    <TouchableOpacity style={qs.wrap} activeOpacity={0.75}>
      <View style={qs.circle}>
        <Ionicons name={item.icon as any} size={28} color={Colors.white} />
      </View>
      <Text style={qs.label}>{item.label}</Text>
    </TouchableOpacity>
  );
}
const qs = StyleSheet.create({
  wrap:   { alignItems: 'center', flex: 1 },
  circle: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 8, ...Shadows.colored(Colors.primary) },
  label:  { fontSize: Font.sm, color: Colors.gray800, fontWeight: '500', textAlign: 'center' },
});

function TxRow({ tx }: { tx: Transaction }): React.JSX.Element {
  const isCredit = tx.type === 'credit';
  return (
    <View style={ts.row}>
      <View style={[ts.icon, { backgroundColor: isCredit ? '#E8F5E9' : '#FFEBEE' }]}>
        <Ionicons name={tx.icon as any} size={18} color={isCredit ? Colors.success : Colors.danger} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={ts.name}>{tx.name}</Text>
        <Text style={ts.time}>{tx.time}</Text>
      </View>
      <Text style={[ts.amt, { color: isCredit ? Colors.success : Colors.danger }]}>
        {isCredit ? '+' : '-'}${tx.amount.toFixed(2)}
      </Text>
    </View>
  );
}
const ts = StyleSheet.create({
  row:  { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, marginHorizontal: 16, marginBottom: 8, borderRadius: Radius.md, padding: 14, ...Shadows.sm, borderWidth: 1, borderColor: Colors.gray100 },
  icon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  name: { fontSize: Font.md, fontWeight: '600', color: Colors.gray900 },
  time: { fontSize: Font.xs, color: Colors.gray500, marginTop: 2 },
  amt:  { fontSize: Font.md, fontWeight: '700' },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen(): React.JSX.Element {
  const [search, setSearch]   = useState<string>('');
  const [hidden, setHidden]   = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerH = scrollY.interpolate({ inputRange: [0, 90], outputRange: [210, 130], extrapolate: 'clamp' });
  const fmt = (n: number): string => n.toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <View style={s.root}>
      {/* Collapsible Header */}
      <Animated.View style={{ height: headerH, overflow: 'hidden' }}>
        <LinearGradient colors={[Colors.headerStart, Colors.primary, Colors.headerEnd]}
          style={[s.header, { paddingTop: insets.top + 10 }]} start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1 }}>
          <View style={s.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.greet}>Good Morning 🌤️</Text>
              <Text style={s.name}>{CURRENT_USER.name}</Text>
              <Text style={s.sub}>Take a moment to check on{'\n'}your finances anytime.</Text>
            </View>
            <TouchableOpacity style={s.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color={Colors.white} />
              <View style={s.notifBadge} />
            </TouchableOpacity>
          </View>
          <View style={s.chevronRow}>
            <Ionicons name="chevron-down" size={20} color="rgba(255,255,255,0.55)" />
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {/* Main White Card */}
        <View style={s.card}>
          {/* Top bar */}
          <View style={s.topBar}>
            <TouchableOpacity style={s.rewardsPill}>
              <Text style={{ fontSize: 18, marginRight: 6 }}>🎁</Text>
              <Text style={s.rewardsTxt}>Rewards</Text>
            </TouchableOpacity>
            <View style={s.topRight}>
              <TouchableOpacity style={s.iconBtn}><Ionicons name="heart-outline" size={22} color={Colors.gray700} /></TouchableOpacity>
              <View style={s.pipe} />
              <TouchableOpacity style={s.iconBtn}><Ionicons name="notifications-outline" size={22} color={Colors.gray700} /></TouchableOpacity>
              <TouchableOpacity style={s.qrBtn}>
                <MaterialIcons name="qr-code-scanner" size={21} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search */}
          <View style={s.searchBar}>
            <Ionicons name="search-outline" size={17} color={Colors.gray400} style={{ marginRight: 8 }} />
            <TextInput placeholder="Search Favorites" placeholderTextColor={Colors.gray400}
              value={search} onChangeText={setSearch} style={s.searchInput} />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color={Colors.gray400} />
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Actions */}
          <View style={s.quickRow}>
            {QUICK_ACTIONS.map(q => <QuickBtn key={q.id} item={q} />)}
          </View>
        </View>

        {/* Balance Card */}
        <LinearGradient colors={[Colors.headerStart, Colors.primary]} style={s.balCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={s.balTop}>
            <Text style={s.balLabel}>Total Balance</Text>
            <TouchableOpacity onPress={() => setHidden(h => !h)}>
              <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>
          <Text style={s.balAmt}>{hidden ? '••••••' : `$${fmt(CURRENT_USER.balance)}`}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={s.balSub}>{CURRENT_USER.accountNumber}</Text>
            <Text style={s.balSub}>{CURRENT_USER.name.toUpperCase()}</Text>
          </View>
        </LinearGradient>

        {/* Service Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.chips} style={s.chipsWrap}>
          <TouchableOpacity style={s.chip}><MaterialIcons name="grid-view" size={19} color={Colors.gray700} /></TouchableOpacity>
          <TouchableOpacity style={s.chip}><FontAwesome5 name="money-bill-wave" size={13} color={Colors.primary} /><Text style={s.chipTxt}> Loan</Text></TouchableOpacity>
          <TouchableOpacity style={s.chip}><Feather name="credit-card" size={14} color={Colors.primary} /><Text style={s.chipTxt}> Cards</Text></TouchableOpacity>
          <TouchableOpacity style={s.chip}><MaterialCommunityIcons name="account-plus-outline" size={17} color={Colors.primary} /><Text style={s.chipTxt}> New Account</Text></TouchableOpacity>
          <TouchableOpacity style={s.chip}><Ionicons name="phone-portrait-outline" size={15} color={Colors.primary} /><Text style={s.chipTxt}> E-Money</Text></TouchableOpacity>
        </ScrollView>

        {/* Promos */}
        <View style={s.section}>
          <View style={s.sHead}><Text style={s.sTitle}>Tap to See What's New</Text></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {PROMOS.map((p: PromoItem) => (
              <TouchableOpacity key={p.id} style={s.promoCard} activeOpacity={0.85}>
                <LinearGradient colors={p.colors} style={s.promoGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={{ fontSize: 38 }}>{p.emoji}</Text>
                </LinearGradient>
                <Text style={s.promoLabel}>{p.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Transactions */}
        <View style={s.section}>
          <View style={s.sHead}>
            <Text style={s.sTitle}>Recent Transactions</Text>
            <TouchableOpacity><Text style={s.viewAll}>View All</Text></TouchableOpacity>
          </View>
          {TRANSACTIONS.slice(0, 4).map((tx: Transaction) => <TxRow key={tx.id} tx={tx} />)}
        </View>

        <View style={{ height: 32 }} />
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:        { flex: 1, backgroundColor: Colors.screenBg },
  header:      { paddingBottom: 26 },
  headerRow:   { flexDirection: 'row', paddingHorizontal: 20, alignItems: 'flex-start' },
  greet:       { color: 'rgba(255,255,255,0.85)', fontSize: Font.md, fontWeight: '500' },
  name:        { color: Colors.white, fontSize: Font.xl, fontWeight: '800', marginVertical: 3 },
  sub:         { color: 'rgba(255,255,255,0.72)', fontSize: Font.sm, lineHeight: 20 },
  notifBtn:    { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  notifBadge:  { position: 'absolute', top: 6, right: 6, width: 9, height: 9, borderRadius: 5, backgroundColor: Colors.danger, borderWidth: 1.5, borderColor: Colors.white },
  chevronRow:  { alignItems: 'center', marginTop: 10 },
  card:        { backgroundColor: Colors.white, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 20, marginTop: -20, ...Shadows.md },
  topBar:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  rewardsPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray100, borderRadius: 24, paddingVertical: 9, paddingHorizontal: 14, borderWidth: 1, borderColor: Colors.gray200 },
  rewardsTxt:  { fontSize: Font.md, fontWeight: '700', color: Colors.gray900 },
  topRight:    { flexDirection: 'row', alignItems: 'center' },
  iconBtn:     { width: 38, height: 38, justifyContent: 'center', alignItems: 'center' },
  pipe:        { width: 1, height: 18, backgroundColor: Colors.gray300, marginHorizontal: 2 },
  qrBtn:       { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.danger, justifyContent: 'center', alignItems: 'center', marginLeft: 6, ...Shadows.colored(Colors.danger) },
  searchBar:   { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray100, borderRadius: Radius.md, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 22, borderWidth: 1, borderColor: Colors.gray200 },
  searchInput: { flex: 1, fontSize: Font.md, color: Colors.gray900, padding: 0 },
  quickRow:    { flexDirection: 'row', justifyContent: 'space-around' },
  balCard:     { marginHorizontal: 16, marginTop: 14, borderRadius: 22, padding: 22, ...Shadows.lg },
  balTop:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  balLabel:    { color: 'rgba(255,255,255,0.78)', fontSize: Font.sm },
  balAmt:      { color: Colors.white, fontSize: Font.xxxl, fontWeight: '900', marginBottom: 20 },
  balSub:      { color: 'rgba(255,255,255,0.68)', fontSize: Font.sm },
  chipsWrap:   { backgroundColor: Colors.white, marginTop: 12 },
  chips:       { paddingHorizontal: 14, paddingVertical: 14, gap: 8 },
  chip:        { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: 24, paddingVertical: 9, paddingHorizontal: 14, borderWidth: 1, borderColor: Colors.gray200 },
  chipTxt:     { fontSize: Font.sm, color: Colors.gray900, fontWeight: '600' },
  section:     { marginTop: 18 },
  sHead:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  sTitle:      { fontSize: Font.lg, fontWeight: '700', color: Colors.gray900 },
  viewAll:     { fontSize: Font.sm, color: Colors.primary, fontWeight: '600' },
  promoCard:   { width: 128, marginRight: 14 },
  promoGrad:   { height: 108, borderRadius: Radius.lg, justifyContent: 'center', alignItems: 'center', marginBottom: 8, ...Shadows.sm },
  promoLabel:  { fontSize: Font.sm, color: Colors.gray800, fontWeight: '600', textAlign: 'center' },
});
