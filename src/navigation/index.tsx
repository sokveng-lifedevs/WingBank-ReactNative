import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import SplashScreen   from '../screens/SplashScreen';
import LoginScreen    from '../screens/LoginScreen';
import HomeScreen     from '../screens/HomeScreen';
import CardsScreen    from '../screens/CardsScreen';
import TransferScreen from '../screens/TransferScreen';
import MoreScreen     from '../screens/MoreScreen';

import { Colors, Font, Shadows } from '../theme';
import type { RootStackParamList, MainTabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab   = createBottomTabNavigator<MainTabParamList>();

// ─── Tab Config ────────────────────────────────────────────────────────────────
const TAB_CONFIG = [
  { name: 'Home',     icon: 'home-outline',              activeIcon: 'home'              },
  { name: 'Cards',    icon: 'card-outline',               activeIcon: 'card'              },
  { name: 'Transfer', icon: 'arrow-up-circle-outline',    activeIcon: 'arrow-up-circle'   },
  { name: 'More',     icon: 'menu-outline',               activeIcon: 'menu'              },
] as const;

// ─── Custom Bottom Tab Bar ─────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: BottomTabBarProps): React.JSX.Element {
  return (
    <View style={s.bar}>
      {state.routes.map((route, i) => {
        const focused = state.index === i;
        const cfg     = TAB_CONFIG[i];
        const isTransfer = cfg.name === 'Transfer';

        if (isTransfer) {
          return (
            <TouchableOpacity key={route.key} style={s.transferTabWrap}
              onPress={() => navigation.navigate(route.name as any)} activeOpacity={0.85}>
              <View style={s.transferBtn}>
                <Ionicons name="arrow-up-circle" size={26} color={Colors.white} />
              </View>
              <Text style={[s.tabLabel, focused && s.tabLabelActive]}>Transfer</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={route.key}
            style={[s.tab, focused && s.tabActive]}
            onPress={() => navigation.navigate(route.name as any)}
            activeOpacity={0.7}>
            {focused && <View style={s.indicator} />}
            <Ionicons
              name={(focused ? cfg.activeIcon : cfg.icon) as any}
              size={23}
              color={focused ? Colors.primary : Colors.gray500}
            />
            <Text style={[s.tabLabel, focused && s.tabLabelActive]}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}

      {/* Floating QR Scanner */}
      <TouchableOpacity style={s.floatQR} activeOpacity={0.85}>
        <MaterialIcons name="qr-code-scanner" size={26} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Tabs ─────────────────────────────────────────────────────────────────
function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home"     component={HomeScreen}     />
      <Tab.Screen name="Cards"    component={CardsScreen}    />
      <Tab.Screen name="Transfer" component={TransferScreen} />
      <Tab.Screen name="More"     component={MoreScreen}     />
    </Tab.Navigator>
  );
}

// ─── Root Navigator ────────────────────────────────────────────────────────────
export default function AppNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login"  component={LoginScreen}  options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="Main"   component={MainTabs}     options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  bar:              { flexDirection: 'row', backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.gray200, paddingBottom: Platform.OS === 'ios' ? 22 : 10, paddingTop: 10, paddingHorizontal: 6, alignItems: 'center', ...Shadows.md },
  tab:              { flex: 1, alignItems: 'center', borderRadius: 14, paddingVertical: 5, position: 'relative' },
  tabActive:        { backgroundColor: Colors.primary + '12' },
  indicator:        { position: 'absolute', top: -10, width: 22, height: 3, backgroundColor: Colors.primary, borderRadius: 2 },
  tabLabel:         { fontSize: Font.xs, color: Colors.gray400, marginTop: 3, fontWeight: '500' },
  tabLabelActive:   { color: Colors.primary, fontWeight: '700' },
  transferTabWrap:  { flex: 1, alignItems: 'center', paddingVertical: 5 },
  transferBtn:      { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 0, marginTop: -20, ...Shadows.colored(Colors.primary) },
  floatQR:          { position: 'absolute', right: 12, top: -22, width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.accent, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.white, ...Shadows.colored(Colors.accent) },
});
