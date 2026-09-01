export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  ).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}