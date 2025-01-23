import type { MDXComponents } from 'mdx/types'
import { CopyButton } from './components/CopyButton'
import React, { PropsWithChildren } from 'react'

const Code = ({ children, className, ...props }: PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => {
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

interface TokenProps {
  children?: React.ReactNode;
  className?: string;
}

const Pre = ({ children, ...props }: PreProps) => {
  const codeElement = React.Children.toArray(children)[0] as React.ReactElement<TokenProps>;
  let codeText = '';
  
  const extractTextFromToken = (token: React.ReactNode): string => {
    if (typeof token === 'string') return token;
    if (React.isValidElement(token)) {
      const elementToken = token as React.ReactElement<TokenProps>;
      if (elementToken.props?.children) {
        if (Array.isArray(elementToken.props.children)) {
          return elementToken.props.children.map(extractTextFromToken).join('');
        }
        return extractTextFromToken(elementToken.props.children);
      }
    }
    return '';
  };

  if (codeElement?.props?.children) {
    codeText = extractTextFromToken(codeElement);
  }

  return (
    <pre {...props}>
      <CopyButton code={codeText} />
      {children}
    </pre>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: Code,
    pre: Pre,
    ...components,
  }
}