import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Font, Radius, Shadows } from '../theme';
import { CURRENT_USER } from '../theme/data';

const RECIPIENTS = [
  { id: '1', name: 'Mom',      account: '0987-6543', avatar: '👩', bank: 'Wing Bank' },
  { id: '2', name: 'Dad',      account: '1122-3344', avatar: '👨', bank: 'ABA Bank' },
  { id: '3', name: 'SokVeng',  account: '5566-7788', avatar: '👤', bank: 'Wing Bank' },
  { id: '4', name: 'Dara',     account: '9900-1122', avatar: '🧑', bank: 'ACLEDA' },
];

export default function TransferScreen(): React.JSX.Element {
  const [amount,    setAmount]    = useState<string>('');
  const [note,      setNote]      = useState<string>('');
  const [selected,  setSelected]  = useState<string>('');
  const [loading,   setLoading]   = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const handleTransfer = async (): Promise<void> => {
    if (!selected) { Alert.alert('Select Recipient', 'Please choose who to send money to.'); return; }
    if (!amount || parseFloat(amount) <= 0) { Alert.alert('Enter Amount', 'Please enter a valid amount.'); return; }
    if (parseFloat(amount) > CURRENT_USER.balance) { Alert.alert('Insufficient Balance', 'You do not have enough funds.'); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);

    const recipient = RECIPIENTS.find(r => r.id === selected);
    Alert.alert('✅ Transfer Successful!', `$${parseFloat(amount).toFixed(2)} sent to ${recipient?.name} successfully.`, [
      { text: 'OK', onPress: () => { setAmount(''); setNote(''); setSelected(''); } },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient colors={[Colors.headerStart, Colors.primary]} style={[s.header, { paddingTop: insets.top + 10 }]}
        start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 1 }}>
        <Text style={s.headerTitle}>Transfer Money</Text>
        <Text style={s.headerSub}>Send money quickly and securely</Text>
        <View style={s.balPill}>
          <Ionicons name="wallet-outline" size={15} color={Colors.white} style={{ marginRight: 6 }} />
          <Text style={s.balPillTxt}>Balance: ${CURRENT_USER.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={s.root} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {/* Amount Input */}
        <View style={s.amountCard}>
          <Text style={s.fieldTitle}>Amount to Send</Text>
          <View style={s.amountRow}>
            <Text style={s.currency}>$</Text>
            <TextInput style={s.amountInput} placeholder="0.00" placeholderTextColor={Colors.gray300}
              value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
          </View>
          <View style={s.quickAmts}>
            {['10', '50', '100', '500'].map(v => (
              <TouchableOpacity key={v} style={[s.qAmt, amount === v && s.qAmtActive]} onPress={() => setAmount(v)}>
                <Text style={[s.qAmtTxt, amount === v && s.qAmtTxtActive]}>${v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recipients */}
        <View style={s.section}>
          <Text style={s.sTitle}>Recent Recipients</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}>
            {RECIPIENTS.map(r => (
              <TouchableOpacity key={r.id} style={[s.recipientCard, selected === r.id && s.recipientActive]}
                onPress={() => setSelected(r.id)} activeOpacity={0.8}>
                <Text style={s.recipientAvatar}>{r.avatar}</Text>
                <Text style={[s.recipientName, selected === r.id && { color: Colors.primary }]}>{r.name}</Text>
                <Text style={s.recipientBank}>{r.bank}</Text>
                {selected === r.id && (
                  <View style={s.checkBadge}><Ionicons name="checkmark" size={12} color={Colors.white} /></View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Manual Input */}
        <View style={s.section}>
          <Text style={s.sTitle}>Or Enter Account Number</Text>
          <View style={s.inputBox}>
            <Ionicons name="person-outline" size={18} color={Colors.gray400} style={{ marginRight: 10 }} />
            <TextInput style={s.inputTxt} placeholder="Account number" placeholderTextColor={Colors.gray400} keyboardType="number-pad" />
          </View>
        </View>

        {/* Note */}
        <View style={s.section}>
          <Text style={s.sTitle}>Note (Optional)</Text>
          <View style={[s.inputBox, { alignItems: 'flex-start', paddingTop: 12, minHeight: 80 }]}>
            <TextInput style={[s.inputTxt, { flex: 1 }]} placeholder="Add a note..." placeholderTextColor={Colors.gray400}
              value={note} onChangeText={setNote} multiline maxLength={100} />
          </View>
        </View>

        {/* Transfer Button */}
        <TouchableOpacity style={s.btnWrap} onPress={handleTransfer} disabled={loading} activeOpacity={0.85}>
          <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={s.btn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <><Ionicons name="arrow-up-circle-outline" size={22} color={Colors.white} style={{ marginRight: 8 }} /><Text style={s.btnTxt}>Send Money</Text></>}
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root:            { flex: 1, backgroundColor: Colors.screenBg },
  header:          { paddingHorizontal: 20, paddingBottom: 28 },
  headerTitle:     { color: Colors.white, fontSize: Font.xxl, fontWeight: '800', marginBottom: 4 },
  headerSub:       { color: 'rgba(255,255,255,0.75)', fontSize: Font.sm },
  balPill:         { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14, marginTop: 14, alignSelf: 'flex-start' },
  balPillTxt:      { color: Colors.white, fontSize: Font.sm, fontWeight: '600' },
  amountCard:      { backgroundColor: Colors.white, marginHorizontal: 16, marginTop: -16, borderRadius: 22, padding: 22, ...Shadows.lg },
  fieldTitle:      { fontSize: Font.md, color: Colors.gray600, fontWeight: '600', marginBottom: 12 },
  amountRow:       { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: Colors.primary, paddingBottom: 8, marginBottom: 18 },
  currency:        { fontSize: Font.xxxl, fontWeight: '900', color: Colors.primary, marginRight: 8 },
  amountInput:     { flex: 1, fontSize: 42, fontWeight: '900', color: Colors.gray900, padding: 0 },
  quickAmts:       { flexDirection: 'row', gap: 10 },
  qAmt:            { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: Colors.gray100, alignItems: 'center', borderWidth: 1, borderColor: Colors.gray200 },
  qAmtActive:      { backgroundColor: Colors.primary + '18', borderColor: Colors.primary },
  qAmtTxt:         { fontSize: Font.sm, fontWeight: '600', color: Colors.gray700 },
  qAmtTxtActive:   { color: Colors.primary },
  section:         { marginTop: 20 },
  sTitle:          { fontSize: Font.lg, fontWeight: '700', color: Colors.gray900, marginBottom: 12, paddingHorizontal: 16 },
  recipientCard:   { width: 90, backgroundColor: Colors.white, borderRadius: 16, padding: 14, alignItems: 'center', gap: 4, borderWidth: 1.5, borderColor: Colors.gray200, ...Shadows.sm, position: 'relative' },
  recipientActive: { borderColor: Colors.primary, backgroundColor: '#f0fdf0' },
  recipientAvatar: { fontSize: 30 },
  recipientName:   { fontSize: Font.sm, fontWeight: '700', color: Colors.gray900 },
  recipientBank:   { fontSize: Font.xs, color: Colors.gray400, textAlign: 'center' },
  checkBadge:      { position: 'absolute', top: 6, right: 6, width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
  inputBox:        { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, marginHorizontal: 16, borderRadius: Radius.md, paddingHorizontal: 14, paddingVertical: 12, ...Shadows.sm },
  inputTxt:        { flex: 1, fontSize: Font.md, color: Colors.gray900, padding: 0 },
  btnWrap:         { marginHorizontal: 16, marginTop: 24 },
  btn:             { borderRadius: Radius.lg, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  btnTxt:          { color: Colors.white, fontSize: Font.lg, fontWeight: '800', letterSpacing: 0.5 },
});
