'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

export default function MermaidClient({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderDiagram = async () => {
      try {
        // Mermaid 초기화
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
        });

        // 기존 내용 초기화
        container.innerHTML = chart;

        // 다이어그램 렌더링
        await mermaid.run({
          nodes: [container],
        });
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
        container.textContent = 'Failed to render diagram';
      }
    };

    renderDiagram();
  }, [chart]);

  return <div ref={containerRef} className="mermaid" />;
}
