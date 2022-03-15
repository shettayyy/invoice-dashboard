import { useCallback } from 'react';
import useLocalStorage from 'use-local-storage';

export enum ColorScheme {
  Dark = 'dark',
  Light = 'light',
}

const useTheme = (): [`${ColorScheme}`, () => void, () => void] => {
  const isUserDefaultThemeDark = window.matchMedia(
    `(prefers-color-scheme: ${ColorScheme.Dark})`,
  ).matches;
  const [theme, setTheme] = useLocalStorage<`${ColorScheme}`>(
    'theme',
    isUserDefaultThemeDark ? ColorScheme.Dark : ColorScheme.Light,
  );

  const setRootTheme = useCallback((newTheme: `${ColorScheme}`) => {
    document.documentElement.setAttribute('data-theme', newTheme);
  }, []);

  const initTheme = useCallback(() => {
    setRootTheme(theme);
  }, [setRootTheme, theme]);

  const switchTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme =
        prevTheme === ColorScheme.Light ? ColorScheme.Dark : ColorScheme.Light;

      setRootTheme(newTheme);

      return newTheme;
    });
  }, [setRootTheme, setTheme]);

  return [theme, switchTheme, initTheme];
};

export default useTheme;
