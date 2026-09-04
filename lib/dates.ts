export function formatDate(dateStr: string, locale = 'es-CO'): string {
  const [year, month, day] = dateStr.split('-');
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  ).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
