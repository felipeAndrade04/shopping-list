const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function formatDate(date: Date) {
  const day = date.getDay();
  const month = date.getMonth();

  return `${day} de ${months[month]}`;
}
