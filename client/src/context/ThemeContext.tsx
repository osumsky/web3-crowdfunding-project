import { createContext, useContext, useEffect, useState } from 'react';

export enum Themes {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

type ThemeContextValueType = {
  theme: Themes;
  changeTheme: Function;
};

const ThemeContext = createContext<ThemeContextValueType | null>(null);

export const useThemeContext = (): ThemeContextValueType =>
  useContext(ThemeContext) as ThemeContextValueType;

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState(Themes.DARK);

  useEffect(() => {
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === Themes.LIGHT) {
        setTheme(Themes.LIGHT);
      } else {
        setTheme(Themes.DARK);
      }
      // if NOT set via local storage previously
    } else {
      localStorage.setItem('color-theme', theme);
    }
  }, []);

  const changeTheme = () => {
    const nextTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    setTheme(nextTheme);
    localStorage.setItem('color-theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
