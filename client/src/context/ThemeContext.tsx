import { createContext, useContext, useState } from 'react';

export enum Themes {
  DARK,
  LIGHT,
}

type ThemeContextValueType = {
  theme: Themes;
  setTheme: Function;
};

const ThemeContext = createContext<ThemeContextValueType | null>(null);

export const useThemeContext = (): ThemeContextValueType =>
  useContext(ThemeContext) as ThemeContextValueType;

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [theme, setTheme] = useState(Themes.DARK);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
