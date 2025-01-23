'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import DOMPurify from 'isomorphic-dompurify';

interface MermaidProps {
  chart: string;
}

export default function MermaidClient({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        // Mermaid 초기화
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        });

        // 차트 ID 생성
        const id = `mermaid-${Date.now()}`;
        
        // 다이어그램 렌더링
        const { svg } = await mermaid.render(id, chart);
        // SVG 살균
        const sanitizedSvg = DOMPurify.sanitize(svg);
        setSvg(sanitizedSvg);
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
        setSvg('Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div 
      ref={containerRef} 
      className="mermaid" 
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
} 