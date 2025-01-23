'use client'

import React from 'react';

interface ChartProps {
  data: number[];
  title: string;
}

export const Chart: React.FC<ChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div style={{ 
      padding: '1rem', 
      border: '1px solid #e5e7eb', 
      borderRadius: '0.25rem' 
    }}>
      <h3 style={{ 
        fontSize: '1.125rem', 
        fontWeight: 'bold', 
        marginBottom: '0.5rem' 
      }}>
        {title}
      </h3>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        height: '10rem', 
        gap: '0.5rem' 
      }}>
        {data.map((value, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#3b82f6',
              width: '2rem',
              height: `${(value / maxValue) * 100}%`,
            }}
          >
            <span style={{ 
              fontSize: '0.75rem', 
              textAlign: 'center', 
              display: 'block', 
              marginTop: '0.5rem' 
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 