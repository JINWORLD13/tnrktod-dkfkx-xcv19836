import React from 'react';
export const renderAnswerAsLines = answer => {
  if (answer && typeof answer === 'string' && answer?.length > 0) {
    const lines = answer.split('\n');
    return lines.map((line, index) => {
      if (line.includes('<strong>') || line.includes('</strong>')) {
        const parts = line.split(/(<strong>.*?<\/strong>)/g);
        return (
          <p key={index}>
            {parts.map((part, i) => {
              if (part.startsWith('<strong>')) {
                const text = part.replace(/<strong>(.*?)<\/strong>/, '$1');
                return <strong key={i} style={{ color: 'red' }}>{text}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      return <p key={index}>{line}</p>;
    });
  }
  return []; 
};
