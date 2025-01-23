'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>('');
  const id = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        });

        const { svg } = await mermaid.render(id.current, chart);
        setSvg(svg);
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div
      className="mermaid"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
} 