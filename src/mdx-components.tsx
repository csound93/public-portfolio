import type { MDXComponents } from 'mdx/types';
import { CopyButton } from './components/CopyButton';
import { MermaidDiagram } from './components/MermaidDiagram/index';
import React, { PropsWithChildren, ReactElement } from 'react';

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
  'data-language'?: string;
}

interface TokenProps {
  children?: React.ReactNode;
  className?: string;
}

interface ElementWithChildren {
  props: {
    children?: React.ReactNode;
  };
}

const extractContent = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractContent).join('');
  if (React.isValidElement(node)) {
    const element = node as ReactElement & ElementWithChildren;
    return extractContent(element.props.children || '');
  }
  return '';
};

const Code = ({
  children,
  className,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => {
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const Pre = ({ children, ...props }: PreProps) => {
  const codeElement = React.Children.toArray(children)[0] as React.ReactElement<TokenProps>;
  const codeText = extractContent(codeElement?.props?.children);
  const language = props['data-language'];

  // Mermaid 다이어그램 처리
  if (language === 'mermaid') {
    return <MermaidDiagram chart={codeText} />;
  }

  return (
    <pre {...props}>
      <CopyButton code={codeText} />
      {children}
    </pre>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: Code,
    pre: Pre,
    ...components,
  };
}
