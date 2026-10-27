
import {
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import { useAppTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useAppTheme();

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    surface: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#171717',
    secondary: isDark ? '#B0B0B0' : '#666666',
    primary: isDark ? '#90CAF9' : '#1976D2',
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.heading, { color: colors.text }]}>
        Appearance
      </Text>

      <View
        style={[
          styles.settingRow,
          { backgroundColor: colors.surface },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            Dark Mode
          </Text>

          <Text
            style={[
              styles.description,
              { color: colors.secondary },
            ]}
          >
            {isDark
              ? 'Dark theme is enabled'
              : 'Light theme is enabled'}
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{
            false: '#AAAAAA',
            true: colors.primary,
          }}
          thumbColor={colors.surface}
          accessibilityLabel="Dark Mode"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});
