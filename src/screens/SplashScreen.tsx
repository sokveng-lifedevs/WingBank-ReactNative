import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { Colors, Font } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props): React.JSX.Element {
  const logoOpacity  = useRef(new Animated.Value(0)).current;
  const logoScale    = useRef(new Animated.Value(0.6)).current;
  const birdY        = useRef(new Animated.Value(-60)).current;
  const taglineOp    = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bird flies in from top
    Animated.sequence([
      Animated.parallel([
        Animated.spring(birdY,     { toValue: 0, friction: 5, tension: 70, useNativeDriver: true }),
        Animated.timing(logoOpacity,{ toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(logoScale,  { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }),
      ]),
      Animated.timing(taglineOp, { toValue: 1, duration: 500, delay: 100, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(logoOpacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
        navigation.replace('Login');
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={s.root}>
      <Animated.View style={[s.wrap, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Animated.Text style={[s.bird, { transform: [{ translateY: birdY }] }]}>🐦</Animated.Text>
        <View style={s.logoRow}>
          <Text style={s.wing}>Wing</Text>
          <Text style={s.bank}> Bank</Text>
        </View>
        <Animated.Text style={[s.tagline, { opacity: taglineOp }]}>
          Cambodia's Trusted Digital Bank
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: Colors.splashBg, justifyContent: 'center', alignItems: 'center' },
  wrap:    { alignItems: 'center' },
  bird:    { fontSize: 72, marginBottom: 12 },
  logoRow: { flexDirection: 'row', alignItems: 'baseline' },
  wing:    { fontSize: 52, fontWeight: '900', color: Colors.white, letterSpacing: 0.5 },
  bank:    { fontSize: 52, fontWeight: '900', color: Colors.accent, letterSpacing: 0.5 },
  tagline: { fontSize: Font.sm, color: 'rgba(255,255,255,0.85)', marginTop: 10, letterSpacing: 1 },
});
