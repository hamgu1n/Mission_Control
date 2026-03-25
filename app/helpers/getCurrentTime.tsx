export function getCurrentDateTime(): { date: string, time: string } {
  const now = new Date();

  // Format date as YYYY-MM-DD
  const date = now.toISOString().split("T")[0];

  // Format time as HH:MM (24-hour)
  const time = now.toTimeString().split(" ")[0].slice(0, 5);

  return { date, time };
}
