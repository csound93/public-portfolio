'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { initTheme } = useThemeStore();

  useEffect(() => {
    // 테마 초기화 및 시스템 테마 변경 감지 설정
    const cleanup = initTheme();
    return () => cleanup?.();
  }, [initTheme]);

  return <>{children}</>;
} 