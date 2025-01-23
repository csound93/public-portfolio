'use client'

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
      onMouseOver={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
      }}
      onMouseOut={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6';
      }}
    >
      {children}
    </button>
  );
}; 