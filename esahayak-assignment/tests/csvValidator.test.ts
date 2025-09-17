// tests/csvValidator.test.ts
import { describe, it, expect } from 'vitest';
import { validateCsvRow } from '../lib/validation';

describe('CSV validator', () => {
  it('rejects row with budgetMax < budgetMin', () => {
    const row = {
      fullName: 'Test User',
      email: 't@example.com',
      phone: '9876543210',
      city: 'Chandigarh',
      propertyType: 'Apartment',
      bhk: '2',
      purpose: 'Buy',
      budgetMin: '5000000',
      budgetMax: '4000000',
      timeline: '0-3m',
      source: 'Website',
      notes: '',
      tags: ''
    };
    const res = validateCsvRow(row, 1);
    expect(res.ok).toBe(false);
    expect((res as any).error).toContain('budgetMax');
  });

  it('accepts valid row', () => {
    const row = {
      fullName: 'Test User',
      email: 't@example.com',
      phone: '9876543210',
      city: 'Chandigarh',
      propertyType: 'Apartment',
      bhk: '2',
      purpose: 'Buy',
      budgetMin: '4000000',
      budgetMax: '5000000',
      timeline: '0-3m',
      source: 'Website',
      notes: '',
      tags: 'vip,priority'
    };
    const res = validateCsvRow(row, 1);
    expect(res.ok).toBe(true);
    expect((res as any).data.budgetMin).toBe(4000000);
  });
});
