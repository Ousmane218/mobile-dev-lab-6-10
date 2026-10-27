
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  AppThemeProvider,
  useAppTheme,
} from '../context/ThemeContext';

function AppDrawer() {
  const { isDark } = useAppTheme();

  // Colours are derived from the current theme.
  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    surface: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#171717',
    primary: isDark ? '#90CAF9' : '#1976D2',
    border: isDark ? '#444444' : '#DDDDDD',
    activeBackground: isDark ? '#26394B' : '#E3F2FD',
  };

  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          drawerStyle: {
            backgroundColor: colors.surface,
          },
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.text,
          drawerActiveBackgroundColor: colors.activeBackground,

          sceneStyle: {
            backgroundColor: colors.background,
          },

          swipeEnabled: true,
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Game',
            title: 'Tic-Tac-Toe',
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="game-controller-outline"
                size={size}
                color={String(color)}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                size={size}
                color={String(color)}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'About',
            title: 'About',
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="information-circle-outline"
                size={size}
                color={String(color)}
              />
            ),
          }}
        />
      </Drawer>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppThemeProvider>
        <AppDrawer />
      </AppThemeProvider>
    </GestureHandlerRootView>
  );
}
