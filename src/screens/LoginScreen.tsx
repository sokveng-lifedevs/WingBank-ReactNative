import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Animated, KeyboardAvoidingView, Platform, ScrollView,
  ActivityIndicator, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { Colors, Font, Space, Radius, Shadows } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props): React.JSX.Element {
  const [email,       setEmail]       = useState<string>('');
  const [password,    setPassword]    = useState<string>('');
  const [showPass,    setShowPass]    = useState<boolean>(false);
  const [loading,     setLoading]     = useState<boolean>(false);
  const [emailFocus,  setEmailFocus]  = useState<boolean>(false);
  const [passFocus,   setPassFocus]   = useState<boolean>(false);

  // Animations
  const logoY    = useRef(new Animated.Value(-80)).current;
  const logoOp   = useRef(new Animated.Value(0)).current;
  const formOp   = useRef(new Animated.Value(0)).current;
  const formY    = useRef(new Animated.Value(40)).current;
  const shakeX   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoY,  { toValue: 0, friction: 6, tension: 60, useNativeDriver: true }),
        Animated.timing(logoOp, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(formY,  { toValue: 0, friction: 7, tension: 50, useNativeDriver: true }),
        Animated.timing(formOp, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  const shakeForm = (): void => {
    Animated.sequence([
      Animated.timing(shakeX, { toValue: 10,  duration: 60, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 10,  duration: 60, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0,   duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      shakeForm();
      Alert.alert('Missing Info', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800));
    setLoading(false);

    if (email === 'sokveng@wing.com' && password === '123456') {
      navigation.replace('Main');
    } else {
      shakeForm();
      Alert.alert('Login Failed', 'Invalid credentials.\n\nUse:\nEmail: sokveng@wing.com\nPassword: 123456');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient colors={[Colors.headerStart, Colors.primary, Colors.primaryLight]}
        style={s.gradientTop} start={{ x: 0, y: 0 }} end={{ x: 0.3, y: 1 }} />

      <ScrollView style={s.root} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo Section */}
        <Animated.View style={[s.logoSection, { opacity: logoOp, transform: [{ translateY: logoY }] }]}>
          <Text style={s.bird}>🐦</Text>
          <View style={s.logoRow}>
            <Text style={s.wingTxt}>Wing</Text>
            <Text style={s.bankTxt}> Bank</Text>
          </View>
          <Text style={s.tagline}>Cambodia's Trusted Digital Bank</Text>
        </Animated.View>

        {/* Form Card */}
        <Animated.View style={[s.card, { opacity: formOp, transform: [{ translateY: formY }, { translateX: shakeX }] }, Shadows.lg]}>
          <Text style={s.welcomeTxt}>Welcome Back 👋</Text>
          <Text style={s.subTxt}>Sign in to your Wing Bank account</Text>

          {/* Email */}
          <View style={s.fieldLabel}>
            <Ionicons name="mail-outline" size={15} color={Colors.gray500} />
            <Text style={s.label}>  Email Address</Text>
          </View>
          <View style={[s.input, emailFocus && s.inputFocus]}>
            <Ionicons name="person-outline" size={18} color={emailFocus ? Colors.primary : Colors.gray400} style={{ marginRight: 10 }} />
            <TextInput
              style={s.textInput}
              placeholder="sokveng@wing.com"
              placeholderTextColor={Colors.gray400}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </View>

          {/* Password */}
          <View style={s.fieldLabel}>
            <Ionicons name="lock-closed-outline" size={15} color={Colors.gray500} />
            <Text style={s.label}>  Password</Text>
          </View>
          <View style={[s.input, passFocus && s.inputFocus]}>
            <Ionicons name="lock-closed-outline" size={18} color={passFocus ? Colors.primary : Colors.gray400} style={{ marginRight: 10 }} />
            <TextInput
              style={[s.textInput, { flex: 1 }]}
              placeholder="Enter your password"
              placeholderTextColor={Colors.gray400}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
            />
            <TouchableOpacity onPress={() => setShowPass(p => !p)}>
              <Ionicons name={showPass ? 'eye-outline' : 'eye-off-outline'} size={20} color={Colors.gray400} />
            </TouchableOpacity>
          </View>

          {/* Forgot */}
          <TouchableOpacity style={s.forgotWrap}>
            <Text style={s.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
            <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={s.loginBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              {loading
                ? <ActivityIndicator color={Colors.white} size="small" />
                : <><Ionicons name="log-in-outline" size={20} color={Colors.white} style={{ marginRight: 8 }} /><Text style={s.loginTxt}>Sign In</Text></>
              }
            </LinearGradient>
          </TouchableOpacity>

          {/* Demo hint */}
          <View style={s.demoBox}>
            <Ionicons name="information-circle-outline" size={16} color={Colors.accent} style={{ marginRight: 6 }} />
            <Text style={s.demoTxt}>Demo: sokveng@wing.com / 123456</Text>
          </View>
        </Animated.View>

        <Text style={s.footer}>© 2024 Wing Bank (Cambodia) Plc.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  root:         { flex: 1, backgroundColor: Colors.screenBg },
  scroll:       { flexGrow: 1, paddingBottom: 40 },
  gradientTop:  { position: 'absolute', top: 0, left: 0, right: 0, height: 260 },
  logoSection:  { alignItems: 'center', paddingTop: 70, paddingBottom: 30 },
  bird:         { fontSize: 60, marginBottom: 8 },
  logoRow:      { flexDirection: 'row' },
  wingTxt:      { fontSize: 40, fontWeight: '900', color: Colors.white },
  bankTxt:      { fontSize: 40, fontWeight: '900', color: Colors.accent },
  tagline:      { fontSize: Font.sm, color: 'rgba(255,255,255,0.8)', marginTop: 6, letterSpacing: 0.8 },
  card:         { backgroundColor: Colors.white, marginHorizontal: 20, borderRadius: 26, padding: 28 },
  welcomeTxt:   { fontSize: Font.xxl, fontWeight: '800', color: Colors.gray900, marginBottom: 4 },
  subTxt:       { fontSize: Font.sm, color: Colors.gray500, marginBottom: 24 },
  fieldLabel:   { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label:        { fontSize: Font.sm, color: Colors.gray600, fontWeight: '600' },
  input:        { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray100, borderRadius: Radius.md, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 18, borderWidth: 1.5, borderColor: 'transparent' },
  inputFocus:   { borderColor: Colors.primary, backgroundColor: '#f0fdf0' },
  textInput:    { flex: 1, fontSize: Font.md, color: Colors.gray900, padding: 0 },
  forgotWrap:   { alignItems: 'flex-end', marginBottom: 22, marginTop: -8 },
  forgotTxt:    { fontSize: Font.sm, color: Colors.primary, fontWeight: '600' },
  loginBtn:     { borderRadius: Radius.lg, paddingVertical: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  loginTxt:     { fontSize: Font.lg, fontWeight: '800', color: Colors.white, letterSpacing: 0.5 },
  demoBox:      { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', borderRadius: Radius.md, padding: 12, marginTop: 16 },
  demoTxt:      { fontSize: Font.xs, color: Colors.accent, fontWeight: '500', flex: 1 },
  footer:       { textAlign: 'center', fontSize: Font.xs, color: Colors.gray400, marginTop: 30 },
});
