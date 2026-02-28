import React from 'react';
import type { FieldDef } from '../../data/globalFields';
import type { GlobalData } from '../../types';
import { LookupBox } from './LookupButton';
import { useProject } from '../../context/ProjectContext';

interface FieldProps {
  field: FieldDef;
}

export function Field({ field }: FieldProps) {
  const { activeProject, dispatch } = useProject();
  const value = (activeProject?.globalData[field.key as keyof GlobalData] ?? '') as string;

  const handleChange = (val: string) => {
    dispatch({ type: 'UPDATE_GLOBAL_FIELD', key: field.key as keyof GlobalData, value: val });
  };

  const hasValue = value !== '';

  return (
    <div className={`field-group${field.type === 'textarea' ? ' full' : ''}`}>
      <label className="field-label">
        {field.label}
        {field.required && <span className="field-required">*</span>}
        {field.unit && <span className="field-unit">({field.unit})</span>}
      </label>

      {field.type === 'select' ? (
        <select
          className={`form-select${hasValue ? ' has-value' : ''}`}
          value={value}
          onChange={e => handleChange(e.target.value)}
        >
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          className={`form-textarea${hasValue ? ' has-value' : ''}`}
          placeholder={field.placeholder}
          value={value}
          onChange={e => handleChange(e.target.value)}
          rows={3}
        />
      ) : (
        <input
          className={`form-input${hasValue ? ' has-value' : ''}`}
          type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
          placeholder={field.placeholder}
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
      )}

      {field.hint && <div className="field-hint">{field.hint}</div>}
      {field.cfr && <div className="field-cfr">{field.cfr}</div>}
      {field.lookups && field.lookups.length > 0 && <LookupBox lookups={field.lookups} />}
      {field.sectionRef && (
        <div className="field-section-ref">GCMP §{field.sectionRef}</div>
      )}
    </div>
  );
}
