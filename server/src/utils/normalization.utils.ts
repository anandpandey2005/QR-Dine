export function normalizeName(data: string) {
  if (!data || typeof data !== 'string') {
    return '';
  }
  return data
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ');
}
