
import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const isDark = theme === 'dark';

  function toggleTheme() {
    setTheme(current =>
      current === 'light' ? 'dark' : 'light'
    );
  }

  return (
    <ThemeContext.Provider
      value={{ theme, isDark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useAppTheme must be used inside AppThemeProvider'
    );
  }

  return context;
}
