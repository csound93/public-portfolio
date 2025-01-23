'use client';

import dynamic from 'next/dynamic';
import { useThemeStore } from '@/store/themeStore';

// 클라이언트 사이드에서만 로드
const MermaidClient = dynamic(() => import('./MermaidClient'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-md" />,
});

interface MermaidProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidProps) {
  const { theme } = useThemeStore();
  
  return <MermaidClient chart={chart} theme={theme} />;
}
