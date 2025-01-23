'use client';

import dynamic from 'next/dynamic';

const MermaidClient = dynamic(() => import('./MermaidClient'), {
  loading: () => <div>Loading diagram...</div>
});

interface MermaidProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidProps) {
  return <MermaidClient chart={chart} />;
} 