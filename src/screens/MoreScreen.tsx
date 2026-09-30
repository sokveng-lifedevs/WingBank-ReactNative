import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { Colors, Font, Radius, Shadows } from '../theme';
import { CURRENT_USER } from '../theme/data';

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>;

interface MenuItem {
  icon: string;
  label: string;
  color: string;
  badge?: string;
  toggle?: boolean;
  danger?: boolean;
}

interface MenuGroup {
  section: string;
  items: MenuItem[];
}

const MENU_GROUPS: MenuGroup[] = [
  {
    section: 'Account',
    items: [
      { icon: 'person-outline',          label: 'My Profile',       color: Colors.primary },
      { icon: 'shield-checkmark-outline',label: 'Security',         color: Colors.accent },
      { icon: 'notifications-outline',   label: 'Notifications',    color: '#FF7043', badge: '3' },
      { icon: 'language-outline',        label: 'Language',         color: '#7B1FA2' },
    ],
  },
  {
    section: 'Services',
    items: [
      { icon: 'analytics-outline',  label: 'Statements',    color: '#AB47BC' },
      { icon: 'gift-outline',       label: 'Rewards',       color: '#FBC02D', badge: 'NEW' },
      { icon: 'qr-code-outline',    label: 'QR Pay',        color: Colors.accent },
      { icon: 'receipt-outline',    label: 'Bill Payments', color: '#00897B' },
    ],
  },
  {
    section: 'Preferences',
    items: [
      { icon: 'finger-print-outline', label: 'Biometric Login', color: Colors.primary, toggle: true },
      { icon: 'moon-outline',         label: 'Dark Mode',       color: Colors.gray700, toggle: true },
    ],
  },
  {
    section: 'About',
    items: [
      { icon: 'help-circle-outline',  label: 'Help Center',  color: Colors.gray600 },
      { icon: 'document-text-outline',label: 'Terms & Privacy', color: Colors.gray600 },
      { icon: 'information-circle-outline', label: 'App Version 1.0.0', color: Colors.gray500 },
      { icon: 'log-out-outline',      label: 'Log Out',      color: Colors.danger, danger: true },
    ],
  },
];

export default function MoreScreen({ navigation }: any): React.JSX.Element {
  const [biometric, setBiometric] = useState<boolean>(true);
  const [darkMode,  setDarkMode]  = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const handleItem = (item: MenuItem): void => {
    if (item.label === 'Log Out') {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: () => navigation.replace('Login') },
      ]);
    }
  };

  const getToggleValue = (label: string): boolean => {
    if (label === 'Biometric Login') return biometric;
    if (label === 'Dark Mode') return darkMode;
    return false;
  };

  const handleToggle = (label: string, val: boolean): void => {
    if (label === 'Biometric Login') setBiometric(val);
    if (label === 'Dark Mode') setDarkMode(val);
  };

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile Hero Card */}
        <LinearGradient colors={[Colors.headerStart, Colors.primary]} style={s.profileHero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={s.avatarWrap}>
            <Text style={s.avatarTxt}>{CURRENT_USER.avatar}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.profileName}>{CURRENT_USER.name}</Text>
            <Text style={s.profileEmail}>{CURRENT_USER.email}</Text>
            <View style={s.vipBadge}>
              <Ionicons name="star" size={11} color={Colors.warning} style={{ marginRight: 3 }} />
              <Text style={s.vipTxt}>Gold Member</Text>
            </View>
          </View>
          <TouchableOpacity style={s.editBtn}>
            <Ionicons name="pencil-outline" size={18} color={Colors.white} />
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats Row */}
        <View style={s.statsRow}>
          {[
            { label: 'Transactions', value: '48' },
            { label: 'Cards',        value: '2' },
            { label: 'Rewards Pts',  value: '1,240' },
          ].map((st, i) => (
            <View key={st.label} style={[s.statItem, i < 2 && s.statBorder]}>
              <Text style={s.statValue}>{st.value}</Text>
              <Text style={s.statLabel}>{st.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Groups */}
        {MENU_GROUPS.map((group: MenuGroup) => (
          <View key={group.section} style={s.group}>
            <Text style={s.groupLabel}>{group.section.toUpperCase()}</Text>
            <View style={s.groupCard}>
              {group.items.map((item: MenuItem, i: number) => (
                <TouchableOpacity
                  key={item.label}
                  style={[s.menuRow, i < group.items.length - 1 && s.menuBorder]}
                  onPress={() => handleItem(item)}
                  activeOpacity={0.7}
                >
                  <View style={[s.menuIcon, { backgroundColor: item.color + '18' }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={[s.menuLabel, item.danger && { color: Colors.danger }]}>{item.label}</Text>

                  {item.badge && (
                    <View style={[s.badge, { backgroundColor: item.badge === 'NEW' ? Colors.success : Colors.danger }]}>
                      <Text style={s.badgeTxt}>{item.badge}</Text>
                    </View>
                  )}

                  {item.toggle ? (
                    <Switch
                      value={getToggleValue(item.label)}
                      onValueChange={val => handleToggle(item.label, val)}
                      trackColor={{ true: Colors.primary }}
                      thumbColor={Colors.white}
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={16} color={Colors.gray300} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text style={s.copy}>© 2024 Wing Bank (Cambodia) Plc.{'\n'}Built by Ean SokVeng · Final Year Project</Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root:         { flex: 1, backgroundColor: Colors.screenBg },
  profileHero:  { flexDirection: 'row', alignItems: 'center', margin: 16, borderRadius: 22, padding: 20, gap: 14, ...Shadows.lg },
  avatarWrap:   { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)' },
  avatarTxt:    { fontSize: Font.xl, fontWeight: '800', color: Colors.white },
  profileName:  { color: Colors.white, fontSize: Font.lg, fontWeight: '800' },
  profileEmail: { color: 'rgba(255,255,255,0.75)', fontSize: Font.xs, marginTop: 2 },
  vipBadge:     { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, paddingVertical: 3, paddingHorizontal: 8, marginTop: 6, alignSelf: 'flex-start' },
  vipTxt:       { color: Colors.white, fontSize: Font.xs, fontWeight: '700' },
  editBtn:      { width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  statsRow:     { flexDirection: 'row', backgroundColor: Colors.white, marginHorizontal: 16, borderRadius: Radius.lg, ...Shadows.sm, marginBottom: 8 },
  statItem:     { flex: 1, alignItems: 'center', paddingVertical: 16 },
  statBorder:   { borderRightWidth: 1, borderRightColor: Colors.gray100 },
  statValue:    { fontSize: Font.xl, fontWeight: '800', color: Colors.gray900 },
  statLabel:    { fontSize: Font.xs, color: Colors.gray500, marginTop: 2 },
  group:        { paddingHorizontal: 16, marginBottom: 16 },
  groupLabel:   { fontSize: Font.xs, fontWeight: '700', color: Colors.gray400, letterSpacing: 1.2, marginBottom: 8, marginLeft: 4 },
  groupCard:    { backgroundColor: Colors.white, borderRadius: Radius.lg, overflow: 'hidden', ...Shadows.sm },
  menuRow:      { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  menuBorder:   { borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  menuIcon:     { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  menuLabel:    { flex: 1, fontSize: Font.md, fontWeight: '500', color: Colors.gray900 },
  badge:        { borderRadius: 8, paddingVertical: 2, paddingHorizontal: 7, marginRight: 8 },
  badgeTxt:     { color: Colors.white, fontSize: Font.xs, fontWeight: '700' },
  copy:         { textAlign: 'center', fontSize: Font.xs, color: Colors.gray400, lineHeight: 18, marginVertical: 16 },
});
