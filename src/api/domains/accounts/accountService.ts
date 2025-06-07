import type { LabelItem } from './accountTypes';

export const parseLabel = (input: string): LabelItem[] => {
  return input
    .split(';')
    .map(s => s.trim())
    .filter(s => s)
    .map(s => ({ text: s }));
}

export const stringifyLabel = (labels: LabelItem[]): string => {
  return labels.map(l => l.text).join('; ');
}
