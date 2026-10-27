
import Constants from 'expo-constants';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useAppTheme } from '../context/ThemeContext';

export default function AboutScreen() {
  const { isDark } = useAppTheme();

  const colors = {
    background: isDark ? '#121212' : '#F5F5F5',
    surface: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#171717',
    secondary: isDark ? '#B0B0B0' : '#666666',
    primary: isDark ? '#90CAF9' : '#1976D2',
  };

  const appName =
    Constants.expoConfig?.name ?? 'Tic-Tac-Toe';

  const appVersion =
    Constants.expoConfig?.version ?? 'Unknown';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: colors.primary },
          ]}
        >
          {appName}
        </Text>

        <Text
          style={[
            styles.description,
            { color: colors.secondary },
          ]}
        >
          A Tic-Tac-Toe game built with React Native
          and Expo Router.
        </Text>

        <Text
          style={[
            styles.info,
            { color: colors.text },
          ]}
        >
          Version: {appVersion}
        </Text>

        <Text
          style={[
            styles.info,
            { color: colors.text },
          ]}
        >
          Developed by: Ousmane Soumaré
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  info: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
});
