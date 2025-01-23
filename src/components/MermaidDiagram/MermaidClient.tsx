'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
  theme: 'light' | 'dark';
}

let diagramId = 0;

const MermaidSVG = ({ svg }: { svg: string }) => {
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (svgContainerRef.current) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, 'image/svg+xml');
      const svgElement = doc.documentElement;
      
      while (svgContainerRef.current.firstChild) {
        svgContainerRef.current.removeChild(svgContainerRef.current.firstChild);
      }
      svgContainerRef.current.appendChild(svgElement);
    }
  }, [svg]);

  return <div ref={svgContainerRef} />;
};

export default function MermaidClient({ chart, theme }: MermaidProps) {
  const id = useRef(`mermaid-diagram-${++diagramId}`);
  const [svgContent, setSvgContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        // Mermaid 설정
        const config = {
          startOnLoad: false,
          securityLevel: 'loose' as const,
          theme: theme === 'light' ? 'default' as const : 'dark' as const,
        };

        // 새로운 설정으로 초기화
        mermaid.initialize(config);

        const { svg } = await mermaid.render(id.current, chart);
        setSvgContent(svg);
        setError(null);
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
        setError('Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart, theme]);

  if (error) {
    return (
      <div className="p-4 text-red-500 border border-red-300 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="my-4 overflow-auto">
      {svgContent && <MermaidSVG svg={svgContent} />}
    </div>
  );
}
