import React from 'react';
import type { LookupRef } from '../../types';

interface LookupBoxProps {
  lookups: LookupRef[];
}

export function LookupBox({ lookups }: LookupBoxProps) {
  if (!lookups || lookups.length === 0) return null;
  return (
    <div className="lookup-box">
      <div className="lookup-box-label">🔍 Public Data Look-Up</div>
      {lookups.map((ref, i) => (
        <a
          key={i}
          href={ref.url}
          target="_blank"
          rel="noopener noreferrer"
          className="lookup-link"
        >
          <span className="lookup-arrow">↗</span>
          <div>
            <div className="lookup-link-name">{ref.label}</div>
            <div className="lookup-link-desc">{ref.description}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
