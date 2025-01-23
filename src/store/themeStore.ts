import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  // 시스템 테마 변경 감지 핸들러
  const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
    set({ theme: e.matches ? 'light' : 'dark' });
  };

  return {
    theme: 'light',
    setTheme: (theme) => set({ theme }),
    initTheme: () => {
      // 초기 테마 설정
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      handleThemeChange(mediaQuery);

      // 테마 변경 이벤트 리스너 등록
      mediaQuery.addEventListener('change', handleThemeChange);

      // cleanup 함수 반환
      return () => {
        mediaQuery.removeEventListener('change', handleThemeChange);
      };
    },
  };
}); 