'use client';

import { useState } from 'react';

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    if (typeof window === 'undefined' || !window.isSecureContext) {
      console.warn('Clipboard API requires a secure context (HTTPS)');
      return false;
    }

    if (!navigator?.clipboard) {
      console.warn('Clipboard API not available');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  };

  const handleClick = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      className="code-copy-button"
      onClick={handleClick}
      aria-label="Copy code to clipboard"
    >
      {copied ? '복사됨!' : '복사'}
    </button>
  );
} 