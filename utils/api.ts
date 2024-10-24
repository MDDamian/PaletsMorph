export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES").format(date);
}
